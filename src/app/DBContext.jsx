import Button from '@mui/material/Button'
import React, {useCallback, useContext, useEffect, useMemo, useState} from 'react'
import {db} from '../auth/firebase'
import {
    doc,
    onSnapshot,
    runTransaction,
    getDoc,
    getDocs,
    collection
} from 'firebase/firestore'
import AuthContext from './AuthContext'
import {enqueueSnackbar} from 'notistack'
import dayjs from 'dayjs'

const DBContext = React.createContext({})

export function DBProvider({children}) {
    const {authLoaded, isLoggedIn, user} = useContext(AuthContext)
    const [lockCollection] = useState({})
    const [dbLoaded, setDbLoaded] = useState(false)
    const [dbError, setDbError] = useState(null)

    const [knownVersions] = useState([])
    const [currentVersion, setCurrentVersion] = useState('')
    const newVersionAvailable = !knownVersions.includes(currentVersion)

    // SPEED PICK ENTRIES & PROFILES //

    const getDbEntries = useCallback(async () => {
        if (dbError) return false
        const entries = []
        const querySnapshot = await getDocs(collection(db, 'speedPicks'))
        querySnapshot.forEach((doc) => {
            entries.push(doc.data())
        })
        return entries
    }, [dbError])

    const getDbProfiles = useCallback(async () => {
        if (dbError) return false
        const profiles = []
        const querySnapshot2 = await getDocs(collection(db, 'profiles'))
        querySnapshot2.forEach((doc) => {
            const profile = doc.data()
            profile.userId = doc.id
            profiles.push(profile)
        })
        return profiles
    }, [dbError])

    const updateVersion = useCallback(async () => {
        if (dbError) return false
        const ref = doc(db, 'versions', 'speedpicks')
        const newVersion = user?.uid + '_' + new Date().toISOString()
        try {
            await runTransaction(db, async transaction => {
                const delta = {version: newVersion}
                transaction.update(ref, delta)
            })
            knownVersions.push(newVersion)
        } catch (e) {
            console.log('error')
            console.error(e)
        }
    }, [dbError, knownVersions, user?.uid])

    const updateEntry = useCallback(async entry => {
        console.log('entry', entry)
        if (dbError) return false
        const modified = dayjs().format()
        const ref = doc(db, 'speedPicks', entry.id)
        let statusText = ''
        try {
            await runTransaction(db, async transaction => {
                const sfDoc = await transaction.get(ref)
                const delta = {
                    id: entry.id,
                    date: entry.date,
                    pickerId: entry.pickerId,
                    lockId: entry.lockId,
                    startTime: entry.startTime,
                    openTime: entry.openTime,
                    videoUrl: entry.videoUrl,
                    status: entry.status,
                    created: entry.created,
                    reviewerId: entry.reviewerId,
                    modified: modified
                }
                if (!sfDoc.exists()) {
                    transaction.set(ref, delta)
                    statusText = 'Entry Created'
                } else {
                    transaction.update(ref, delta)
                    statusText = 'Entry Updated'
                }
            })
            await updateVersion()
            console.log(statusText)
            return statusText
        } catch (e) {
            console.log('error')
            console.error(e)
        }
    }, [dbError, updateVersion])

    // PROFILE //

    const updateProfile = useCallback(async (username, discordUsername, redditUsername, LPUBeltsProfile, belt, country, created) => {
        if (dbError) return false
        const modified = dayjs().format()
        const ref = doc(db, 'profiles', user?.uid)
        await runTransaction(db, async transaction => {
            const sfDoc = await transaction.get(ref)
            const delta = {username, discordUsername, redditUsername, LPUBeltsProfile, belt, country, created, modified}
            if (!sfDoc.exists()) {
                transaction.set(ref, delta)
            } else {
                transaction.update(ref, delta)
            }
        })
        await updateVersion()
    }, [dbError, updateVersion, user?.uid])

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

    // Profile Subscription
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
                    action: <Button color='secondary' onClick={() => location.reload()}>Refresh</Button>
                })
            })
        } else if (authLoaded) {
            setProfile({})
            setDbLoaded(true)
        }
    }, [authLoaded, isLoggedIn, user])


    // Version Subscription

    const modUser = profile?.isMod

    useEffect(() => {
        if (isLoggedIn) {
            const ref = doc(db, 'versions', 'speedpicks')
            return onSnapshot(ref, async doc => {
                const data = doc.data()
                if (data) {
                    setCurrentVersion(data.version)
                    if (knownVersions.length===0) knownVersions.push(data.version)
                } else {
                    setCurrentVersion('')
                }
            }, error => {
                console.error('Error listening to DB:', error)
                setDbError(true)
                enqueueSnackbar('There was a problem reading the current version. It will be unavailable until you refresh the page. ', {
                    autoHideDuration: null,
                    action: <Button color='secondary' onClick={() => location.reload()}>Refresh</Button>
                })
            })
        } else if (authLoaded) {
            setProfile({})
            setDbLoaded(true)
        }
    }, [authLoaded, isLoggedIn, knownVersions, modUser, user])

    // value & provider
    const value = useMemo(() => ({
        dbLoaded,
        lockCollection,
        profile,
        getProfile,
        getProfileName,
        updateProfile,
        updateEntry,
        getDbEntries,
        getDbProfiles,
        newVersionAvailable
    }), [
        dbLoaded,
        lockCollection,
        getProfile,
        getProfileName,
        updateProfile,
        profile,
        updateEntry,
        getDbEntries,
        getDbProfiles,
        newVersionAvailable
    ])

    return (
        <DBContext.Provider value={value}>
            {children}
        </DBContext.Provider>
    )
}

export default DBContext
