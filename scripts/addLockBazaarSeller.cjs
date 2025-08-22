const admin = require('firebase-admin')
const serviceAccount = require('../keys/lock-trackers-firebase-adminsdk.json')
const {getFirestore} = require('firebase-admin/firestore')
const app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://lock-trackers.firebaseio.com'
})

const prod = true
const db = prod ? getFirestore(app) : getFirestore(app, 'locktrackersdev')

const userId = 'bIhsXlpq2KQKeDhVRFKfBbzYN1F3'
const data = {
    isSeller: true,
    name: 'Olyckan',
    spreadsheetId: '11T-kapv6fTzvIj9j0k6qz7rgGk20X1KdEG6nGsmOtTo'
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
