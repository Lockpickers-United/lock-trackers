import fs from 'fs'
import admin from 'firebase-admin'
import {getFirestore} from 'firebase-admin/firestore'
import dayjs from 'dayjs'
import {prodUser} from '../../../keys/users.js'
import validator from 'validator'
import {collection, getDocs, query, where} from 'firebase/firestore'

const prodEnvironment = prodUser === process.env.USER
const keysDir = prodEnvironment
    ? `/home/${process.env.USER}/lpulocks-node/keys`
    : `/Users/${process.env.USER}/Documents/GitHub/lpulocks/lpulocks-node/keys`

const serviceAccount = JSON.parse(await fs.promises.readFile(`${keysDir}/service-account.json`, 'utf8'))
const requestapp = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://lock-trackers.firebaseio.com'
})
const dbProd = getFirestore(requestapp)
dbProd.settings({ignoreUndefinedProperties: true})

const dbDev = getFirestore(requestapp, 'locktrackersdev')
dbDev.settings({ignoreUndefinedProperties: true})

const db = dbDev
let errors = []

const checkInData = JSON.parse(await fs.promises.readFile('./checkInImport.json', 'utf8'))
const countries = JSON.parse(await fs.promises.readFile('../../../../src/data/countries.json', 'utf8'))
const statesProvinces = JSON.parse(await fs.promises.readFile('../../../../src/data/statesProvinces.json', 'utf8'))

// Pre-flight the data
console.log('starting pre-flight checks on lock data...')

const requiredFields = ['id', 'lockId', 'username', 'usernamePlatform', 'pickDate', 'successfulPick', 'userId']

const getDuplicates = arr => {
    const seen = new Set()
    const duplicates = new Set()
    for (const v of arr) {
        if (seen.has(v)) {
            duplicates.add(v)
        } else {
            seen.add(v)
        }
    }
    return [...duplicates]
}

const challengeLocks = await getAllChallengeLocks()
console.log(`Found ${challengeLocks.length} challenge locks`)

checkInData.forEach(checkIn => {
    // Check required fields
    requiredFields.forEach(field => {
        if (!checkIn[field]) {
            errors.push(`Missing required field ${field} for check-in ${checkIn.id}`)
        }
    })

    // Validate checkInId
    if (!/^clci_[0-9a-f]{8}$/i.test(checkIn.id)) {
        errors.push(`Invalid checkInId ${checkIn.id}`)
    }

    // Validate lockId format
    if (!/^cl_[0-9a-f]{8}$/i.test(checkIn.lockId)) {
        errors.push(`Invalid lockId ${checkIn.lockId} for checkIn ${checkIn.id}`)
    }

    // Validate lock exists in the database
    const lockExists = challengeLocks.some(lock => lock.id === checkIn.lockId)
    if (!lockExists) {
        errors.push(`Lock with id ${checkIn.lockId} does not exist for checkIn ${checkIn.id}`)
    }

    // Check for unique lockId in import data
    const checkInIds = checkInData.map(l => l.id)
    if (new Set(checkInIds).size !== checkInIds.length) {
        errors.push('Duplicate checkInIds found:' + getDuplicates(checkInIds).join(', '))
    }

    // Validate country
    const country = countries.find(c => c.country_area === checkIn.country)
    if (checkIn.country && !country) {
        errors.push(`Invalid country ${checkIn.country} for checkIn ${checkIn.id}`)
    }

    // Validate state/province
    if (checkIn.stateProvince && !statesProvinces[checkIn.country]?.includes(checkIn.stateProvince)) {
        errors.push(`Invalid state/province ${checkIn.stateProvince} for checkIn ${checkIn.id}`)
    }

    // Validate dates
    if (!dayjs(checkIn.pickDate).isValid() || dayjs(checkIn.pickDate).isAfter(dayjs())) {
        errors.push(`Invalid pickDate for lock ${checkIn.id}`)
    }
})

if (errors.length > 0) {
    console.error('Errors found during pre-flight checks:')
    errors.forEach(err => console.error('-', err))
    process.exit(1)
}

console.log('no pre-flight issues found...')

