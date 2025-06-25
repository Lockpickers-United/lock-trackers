/**
 * @prop newBrand
 * @prop approxBelt
 * @prop discordUsername
 * @prop redditUsername
 */

import {formidable} from '../../util/formidable/src/index.js'
import {parseForm, flattenFields} from '../../util/formUtils.js'
import fs from 'fs'
import {sendEmail} from '../nodeMailer/nodeMailer.js'
import util from 'util'
import {exec} from 'child_process'
import createThumbnails from '../../util/createThumbnails.js'
import {contentUploadRecipients, prodUser} from '../../../keys/users.js'
import admin from 'firebase-admin'
import {getFirestore, FieldValue} from 'firebase-admin/firestore'
import jsonIt from '../../util/jsonIt.js'
import validator from 'validator'
import dayjs from 'dayjs'
import {selectiveSanitizeValues} from '../../util/sanitizeValues.js'

const {writeFile} = fs.promises
const execAsync = util.promisify(exec)

const prodEnvironment = prodUser === process.env.USER
const keysDir = prodEnvironment
    ? `/home/${process.env.USER}/lpulocks-node/keys`
    : `/Users/${process.env.USER}/Documents/GitHub/lpulocks/lpulocks-node/keys`

const uploadDir = prodEnvironment
    ? `/home/${process.env.USER}/lpulocks.com.data/challengelocks/lockimages`
    : `/Users/${process.env.USER}/Documents/LOCKPICK/LockTrackers/challenge-locks/uploads`

const serverPath = 'https://data.lpulocks.com/challengelocks/lockimages'

const serviceAccount = JSON.parse(await fs.promises.readFile(`${keysDir}/service-account.json`, 'utf8'))
const requestapp = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://lock-trackers.firebaseio.com'
})
const dbProd = getFirestore(requestapp)
dbProd.settings({ignoreUndefinedProperties: true})

const dbDev = getFirestore(requestapp, 'locktrackersdev')
dbDev.settings({ignoreUndefinedProperties: true})

const maxCombinedFileSize = 100 * 1024 * 1024

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, {recursive: true})
}

let uploadSubDir

function handleError(res, message, error, status = 500) {
    console.error(message, error)
    if (uploadSubDir && fs.existsSync(uploadSubDir)) {
        try {
            fs.rmSync(uploadSubDir, {recursive: true, force: true})
            console.log('Upload directory removed after error:', uploadSubDir)
        } catch (err) {
            console.error('Error removing upload directory after error:', err)
        }
    }
    res.status(status).send({status, message})
}


