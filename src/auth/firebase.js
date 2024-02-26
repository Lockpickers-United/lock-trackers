import {initializeApp} from 'firebase/app'
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

// LPUbelts Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyDGGErdOp0lpzUumA60xJO7BlQr027y9Vo',
    authDomain: 'lpu-belt-explorer.firebaseapp.com',
    projectId: 'lpu-belt-explorer',
    storageBucket: 'lpu-belt-explorer.appspot.com',
    messagingSenderId: '1004257270920',
    appId: '1:1004257270920:web:ba605e14f98e926a1e533d'
}

// LockTrackers Firebase configuration
const firebaseConfigX = {
    apiKey: 'AIzaSyDB4CCawkxnrD6_QQd7jrnUtfF9WB8S-pQ',
    authDomain: 'lock-trackers.firebaseapp.com',
    projectId: 'lock-trackers',
    storageBucket: 'lock-trackers.appspot.com',
    messagingSenderId: '688170589998',
    appId: '1:688170589998:web:7b07b5d0b42bd0a12ce4bf',
    measurementId: 'G-298D487WKT'
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
