import {initializeApp} from 'firebase/app'
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getAnalytics} from 'firebase/analytics'

// LockTrackers Firebase configuration
const firebaseConfig = {
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
export const analytics = getAnalytics(app)