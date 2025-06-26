import {initializeApp} from 'firebase/app'
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getAnalytics} from 'firebase/analytics'
import {firebaseConfig} from '../../keys/firebaseConfig.js'

export const {VITE_DEV_FIRESTORE: devFirestore} = import.meta.env

// LockTrackers Firebase configuration

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = devFirestore==='true' ? getFirestore(app, 'locktrackersdev') : getFirestore(app)
//export const db = getFirestore(app)
export const analytics = getAnalytics(app)


