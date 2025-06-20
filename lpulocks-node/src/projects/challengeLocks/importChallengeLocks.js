import fs from 'fs'
import admin from 'firebase-admin'
import {getFirestore} from 'firebase-admin/firestore'
import dayjs from 'dayjs'
import {prodUser} from '../../../keys/users.js'

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

const lockData = JSON.parse(await fs.promises.readFile('./challengeLockImport.json', 'utf8'))
const countries = JSON.parse(await fs.promises.readFile('../../../../src/data/countries.json', 'utf8'))
const statesProvinces = JSON.parse(await fs.promises.readFile('../../../../src/data/statesProvinces.json', 'utf8'))
const lockFormats = JSON.parse(await fs.promises.readFile('../../../../src/data/lockFormats.json', 'utf8'))
const lockingMechanisms = JSON.parse(await fs.promises.readFile('../../../../src/data/lockingMechanisms.json', 'utf8'))

// Pre-flight the data
// Ensure all lockIds are valid
// Ensure all lockIds are unique
// Ensure all lockIds are not already in the database
// Ensure required fields are present

console.log('starting pre-flight checks on lock data...')

const requiredFields = ['id', 'maker', 'name', 'lockFormat',
    'submittedByUserId', 'submittedByUsername', 'submittedByUsernamePlatform']

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

lockData.forEach(lock => {
    // Check required fields
    requiredFields.forEach(field => {
        if (!lock[field]) {
            errors.push(`Missing required field ${field} for lock ${lock.id}`)
        }
    })

    // Validate lockId
    if (!/^cl_[0-9a-f]{8}$/i.test(lock.id)) {
        errors.push(`Invalid lockId ${lock.id} for ${lock.name} by ${lock.maker}`)
    }

    // Check for unique lockId in import data
    const lockIds = lockData.map(l => l.id)
    if (new Set(lockIds).size !== lockIds.length) {
        errors.push('Duplicate lockIds found:' + getDuplicates(lockIds).join(', '))
    }

    // Check for existing lockId in the database ?????

    // Validate country
    const country = countries.find(c => c.country_area === lock.country)
    if (lock.country && !country) {
        errors.push(`Invalid country ${lock.country} for lock ${lock.id}`)
    }

    // Validate state/province
    if (lock.stateProvince && !statesProvinces[lock.country]?.includes(lock.stateProvince)) {
        errors.push(`Invalid state/province ${lock.stateProvince} for lock ${lock.id}`)
    }

    // Validate lockFormat
    if (lock.lockFormat && !lockFormats.includes(lock.lockFormat)) {
        errors.push(`Invalid lockFormat ${lock.lockFormat} for lock ${lock.id}`)
    }

    // Validate lockingMechanism
    if (lock.lockingMechanism && !lockingMechanisms.includes(lock.lockingMechanism)) {
        errors.push(`Invalid lockingMechanism ${lock.lockingMechanism} for lock ${lock.id}`)
    }

    // Validate dates
    if (!dayjs(lock.lockCreated).isValid() || dayjs(lock.lockCreated).isAfter(dayjs())) {
        errors.push(`Invalid createdAt date for lock ${lock.id}`)
    }
})

if (errors.length > 0) {
    console.error('Errors found during pre-flight checks:')
    errors.forEach(err => console.error('-', err))
    process.exit(1)
}

console.log('no pre-flight issues found...')

// Check for existing locks in the database???


// Prepare the data for import
// Roll up submittedBy values ??
// convert dates to ISO format
// set submittedAt and updatedAt to now

lockData.forEach(lock => {
    lock.submittedAt = dayjs().toISOString()
    lock.updatedAt = dayjs().toISOString()
    lock.lockCreated = dayjs(lock.lockCreated).toISOString()
    lock.source = 'import'
})

async function batchSubmitChallengeLocks(docs) {
    const collectionRef = db.collection('challenge-locks')
    const batch = db.batch()
    for (const data of docs) {
        const ref = collectionRef.doc(data.id)
        batch.set(ref, data)
    }
    await batch.commit()
}

batchSubmitChallengeLocks(lockData)
    .then(() => console.log('batch write complete'))
    .catch(err => console.error('batch write failed', err))
