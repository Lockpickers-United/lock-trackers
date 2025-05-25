import {initializeApp} from 'firebase/app'
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getAnalytics} from 'firebase/analytics'
import {firebaseConfig} from '../../keys/firebaseConfig.js'

// LockTrackers Firebase configuration

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const analytics = getAnalytics(app)