export async function updateLockMedia(req, res) {

    try {
        req.user = await authenticateRequest(req, res)
    } catch (err) {
        return handleError(res, err.message, err, 403)
    }

    if (!req.user.CLAdmin && !req.user.admin) {
        return handleError(res, 'Unauthorized', 'Unauthorized', 403)
    }

    const {prod} = req.body
    const db = prod ? dbProd : dbDev
    let filepaths = []

    const form = formidable({
        uploadDir,
        keepExtensions: true,
        createDirsFromUploads: true,
        maxFileSize: maxCombinedFileSize,
        filter: ({mimetype}) => mimetype && mimetype.includes('image'),
        filename(name, ext, part) {
            const {fullFilename, filepath} = createFilename(part, serverPath, uploadDir)
            filepaths.push(filepath)
            return fullFilename
        }
    })

    try {
        const {fields, files} = await parseForm(req, form)

        for (const fieldName in fields) {
            if (!Array.isArray(fields[fieldName])) {
                fields[fieldName] = [fields[fieldName]]
            }
        }
        const flatFields = flattenFields(fields)
        // no need to sanitize

        let ref = db.collection('challenge-locks').doc(flatFields.id)
        const lockEntry = await fetchDocument(ref, flatFields.id)
        if (!lockEntry) return handleError(res, 'Lock not found', `No lock matching id ${flatFields.id} found`, 404)

        // save files/thumbs
        const addedMedia = await Promise.all(filepaths.map(async (filepath, index) => ({
            imageTitle: lockEntry.name,
            title: `By: ${flatFields.photoCredit || 'Unknown'}`,
            fullUrl: filepath,
            fullSizeUrl: (await createThumbnails({
                inputFile: files.files[index].filepath,
                width: 1024
            })).replace(uploadDir, serverPath),
            thumbnailUrl: (await createThumbnails({
                inputFile: files.files[index].filepath,
                width: 500
            })).replace(uploadDir, serverPath),
            thumbnailSquareUrl: (await createThumbnails({
                inputFile: files.files[0].filepath,
                width: 200,
                square: true
            })).replace(uploadDir, serverPath),
            dateAdded: dayjs().toISOString(),
            subtitle: 'CC BY-NC-SA 4.0'
        })))

        let fullMedia = []
        const updates = {}

        // new upload as main photo
        if (!flatFields.updatedMainPhotoId && flatFields.replaceMainPhoto && addedMedia?.length > 0) {
            const newMainImage = addedMedia.shift()
            fullMedia.push(newMainImage)

        } else if (flatFields.updatedMainPhotoId && lockEntry.media?.length > 0 && (lockEntry.media[0].sequenceId !== flatFields.updatedMainPhotoId)) {
            console.log('mainPhoto changed:', lockEntry.media[0].sequenceId, 'to', flatFields.updatedMainPhotoId)
            // existing image now used as main photo

            // replace mainImage with other existing media
            const newMainImage = lockEntry.media?.find(media => media.sequenceId === parseInt(flatFields.updatedMainPhotoId))

            // make new thumbnail if needed
            const thumbnailSource = newMainImage.fullSizeUrl.replace(serverPath, uploadDir)
            const thumbnailOutputPath = thumbnailSource.replace(/-1024.jpg$/, '-200-sq.jpg')
            if (!fs.existsSync(thumbnailOutputPath)) {
                const tSquare = await createThumbnails({ //eslint-disable-line no-unused-vars
                    inputFile: thumbnailSource,
                    width: 200,
                    square: true,
                    outputFilePath: thumbnailOutputPath
                })
            }
            if (!newMainImage.thumbnailSquareUrl) {
                newMainImage.thumbnailSquareUrl = newMainImage.fullSizeUrl.replace(/-1024.jpg$/, '-200-sq.jpg')
            }

            fullMedia.push(newMainImage)
            //updates.mainImage = [{...newMainImage, sequenceId: 1}] // backwards compatibility with old mainImage format

        } else if (!flatFields.updatedMainPhotoId) {
            // if no mainImage, set first existing or addedMedia as mainImage (whether or not it was in that slot??)
            const newMainImage = lockEntry.media?.length > 0
                ? lockEntry.media[0]
                : undefined
            fullMedia.push(newMainImage)
            //updates.mainImage = [{...newMainImage, sequenceId: 1}]

        } else {
            // no change to mainImage so keep it first in fullMedia
            fullMedia.push(lockEntry.mainImage)
        }

        const keepMediaIds = flatFields.updatedMediaIds
            ? flatFields.updatedMediaIds.split(',').map(id => parseInt(id))
            : []
        const keepMedia = lockEntry.media?.length > 0
            ? lockEntry.media?.filter(media => keepMediaIds.includes(media.sequenceId))
            : []

        if (keepMedia.length > 0) {
            // make/set square thumbnails for existing media
            for (const media of keepMedia) {
                const thumbnailSource = media.fullSizeUrl.replace(serverPath, uploadDir)
                const thumbnailOutputPath = thumbnailSource.replace(/-1024.jpg$/, '-200-sq.jpg')
                if (!fs.existsSync(thumbnailOutputPath)) {
                    await createThumbnails({
                        inputFile: thumbnailSource,
                        width: 200,
                        square: true,
                        outputFilePath: thumbnailOutputPath
                    })
                }
                if (!media.thumbnailSquareUrl) {
                    media.thumbnailSquareUrl = media.fullSizeUrl.replace(/-1024.jpg$/, '-200-sq.jpg')
                }
            }
        }

        fullMedia.push(...keepMedia)
        fullMedia.push(...addedMedia)

        console.log('fullMedia:', fullMedia)

        updates.media = fullMedia.filter(x => x).map((media, index) => ({...media, sequenceId: index + 1}))
        updates.thumbnail = FieldValue.delete()
        updates.mainImage = FieldValue.delete()

        console.log('updates:', updates)

        updates.updatedAt = dayjs().toISOString()

        // SUBMIT UPDATES
        if (Object.keys(updates).length > 0) {
            try {
                await updateDocument(ref, updates, flatFields.id)
            } catch (err) {
                return handleError(res, 'Could not update lock', err)
            }
        }

        console.log('done')
        return res.status(200).json(flatFields)

    } catch (err) {
        return handleError(res, 'Form Parse Error', err)
    }

}

