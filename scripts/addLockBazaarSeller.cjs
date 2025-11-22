const admin = require('firebase-admin')
const serviceAccount = require('../keys/lock-trackers-firebase-adminsdk.json')
const {getFirestore} = require('firebase-admin/firestore')
const app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://lock-trackers.firebaseio.com'
})

const prod = true
const db = prod ? getFirestore(app) : getFirestore(app, 'locktrackersdev')

const userId = 'Z0IiGe4oTTbMXHwQ9E3PCA9F9bl2'
const data = {
    isSeller: true,
    name: 'Kaiser',
    spreadsheetId: '11fZHTo0dQpyk4cuknTEkRm1ZmqIVUg0Q9FH_SQv21Y0'
}

setDocument(db.collection('admins').doc(userId), data, userId)
    .then(() => console.log(`Updated user ${data.name} (${userId})`))
    .catch(err => console.error(`Error updating user ${data.name} (${userId})`, err))

async function setDocument(ref, entry, entryId) {
    try {
        await ref.set(entry, {merge: true})
        return entry
    } catch (error) {
        console.error(`Error setting document ${entryId}:`, error)
        throw error
    }
}
