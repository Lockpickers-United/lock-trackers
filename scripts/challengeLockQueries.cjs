const admin = require('firebase-admin')
const serviceAccount = require('../keys/lock-trackers-firebase-adminsdk.json')
const {getFirestore} = require('firebase-admin/firestore')
const app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://lock-trackers.firebaseio.com'
})

const {setDeep} = require('./setDeep.js')

const prod = false
const db = prod ? getFirestore(app) : getFirestore(app, 'locktrackersdev')

const myCollectionRef = db.collection('challenge-locks')

const challengeLocks = []

async function getCollectionData() {
    try {
        const snapshot = await myCollectionRef.get()
        if (snapshot.empty) {
            console.log('No documents found in the collection.')
            return []
        }

        const documents = []
        snapshot.forEach(doc => {
            documents.push(doc.data())
        })
        return documents
    } catch (error) {
        console.error('Error getting collection documents:', error)
        return []
    }
}

getCollectionData().then(data => {
    challengeLocks.push(...data)

    /*
    const lockMakerCounts = challengeLocks?.reduce((acc, entry) => {
        acc[entry.maker] = (acc[entry.maker] || 0) + 1
        return acc
    }, {})
    const sortedLockMakerCounts = Object.entries(lockMakerCounts).sort((a, b) => b[1] - a[1])
    console.log('sortedLockMakerCounts' , sortedLockMakerCounts)
    */

    // media directories
    // fullSizeUrl : https://data.lpulocks.com/challengelocks/lockimages/brain-drain-lockpickingengineer-cl_b33ce945/brain-drain_20241230_175536_lockpickingengineer-main-1024.jpg

    const allMediaTitles = challengeLocks?.reduce((acc, entry) => {
        acc = acc || []
        if (!entry.media || !Array.isArray(entry.media)) return acc
        entry.media.forEach((media, index) => {
            if (media.title) {
                setDeep(acc, [entry.id, index], media.title)
            }
        })
        return acc
    }, {})
    console.log('allMediaTitles' , allMediaTitles)

})

