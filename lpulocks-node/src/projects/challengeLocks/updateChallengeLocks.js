import fs from 'fs'
import admin from 'firebase-admin'
import {FieldValue, getFirestore} from 'firebase-admin/firestore'
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

const challengeLocks = await db.collection('challenge-locks').get()
        .then(snapshot => {
            let locks = []
            snapshot.forEach(doc => {
                //console.log(doc.id, '=>', doc.data())
                locks.push(doc.data())
            })
            return locks
        })
        .catch(err => {
            console.log('Error getting documents', err)
        })

console.log(`Found ${challengeLocks.length} challenge locks`)


// TODO: convert everything to lockCreatedAt
// TODO: any other cleanup???

challengeLocks.forEach(lock => {
    lock.submittedBy = FieldValue.delete() // Remove the old submittedBy field
    setDocument(db.collection('challenge-locks').doc(lock.id), lock, lock.id)
        .then(() => console.log(`Updated lock ${lock.id}`))
        .catch(err => console.error(`Error updating lock ${lock.id}`, err))
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
