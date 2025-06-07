/**
 * @prop newBrand
 * @prop approxBelt
 * @prop discordUsername
 * @prop redditUsername
 */

import {formidable} from '../../util/formidable/src/index.js'
import fs from 'fs'
import {sendEmail} from '../nodeMailer/nodeMailer.js'
import util from 'util'
import {exec} from 'child_process'
import createThumbnails from '../../util/createThumbnails.js'
import {contentUploadRecipients, prodUser} from '../../../keys/users.js'
import admin from 'firebase-admin'
import {getFirestore, FieldValue} from 'firebase-admin/firestore'
import jsonIt from '../../util/jsonIt.js'
import sanitizeValues from '../../util/sanitizeValues.js'
import validator from 'validator'
import dayjs from 'dayjs'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter.js'
dayjs.extend(isSameOrAfter)

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
        jsonIt('flatFields:', flatFields)

        let ref = db.collection('challenge-locks').doc(flatFields.id)
        const lockEntry = await fetchDocument(ref, flatFields.id)
        if (!lockEntry) return handleError(res, 'Lock not found', `No lock matching id ${flatFields.id} found`, 404)


        //console.log('lockEntry:', lockEntry)

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
            // Optionally, save uploadSubDir to a local variable (e.g. in closure) instead of global ??????
            // was: localUploadSubDir = uploadSubDir ????
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
        jsonIt('flatFields:', flatFields)

        const entry = {
            id: flatFields.id,
            name: flatFields.name,
            maker: flatFields.maker,
            lockCreated: flatFields.lockCreated,
            country: flatFields.country,
            stateProvince: flatFields.stateProvince,
            lockingMechanism: flatFields.lockingMechanism,
            originalLock: flatFields.originalMake || flatFields.originalLock,
            lockFormat: flatFields.lockFormat,
            description: flatFields.description,
            descriptionFull: flatFields.descriptionFull,
            approximateBelt: flatFields.approxBelt,
            submittedBy: {
                userId: req.user.user_id,
                userBelt: flatFields.userBelt,
                displayName: flatFields.displayName,
                username: flatFields.username,
                usernamePlatform: flatFields.usernamePlatform
            },
            submittedAt: dayjs().toISOString(),
            updatedAt: dayjs().toISOString()

        }

        const lockName = flatFields.name
        const username = flatFields.username || 'Unknown'

        console.log('username:', username)
        console.log('fields:', fields)

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


        //entry.mainImage = [entry.media[0]]

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
            filepaths.map((filepath) => {
                fs.rmSync(`${filepath}`, {force: true})
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

    console.log('req.body:', req.body)
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

        const urlError = entry.videoUrl?.length > 0 && !validator.isURL(entry.videoUrl)
        if (urlError) entry.videoUrl = 'invalid video URL'

        let ref = db.collection('challenge-lock-check-ins').doc(entry.id)
        try {
            await setDocument(ref, entry, entry.id)
        } catch (error) {
            handleError(res, 'Failed to create Challenge Lock', error, 500)
        }

        // set lock: latestCheckIn, ratings, approx belt, checkInCount

        ref = db.collection('challenge-locks').doc(entry.lockId)
        const lockEntry = await fetchDocument(ref, entry.lockId)

        let updates = {}
        if (!lockEntry.latestUpdate
            || dayjs(entry.pickDate).isSameOrAfter(lockEntry.latestUpdate?.pickDate))
        {
            updates.latestUpdate = entry
        }

        const ratings = Object.keys(entry)
            .filter(key => key.startsWith('rating'))
            .reduce((acc, key) => {
                acc[key] = parseInt(entry[key])
                return acc
            }, {})
        Object.keys(ratings).forEach(key => {
            updates[key] = lockEntry[key]
                ? [...lockEntry[key], ratings[key]]
                : [ratings[key]]
        })

        updates.approxBelt = lockEntry.approxBelt
            ? [...lockEntry.approxBelt, entry.approxBelt]
            : [lockEntry.approxBelt]

        updates.checkInCount = (lockEntry.checkInCount || 0) + 1
        updates.successCount = (lockEntry.successCount || 0) + (entry.successfulPick === 'Yes' ? 1 : 0)
        updates.updatedAt = dayjs().toISOString()

        // SUBMIT UPDATES
        if (Object.keys(updates).length > 0) {
            await updateDocument(ref, updates, entry.lockId)
        }

        console.log('done')
        return res.status(200).json(entry)

    } catch (err) {
        return handleError(res, 'Form Parse Error', err)
    }

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

function flattenFields(fields) {
    const flatFields = {}
    for (const key in fields) {
        if (Array.isArray(fields[key])) {
            flatFields[key] = fields[key].length > 0 ? fields[key][0] : ''
        } else {
            flatFields[key] = fields[key] || ''
        }
    }
    return sanitizeValues(flatFields)
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

function parseForm(req, form) {
    return new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
            if (err) return reject(err)
            resolve({fields, files})
        })
    })
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
