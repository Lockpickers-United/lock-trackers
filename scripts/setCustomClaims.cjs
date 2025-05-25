const admin = require('firebase-admin')
const serviceAccount = require('../keys/lock-trackers-firebase-adminsdk.json')
const {getFirestore} = require('firebase-admin/firestore')
const app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://lock-trackers.firebaseio.com'
})

const prod = false

const db = prod ? getFirestore(app) : getFirestore(app, 'locktrackersdev')

// Custom claims to set
const newClaims = {CLAdmin:true}

// List of user IDs to update
const users = [
    {uid: 'ClbjuilBEHgbzO4UZl4y3GStlEz2', name: 'mgsecure'},
]

const team = [ // eslint-disable-line
    {uid: 'ClbjuilBEHgbzO4UZl4y3GStlEz2', name: 'mgsecure'},
]

async function updateCustomClaimsForUsers() {
    for (const user of users) {
        const {uid, name} = user
        try {
            const userRecord = await admin.auth().getUser(uid)
            const currentClaims = userRecord.customClaims || {}
            // delete currentClaims.SPadmin
            const updatedClaims = {...currentClaims, ...newClaims}
            await admin.auth().setCustomUserClaims(uid, updatedClaims)

            const ref = db.doc(`/user-claims-info/${uid}`)
            await ref.set({...updatedClaims, name})

            console.log(`Updated custom claims for user ${uid} (${userRecord.displayName})`, updatedClaims)
        } catch (error) {
            console.error(`Error updating custom claims for user ${uid}:`, error)
        }
    }
    console.log('Finished updating custom claims for all users.')
    process.exit(0) // Exit process after finishing
}

async function getCustomClaimsForUsers() {

    console.log('Getting custom claims for all users...')
    for (const user of users) {
        const {uid, name} = user
        await admin.auth().getUser(uid)
            .then(userRecord => {
                console.log('Custom claims for user', uid, `(${name})`, userRecord.customClaims)
            })
            .catch(error => {
                console.error('Error fetching user data:', error)
            })
    }
    console.log('Finished logging custom claims for all users.')
    process.exit(0) // Exit process after finishing
}

// Execute the functions
updateCustomClaimsForUsers().then(() => {
    getCustomClaimsForUsers().then()
})


