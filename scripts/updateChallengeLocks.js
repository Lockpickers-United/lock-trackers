/* eslint-disable */

import fs from 'fs'
import admin from 'firebase-admin'
import {FieldValue, getFirestore} from 'firebase-admin/firestore'
import {prodUser} from '../lpulocks-node/keys/users.js'
import dayjs from 'dayjs'

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

const db = dbProd

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

async function getAllCheckIns() {
    return await db.collection('challenge-lock-check-ins').get()
        .then(snapshot => {
            let checkIns = []
            snapshot.forEach(doc => {
                checkIns.push(doc.data())
            })
            return checkIns
        })
        .catch(err => {
            console.log('Error getting documents', err)
        })
}

const challengeLocks = await getAllChallengeLocks()
console.log(`Found ${challengeLocks.length} challenge locks`)

const checkIns = await getAllCheckIns()
console.log(`Found ${checkIns.length} check-ins`)


await updateChallengeLocks(challengeLocks).then(() => console.log('Update complete'))

// TODO: convert everything to lockCreatedAt
// TODO: any other cleanup???


async function updateChallengeLocks(locks) {
    try {
        locks.forEach(lock => {

            // 2025-06-18T22:44:12.923Z
            //if (lock.lockCreated && dayjs(lock.lockCreated).isSame('2025-06-18', 'day')) {

            if (lock.maker === 'NicVT') {
                console.log(`Changing NicVT to NICVT for lock ${lock.id}`)
                lock.maker = 'NICVT'

                setDocument(db.collection('challenge-locks').doc(lock.id), lock, lock.id)
                    .then(() => console.log(`Updated lock ${lock.id}`))
                    .catch(err => console.error(`Error updating lock ${lock.id}`, err))

            }

        })
        return 'Locks updated successfully'
    } catch (error) {
        console.error('Error updating challenge locks:', error)
        return 'Error updating challenge locks'
    }
}

async function deleteChallengeLocks(lockIds) {
    try {
        lockIds.forEach(lockId => {
            const ref = db.collection('challenge-locks').doc(lockId)
            ref.delete()
                .then(() => console.log(`Deleted lock ${lockId}`))
                .catch(err => console.error(`Error deleting lock ${lockId}`, err))

        })
        return 'Locks deleted successfully'
    } catch (error) {
        console.error('Error deleting challenge locks:', error)
        return 'Error deleting challenge locks'
    }
}


async function batchSubmitChallengeLocks(docs) {
    const collectionRef = db.collection('challenge-locks')
    const batch = db.batch()
    for (const data of docs) {
        const ref = collectionRef.doc(data.id)
        batch.set(ref, data)
    }
    await batch.commit()
}

//batchSubmitChallengeLocks(challengeLocks)
  //  .then(() => console.log('batch write complete'))
    //.catch(err => console.error('batch write failed', err))

async function setDocument(ref, entry, entryId) {
    try {
        await ref.set(entry, {merge: true})
        return entry
    } catch (error) {
        console.error(`Error setting document ${entryId}:`, error)
        throw error
    }
}