export default async function submitChallengeLock(req, res) {

    let subdirs = ''
    let filepaths = []

    try {
        req.user = await authenticateRequest(req, res)
    } catch (err) {
        return handleError(res, err.message, err, 403)
    }

    const {prod} = req.body
    const db = prod ? dbProd : dbDev

    const form = formidable({
        uploadDir,
        keepExtensions: true,
        createDirsFromUploads: true,
        maxFileSize: maxCombinedFileSize,
        filter: ({mimetype}) => mimetype && mimetype.includes('image'),
        filename(name, ext, part) {
            const {fullFilename, filepath, localsubdirs} = createFilename(part, serverPath, uploadDir)
            filepaths.push(filepath)
            subdirs = localsubdirs
            return fullFilename
        }
    })

    try {
        const {fields, files} = await parseForm(req, form)
        for (const fieldName in fields) {
            if (!Array.isArray(fields[fieldName])) {
                fields[fieldName] = [fields[fieldName]]
            }
        }
        const flatFields = flattenFields(fields)
        console.log('flatFields:', flatFields)

        const cleanedFields = selectiveSanitizeValues(flatFields, {profanityOKFields: ['name'], urlsOKFields: []})
        console.log('cleanedFields:', cleanedFields)

        const entry = {
            ...cleanedFields,
            originalLock: cleanedFields.originalLock || cleanedFields.originalMake,
            submittedAt: dayjs().toISOString(),
            updatedAt: dayjs().toISOString()
        }

        const lockName = cleanedFields.name
        const username = cleanedFields.username || 'Unknown'

        entry.media = await Promise.all(filepaths.map(async (filepath, index) => ({
            imageTitle: lockName,
            title: `By: ${username}`,
            fullUrl: filepath,
            fullSizeUrl: (await createThumbnails({
                inputFile: files.files[index].filepath,
                width: 1024
            })).replace(uploadDir, serverPath),
            thumbnailUrl: (await createThumbnails({
                inputFile: files.files[index].filepath,
                width: 500
            })).replace(uploadDir, serverPath),
            thumbnailSquareUrl: (await createThumbnails({
                inputFile: files.files[0].filepath,
                width: 200,
                square: true
            })).replace(uploadDir, serverPath),
            sequenceId: index + 1,
            dateAdded: dayjs().toISOString(),
            subtitle: 'CC BY-NC-SA 4.0'
        })))

        if (subdirs) {
            const destination = `${uploadDir}/${subdirs}`.replace(/\s+/g, '-')
            const detailsJson = JSON.stringify(fields, null, 2)
            try {
                await Promise.all([
                    runCommand(`exiftool -overwrite_original -iptc:Caption-Abstract='By: ${username}' -Title='${slugify(lockName)}' -gps:all= -UserComment='${fields.id}' '${destination}'`),
                    writeFile(`${destination}/uploadData.json`, detailsJson, 'utf8')
                ])
            } catch (err) {
                return handleError(res, 'uploadData or thumbnail writeFile error', err)
            }
        }

        const ref = db.collection('challenge-locks').doc(entry.id)
        try {
            await setDocument(ref, entry, entry.id)
        } catch (error) {
            handleError(res, 'Failed to create Challenge Lock', error, 500)
        }

        try {

            const filesToDelete = filepaths ? [...filepaths] : []
            filesToDelete.shift()

            // TODO: crashing?? use setTimeout and/or promises all
            filesToDelete.map((filepath) => {
                console.log('trying to delete original file:', filepath.replace(serverPath, uploadDir))
                fs.rmSync(`${filepath.replace(serverPath, uploadDir)}`, {force: true})
            })
            console.log('Original files deleted successfully')
        } catch (error) {
            console.error('An error occurred deleteing original files', error.message)
            //res.status(500).send({status: 500, message: 'An error occurred deleting temp directory'})
            return
        }

        const html = `<strong>Challenge Lock submitted: ${sanitizeHTML(lockName)} by ${sanitizeHTML(fields.maker)}</strong><br/><br/>`
        let fieldsHtml = html + '<table style="border-width:1px">'
        for (const key in fields) {
            fieldsHtml += `<tr><td>${sanitizeHTML(key)}</td><td>${sanitizeHTML(fields[key])}</td></tr>`
        }
        fieldsHtml += '</table>'

        try {
            const email = await sendEmail({
                emailConfig: 'challengeLock',
                to: contentUploadRecipients,
                subject: `Challenge Lock submitted: ${lockName}`,
                text: `Challenge Lock submitted: ${lockName}`,
                html: fieldsHtml
            })
            console.log('Message sent: %s', email.messageId)
        } catch (error) {
            return handleError(res, 'Email send error', error)
        }

        console.log('done')
        return res.status(200).json(entry)

    } catch (err) {
        return handleError(res, 'Form Parse Error', err)
    }
}

