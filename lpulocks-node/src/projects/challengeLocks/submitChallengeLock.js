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
import dayjs from 'dayjs'
import createThumbnails from '../../util/createThumbnails.js'
import {contentUploadRecipients, prodUser} from '../../../keys/users.js'
import admin from 'firebase-admin'
import {getFirestore} from 'firebase-admin/firestore'

const {writeFile} = fs.promises
const prod = prodUser === process.env.USER
const keysDir = prod
    ? `/home/${process.env.USER}/lpulocks-node/keys`
    : `/Users/${process.env.USER}/Documents/GitHub/lpulocks/lpulocks-node/keys`

const uploadDir = prod
    ? `/home/${process.env.USER}/lpulocks.com.data/lockbazaar/images`
    : `/Users/${process.env.USER}/Documents/LOCKPICK/LockTrackers/challenge-locks/uploads`

const serverPath = 'https://data.lpulocks.com/lockbazaar/images'

const serviceAccount = JSON.parse(await fs.promises.readFile(`${keysDir}/service-account.json`, 'utf8'))
const requestapp = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://lock-trackers.firebaseio.com'
})
const dbProd = getFirestore(requestapp)
dbProd.settings({ignoreUndefinedProperties: true})

const dbDev = getFirestore(requestapp, 'locktrackersdev')
dbDev.settings({ignoreUndefinedProperties: true})

const execAsync = util.promisify(exec)

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

export default async function submitChallengeLock(req, res) {

    let subdirs = ''
    let filepaths = []

    try {
        req.user = await authenticateRequest(req, res)
    } catch (err) {
        return handleError(res, err.message, err, 403)
    }

    console.log('req.body:', req.body)


    const {prod} = req.body
    const db = prod ? dbProd : dbDev

    const form = formidable({
        uploadDir,
        keepExtensions: true,
        createDirsFromUploads: true,
        maxFileSize: 30 * 1024 * 1024,
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

        const entry = {
            id: fields.id?.firstValue(),
            name: fields.name?.firstValue(),
            maker: fields.maker?.firstValue(),
            createdAt: fields.createdAt?.firstValue(),
            country: fields.country?.firstValue(),
            stateProvince: fields.stateProvince?.firstValue(),
            lockingMechanism: fields.lockingMechanism?.firstValue(),
            originalMake: fields.originalMake?.firstValue(),
            lockFormat: fields.lockFormat?.firstValue(),
            description: fields.description?.firstValue(),
            descriptionFull: fields.descriptionFull?.firstValue(),
            approximateBelt: fields.approxBelt?.firstValue(),
            requestedBy: [{
                owner: true,
                userId: req.user.user_id,
                userBelt: fields.userBelt?.firstValue(),
                displayName: fields.displayName?.firstValue(),
                discordUsername: fields.discordUsername?.firstValue(),
                redditUsername: fields.redditUsername?.firstValue()
            }],
            dateSubmitted: dayjs().toISOString()
        }

        entry.media = await Promise.all(filepaths.map(async (filepath, index) => ({
            title: `By: ${fields.discordUsername || fields.redditUsername}`,
            fullUrl: filepath,
            fullSizeUrl: (await createThumbnails({
                inputFile: files.files[index].filepath,
                width: 1024
            })).replace(uploadDir, serverPath),
            thumbnailUrl: (await createThumbnails({
                inputFile: files.files[index].filepath,
                width: 500
            })).replace(uploadDir, serverPath),
            sequenceId: index + 1,
            dateAdded: dayjs().toISOString(),
            subtitle: 'CC BY-NC-SA 4.0'
        })))

        entry.mainImage = [entry.media[0]]
        const lockName = fields.name?.firstValue()

        if (subdirs) {
            const destination = `${uploadDir}/${subdirs}`.replace(/\s+/g, '-')
            const detailsJson = JSON.stringify(fields, null, 2)
            try {
                await Promise.all([
                    runCommand(`exiftool -overwrite_original -iptc:Caption-Abstract='By: ${fields.discordUsername || fields.redditUsername}' -Title='${slugify(lockName)}' -gps:all= -UserComment='${fields.id}' '${destination}'`),
                    writeFile(`${destination}/uploadData.json`, detailsJson, 'utf8')
                ])
            } catch (err) {
                return handleError(res, 'uploadData or thumbnail writeFile error', err)
            }
        }

        const ref = db.collection('challenge-locks').doc(entry.id)
        try {
            //await fetchChallengeLock(ref, '00000001')
            await setChallengeLock(ref, entry, entry.id)
        } catch (error) {
            handleError(res, 'Failed to create Challenge Lock', error, 500)
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


async function setChallengeLock(ref, entry, entryId) {
    try {
        await ref.set(entry)
        return entry
    } catch (error) {
        console.error(`Error setting document ${entryId}:`, error)
        throw error
    }
}

async function getChallengeLock(ref, entry, entryId) {
    try {
        await ref.get(entryId)
        return entry
    } catch (error) {
        console.error(`Error setting document ${entryId}:`, error)
        throw error
    }
}


////////////



async function fetchChallengeLock(ref, entryId) {
    try {
        const docSnap = await ref.get(entryId)
        if (!docSnap) {
            console.warn(`No challenge lock found for id: ${entryId}`)
            return null
        }
        return docSnap.data()
    } catch (error) {
        console.error(`Error getting document ${entryId}:`, error)
        return null
    }
}

async function updateRankingRequest(ref, data, entryId) {
    try {
        await ref.update(data)
        return data
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
