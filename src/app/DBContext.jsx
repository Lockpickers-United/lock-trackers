import Button from '@mui/material/Button'
import React, {useCallback, useContext, useEffect, useMemo, useState} from 'react'
import {db} from '../auth/firebase'
import {doc, arrayUnion, arrayRemove, onSnapshot, runTransaction, getDoc, getDocs, collection} from 'firebase/firestore'
import AuthContext from './AuthContext'
import {enqueueSnackbar} from 'notistack'
import dayjs from 'dayjs'

const DBContext = React.createContext({})

export function DBProvider({children}) {
    const {authLoaded, isLoggedIn, user} = useContext(AuthContext)
    const [lockCollection] = useState({})
    const [dbLoaded, setDbLoaded] = useState(false)
    const [dbError, setDbError] = useState(null)

    const addToLockCollection = useCallback(async (key, entryId) => {
        if (dbError) return false
        const ref = doc(db, 'lockcollections', user.uid)
        await runTransaction(db, async transaction => {
            const sfDoc = await transaction.get(ref)
            if (!sfDoc.exists()) {
                transaction.set(ref, {
                    [key]: [entryId]
                })
            } else {
                transaction.update(ref, {
                    [key]: arrayUnion(entryId)
                })
            }
        })
    }, [dbError, user])

    const removeFromLockCollection = useCallback(async (key, entryId) => {
        if (dbError) return false
        const ref = doc(db, 'lockcollections', user.uid)
        await runTransaction(db, async transaction => {
            const sfDoc = await transaction.get(ref)
            if (!sfDoc.exists()) {
                transaction.set(ref, {
                    [key]: [entryId]
                })
            } else {
                transaction.update(ref, {
                    [key]: arrayRemove(entryId)
                })
            }
        })
    }, [dbError, user])

    const updateProfile = useCallback(async (username, discordUsername, redditUsername, LPUBeltsProfile, belt, country, created) => {
        if (dbError) return false
        const modified = dayjs().format()
        const ref = doc(db, 'profiles', user.uid)
        await runTransaction(db, async transaction => {
            const sfDoc = await transaction.get(ref)
            const delta = {username, discordUsername, redditUsername, LPUBeltsProfile, belt, country, created, modified}
            if (!sfDoc.exists()) {
                transaction.set(ref, delta)
            } else {
                transaction.update(ref, delta)
            }
        })
    }, [dbError, user])

    const [allProfiles, setAllProfiles] = useState({})

    const getAllProfiles = useCallback(async () => {
        const profiles = new Map()
        const querySnapshot = await getDocs(collection(db, 'profiles'))
        querySnapshot.forEach((doc) => {
            profiles[doc.id] = doc.data()
        })
        setAllProfiles(profiles)
        return profiles
    }, [])

    if (!allProfiles) { getAllProfiles()}
    //console.log(allProfiles)

    const getProfile = useCallback(async userId => {
        const ref = doc(db, 'profiles', userId)
        const value = await getDoc(ref)
        return value.data()
    }, [])

    const getProfileName = useCallback(async pickerId => {
        const profile = await getProfile(pickerId)
        return profile.username
    }, [getProfile])

    const [profile, setProfile] = useState({})

    // Lock Collection Subscription
    useEffect(() => {
        if (isLoggedIn) {
            const ref = doc(db, 'profiles', user.uid)
            return onSnapshot(ref, async doc => {
                const data = doc.data()
                if (data) {
                    setProfile(data)
                } else {
                    setProfile({})
                }
                setDbLoaded(true)
            }, error => {
                console.error('Error listening to DB:', error)
                setDbError(true)
                enqueueSnackbar('There was a problem reading your profile. It will be unavailable until you refresh the page. ', {
                    autoHideDuration: null,
                    action: <Button color='secondary' onClick={() => window.location.reload()}>Refresh</Button>
                })
            })
        } else if (authLoaded) {
            setProfile({})
            setDbLoaded(true)
        }
    }, [authLoaded, isLoggedIn, user])

    const value = useMemo(() => ({
        dbLoaded,
        lockCollection,
        addToLockCollection,
        removeFromLockCollection,
        getProfile,
        getProfileName,
        updateProfile,
        profile,
        allProfiles
    }), [dbLoaded,
        lockCollection,
        addToLockCollection,
        removeFromLockCollection,
        getProfile,
        getProfileName,
        updateProfile,
        profile,
        allProfiles
    ])

    return (
        <DBContext.Provider value={value}>
            {children}
        </DBContext.Provider>
    )
}

export default DBContext