export async function submitCheckIn(req, res) {
    try {
        req.user = await authenticateRequest(req, res)
    } catch (err) {
        return handleError(res, err.message, err, 403)
    }

    const {prod} = req.body
    const db = prod ? dbProd : dbDev

    const form = formidable({})

    try {
        const {fields} = await parseForm(req, form)
        for (const fieldName in fields) {
            if (!Array.isArray(fields[fieldName])) {
                fields[fieldName] = [fields[fieldName]]
            }
        }

        const flatFields = flattenFields(fields)
        const checkIn = selectiveSanitizeValues(flatFields, {urlsOKFields: ['videoUrl']})

        if ((checkIn.edit === 'true' || checkIn.delete === 'true') && !req.user.CLAdmin && !req.user.admin) {
            return handleError(res, 'Unauthorized', 'Unauthorized', 403)
        }

        let ref = db.collection('challenge-locks').doc(checkIn.lockId)
        const lockEntry = await fetchDocument(ref, checkIn.lockId)
        if (!lockEntry) return handleError(res, 'Lock not found', `No lock matching id ${checkIn.lockId} found`, 404)

        const urlError = checkIn.videoUrl?.length > 0 && !validator.isURL(checkIn.videoUrl)
        if (urlError) checkIn.videoUrl = 'invalid video URL'

        ref = db.collection('challenge-lock-check-ins').doc(checkIn.id)
        if (checkIn.delete !== 'true') {
            try {
                await setDocument(ref, checkIn, checkIn.id)
            } catch (error) {
                handleError(res, 'Failed to create Challenge Lock', error, 500)
            }
        } else {
            // DELETE CHECK-IN
            try {
                await ref.delete()
            } catch (error) {
                return handleError(res, 'Failed to delete Challenge Lock Check-In', error, 500)
            }
            console.log('Check-in deleted:', checkIn.id)
            //return res.status(200).json({status: 200, message: 'Check-in deleted successfully'})
        }


        // TODO: from here on out, just use lockCheckIns

        const lockCheckIns = await getCheckInsForLock(db, checkIn.lockId)

        let updates = {}

        if (lockCheckIns.length > 0) {

            updates.latestUpdate = lockCheckIns[0]

            const ratings = lockCheckIns.reduce((acc, checkIn) => {
                Object.keys(checkIn)
                    .filter(key => key.startsWith('rating'))
                    .forEach(key => {
                        acc[key] = acc[key] || []
                        const ratingValue = parseInt(checkIn[key])
                        if (!isNaN(ratingValue)) {
                            acc[key].push(ratingValue)
                        }
                    })
                return acc
            }, {})

            Object.keys(ratings).forEach(key => {
                updates[key] = [...ratings[key]]
            })

            updates.checkInIds = lockCheckIns.map(checkIn => checkIn.id)
            updates.checkInIdsSuccessful = lockCheckIns
                .filter(checkIn => checkIn.successfulPick === 'Yes')
                .map(checkIn => checkIn.id)
            updates.updatedAt = dayjs().toISOString()
        } else {
            // No check-ins for this lock, so clear the latestUpdate and ratings
            updates.latestUpdate = FieldValue.delete()
            updates.latestCheckIn = FieldValue.delete()
            updates.checkInIds = FieldValue.delete()
            updates.checkInIdsSuccessful = FieldValue.delete()

            const ratingKeys = ['Fun', 'Difficulty', 'Creativity', 'Quality']
            ratingKeys.forEach(key => {
                const ratingKey = `rating${key}`
                updates[ratingKey] = FieldValue.delete()
            })
        }


        // SUBMIT UPDATES
        if (Object.keys(updates).length > 0) {
            ref = db.collection('challenge-locks').doc(checkIn.lockId)
            await updateDocument(ref, updates, checkIn.lockId)
        }

        return res.status(200).json(checkIn)

    } catch (err) {
        return handleError(res, 'Form Parse Error', err)
    }
}

