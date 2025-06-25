const admin = require('firebase-admin')
const serviceAccount = require('../keys/lock-trackers-firebase-adminsdk.json')
const {getFirestore} = require('firebase-admin/firestore')
const app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://lock-trackers.firebaseio.com'
})

const prod = true

const db = prod ? getFirestore(app) : getFirestore(app, 'locktrackersdev')

// Custom claims to set
const newClaims = {SPAdmin:true}

// List of user IDs to update
const users = [
    {name: 'NICVT_Locks', uid: 'PHU1oYSJfKQbKarqTygoqMIG2Cr2'},
]


const REFERENCE = [ // eslint-disable-line
    {name: 'mgsecure', uid: 'ClbjuilBEHgbzO4UZl4y3GStlEz2'},
    {name: 'LPUBeltApp', uid: 'RurNRdbzIWPDCYrFvF52H5051Gy1'},
    {name: 'Loose', uid: 'g4S2MLVbHhSRs42gHfYOsukeb6C3'},
    {name: 'LockpickingEngineer', uid: 'cm8oFWt2fBPTYdyhqnjBMsHlfNy1'},
    {name: 'NICVT_Locks', uid: 'PHU1oYSJfKQbKarqTygoqMIG2Cr2'},
    {name: 'NCR', uid: 'RmIFi3CsSCUdQRQ8BDvHxrLhmMg1'},
    {name: 'Hyperion', uid: 'wE31g5qSO1UNm9gGrKQnZtX1jmN2'},
    {name: 'Galaxy', uid: 'X2quVZEg1KgX1vZmhR3MJaJwiBN2'},
    {name: 'Todd', uid: 'tOToqWMwuBOp5SKolSN1fyTjlK23'},
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