// Process the check-in data
checkInData.forEach(checkIn => {
    checkIn.submittedAt = dayjs().toISOString()
    checkIn.updatedAt = dayjs().toISOString()
    checkIn.source = 'import'
    delete checkIn.maker
    delete checkIn.name
})

// Submit the check-ins
console.log(`Submitting ${checkInData.length} check-ins...`)

if (checkInData.length === 0) {
    console.log('No check-ins to submit.')
    process.exit(0)
} else {
    for (const checkIn of checkInData) {
        try {
            await submitCheckIn(checkIn)
            console.log(`Submitted check‐in ${checkIn.id}`)
        } catch (err) {
            console.error(`Error submitting check‐in ${checkIn.id}:`, err)
        }
    }
    console.log('All check‐ins processed')
}

async function submitCheckIn(checkIn) {

    try {
        const urlError = checkIn.videoUrl?.length > 0 && !validator.isURL(checkIn.videoUrl)
        if (urlError) checkIn.videoUrl = 'invalid video URL'

        let ref = db.collection('challenge-lock-check-ins').doc(checkIn.id)
        try {
            await setDocument(ref, checkIn, checkIn.id)
        } catch (error) {
            console.error('Failed to create checkIn', error)
        }

        ref = db.collection('challenge-locks').doc(checkIn.lockId)
        const lockEntry = await fetchDocument(ref, checkIn.lockId)

        let updates = {}
        if (!lockEntry.latestUpdate
            || dayjs(checkIn.pickDate).isSame(lockEntry.latestUpdate?.pickDate)
            || dayjs(checkIn.pickDate).isAfter(lockEntry.latestUpdate?.pickDate)
        ) {
            updates.latestUpdate = checkIn
        }

        const ratings = Object.keys(checkIn)
            .filter(key => key.startsWith('rating'))
            .reduce((acc, key) => {
                acc[key] = parseInt(checkIn[key])
                return acc
            }, {})

        //TODO: update ratings with actual check-in data, not just add to existing
        Object.keys(ratings).forEach(key => {
            updates[key] = lockEntry[key]
                ? [...lockEntry[key], ratings[key]]
                : [ratings[key]]
        })

        updates.checkInIds = [... new Set([...lockEntry.checkInIds, checkIn.id])]
        if (checkIn.successfulPick === 'Yes') {
            updates.checkInIdsSuccessful = [... new Set([...lockEntry.checkInIdsSuccessful, checkIn.id])]
        } else {
            updates.checkInIdsSuccessful = lockEntry.checkInIdsSuccessful?.filter(id => id !== checkIn.id)
        }
        updates.updatedAt = dayjs().toISOString()

        // SUBMIT UPDATES
        if (Object.keys(updates).length > 0) {
            await updateDocument(ref, updates, checkIn.lockId)
        }

    } catch (err) {
        return console.error('Error', err)
    }

}

//         let ref = db.collection('challenge-lock-check-ins').doc(checkIn.id)

async function getCheckInsForLock(db, lockId) {
    console.log('get checkins for lockId:', lockId)
    const checkIns = []
    const q = query(collection(db, 'challenge-lock-check-ins'), where('lockId', '==', lockId))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
        checkIns.push(doc.data())
    })
    console.log('got checkins for id:', lockId, checkIns.length)
    return checkIns.sort((a, b) => dayjs(b.pickDate).isBefore(dayjs(a.pickDate)) ? -1 : 1)
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


async function batchSubmitChallengeLocks(docs) {
    const collectionRef = db.collection('challenge-lock-check-ins')
    const batch = db.batch()
    for (const data of docs) {
        const ref = collectionRef.doc(data.id)
        batch.set(ref, data)
    }
    await batch.commit()
}

async function getAllChallengeLocks() {
    return await db.collection('challenge-locks').get()
        .then(snapshot => {
            let locks = []
            snapshot.forEach(doc => {
                locks.push(doc.data())
            })
            return locks
        })
        .catch(err => {
            console.log('Error getting documents', err)
        })
}

process.exit(1)

batchSubmitChallengeLocks(checkInData)
    .then(() => console.log('batch write complete'))
    .catch(err => console.error('batch write failed', err))