export async function reportProblem(req, res) {
    try {
        req.user = await authenticateRequest(req, res)
    } catch (err) {
        return handleError(res, err.message, err, 403)
    }
    const {prod} = req.body
    const db = prod ? dbProd : dbDev

    const form = formidable({})

    try {
        const {fields} = await parseForm(req, form)
        for (const fieldName in fields) {
            if (!Array.isArray(fields[fieldName])) {
                fields[fieldName] = [fields[fieldName]]
            }
        }
        const flatFields = flattenFields(fields)
        const entry = selectiveSanitizeValues(flatFields)

        let ref = db.collection('challenge-locks').doc(entry.entryId)
        const lockEntry = await fetchDocument(ref, entry.entryId)

        console.log('lockEntry:', lockEntry)

        const updates = {problems: lockEntry.problems ? [...lockEntry.problems, entry] : [entry]}

        if (Object.keys(updates).length > 0) {
            try {
                await updateDocument(ref, updates, entry.entryId)
            } catch (error) {
                return handleError(res, 'Failed to update Challenge Lock', error, 500)
            }
        }

        // send email
        let html = `<strong>Problem reported: <a href='https://beta.lpulocks.com/#/challengelocks?id=${entry.entryId}'>${sanitizeHTML(entry.entryName)} by ${sanitizeHTML(entry.entryMaker)}</a><br/></strong><br/><br/>`
        let fieldsHtml = html + '<table style="border-width:1px">'
        for (const key in entry) {
            fieldsHtml += `<tr><td>${sanitizeHTML(key)}</td><td>${sanitizeHTML(fields[key])}</td></tr>`
        }
        fieldsHtml += '</table>'

        console.log('fieldsHtml:', fieldsHtml)

        try {
            const email = await sendEmail({
                emailConfig: 'challengeLock',
                to: contentUploadRecipients,
                subject: `Challenge Lock Problem Reported for: ${entry.entryName}`,
                text: `Challenge Lock Problem Reported for: ${entry.entryName}`,
                html: fieldsHtml
            })
            console.log('Message sent: %s', email.messageId)
        } catch (error) {
            return handleError(res, 'Email send error', error)
        }

    } catch (err) {
        return handleError(res, 'Form Parse Error', err)
    }

    console.log('done')
    return res.status(200).json('Report Problem Endpoint Hit')
}


export async function clearProblems(req, res) {

    try {
        req.user = await authenticateRequest(req, res)
    } catch (err) {
        return handleError(res, err.message, err, 403)
    }

    if (!req.user.CLAdmin && !req.user.admin) {
        return handleError(res, 'Unauthorized', 'Unauthorized', 403)
    }

    const {prod} = req.body
    const db = prod ? dbProd : dbDev

    const form = formidable({})

    try {
        const {fields} = await parseForm(req, form)
        for (const fieldName in fields) {
            if (!Array.isArray(fields[fieldName])) {
                fields[fieldName] = [fields[fieldName]]
            }
        }
        const entry = flattenFields(fields)
        jsonIt('entry:', entry)

        let ref = db.collection('challenge-locks').doc(entry.entryId)
        const lockEntry = await fetchDocument(ref, entry.entryId)

        console.log('lockEntry:', lockEntry)

        const updates = {problems: FieldValue.delete()}

        if (Object.keys(updates).length > 0) {
            try {
                await updateDocument(ref, updates, entry.entryId)
            } catch (error) {
                return handleError(res, 'Failed to update Challenge Lock', error, 500)
            }
        }
    } catch (err) {
        return handleError(res, 'Form Parse Error', err)
    }

    console.log('done')
    return res.status(200).json('Report Problem Endpoint Hit')
}

