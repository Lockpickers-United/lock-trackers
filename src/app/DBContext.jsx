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


    // SPEED PICK ENTRIES //

    // TODO: Speed Picks Subscription ??

    const [dbEntries, setDbEntries] = useState(null)
    const getDbEntries = useCallback(async () => {
        if (dbError) return false
        const entries = []
        const querySnapshot = await getDocs(collection(db, 'speedPicks'))
        querySnapshot.forEach((doc) => {
            //console.log(doc.id, ' => ', doc.data())
            entries.push(doc.data())
        })
        setDbEntries(entries)
        return entries
    }, [dbError])

    if (!dbEntries) {
        getDbEntries()
    } else {
        //console.log(dbEntries)
    }


    const [dbProfiles, setDbProfiles] = useState(null)
    const getDbProfiles = useCallback(async () => {
        if (dbError) return false
        const profiles = []
        const querySnapshot2 = await getDocs(collection(db, 'profiles'))
        querySnapshot2.forEach((doc) => {
            //const userId = doc.id
            profiles.push(doc.data())
        })
        setDbProfiles(profiles)
        return profiles
    }, [dbError])

    if (!dbProfiles) {
        getDbProfiles()
    } else {
        console.log('db', dbProfiles)
    }

    const dataLoaded = (!!dbEntries && !!dbProfiles)

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
            console.log(statusText)
            return statusText
        } catch (e) {
            console.log('error')
            console.error(e)
        }
    }, [dbError])

    // PROFILE //

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

    // value & provider
    const value = useMemo(() => ({
        dbLoaded,
        lockCollection,
        dbProfiles,
        profile,
        getProfile,
        getProfileName,
        updateProfile,
        updateEntry,
        dbEntries,
        dataLoaded
    }), [
        dbLoaded,
        lockCollection,
        dbProfiles,
        getProfile,
        getProfileName,
        updateProfile,
        profile,
        updateEntry,
        dbEntries,
        dataLoaded
    ])

    return (
        <DBContext.Provider value={value}>
            {children}
        </DBContext.Provider>
    )
}

export default DBContext