async function getCheckInsForLock(db, lockId) {
    console.log('getting checkins for lockId:', lockId)
    const snap = await db
        .collection('challenge-lock-check-ins')
        .where('lockId', '==', lockId)
        .get()
    const checkIns = snap.docs.map(doc => ({id: doc.id, ...doc.data()}))
    console.log('got checkins for id:', lockId, checkIns.length)
    return checkIns.sort((a, b) => {
        const pickA = dayjs(a.pickDate).valueOf()
        const pickB = dayjs(b.pickDate).valueOf()
        if (pickB !== pickA) return pickB - pickA
        return dayjs(b.updatedAt).valueOf() - dayjs(a.updatedAt).valueOf()
    })
}


async function setDocument(ref, entry, entryId) {
    try {
        await ref.set(entry)
        return entry
    } catch (error) {
        console.error(`Error setting document ${entryId}:`, error)
        throw error
    }
}

async function fetchDocument(ref, entryId) {
    try {
        const docSnap = await ref.get(entryId)
        if (!docSnap) {
            console.warn(`No ranking request found for entry: ${entryId}`)
            return null
        }
        return docSnap.data()
    } catch (error) {
        console.error(`Error getting document ${entryId}:`, error)
        return null
    }
}

async function updateDocument(ref, updates, entryId) {
    try {
        await ref.update(updates)
        return updates
    } catch (error) {
        console.error(`Error updating document ${entryId}:`, error)
        throw error
    }
}


async function authenticateRequest(req) {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new Error('Unauthorized')
    }
    const idToken = authHeader.split('Bearer ')[1]
    const decodedToken = await admin.auth().verifyIdToken(idToken)
    if (!decodedToken) {
        throw new Error('Insufficient permissions')
    }
    return decodedToken
}

function createFilename(part, serverPath, uploadDir) {
    const {originalFilename} = part
    if (!originalFilename) return 'invalid'

    const filenameParts = originalFilename.split('/')
    const filename = filenameParts.pop()
    const matches = filename.match(/(.*)(\..\w*$)/)
    const basename = slugify(matches[1]) + '.' + slugify(matches[2])
    const localsubdirs = filenameParts.map(slugify).join('').replace(/\s+/g, '-')
    const fullFilename = `${localsubdirs}/${basename}`
    const filepath = `${serverPath}/${localsubdirs}/${basename}`
    const uploadSubDir = `${uploadDir}/${localsubdirs}`.replace(/\s+/g, '-')
    return {fullFilename, filepath, uploadSubDir, localsubdirs}
}


async function runCommand(command) {
    try {
        const {stdout, stderr} = await execAsync(command)
        console.log('runCommand stdout:', stdout.trim(), 'stderr:', stderr)
    } catch (error) {
        console.error('runCommand error:', error)
    }
}

function sanitizeHTML(str) {
    return String(str).replace(/[&<>"']/g, function (char) {
        switch (char) {
            case '&':
                return '&amp;'
            case '<':
                return '&lt;'
            case '>':
                return '&gt;'
            case '"':
                return '&quot;'
            case '\'':
                return '&#39;'
            default:
                return char
        }
    })
}

function slugify(str) {
    return str
        .replace(/^\s+|\s+$/g, '')
        .replace(/[^a-zA-Z0-9\-_+ ]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/'/g, '')
}

if (!Array.prototype.firstValue) {
    Object.defineProperty(Array.prototype, 'firstValue', {
        value: function () {
            return this[0]
        },
        enumerable: false
    })
}
