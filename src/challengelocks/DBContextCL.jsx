import Button from '@mui/material/Button'
import React, {useCallback, useContext, useEffect, useMemo, useState} from 'react'
import {db} from '../auth/firebase'
import {
    doc,
    onSnapshot,
    runTransaction,
    getDocs,
    collection
} from 'firebase/firestore'
import AuthContext from '../app/AuthContext'
import {enqueueSnackbar} from 'notistack'
import dayjs from 'dayjs'
import DBContext from '../app/DBContext.jsx'

const DBContextCL = React.createContext({})

export function DBProviderCL({children}) {
    const {authLoaded, isLoggedIn, user} = useContext(AuthContext)
    const {profile} = useContext(DBContext)
    const [dbLoaded, setDbLoaded] = useState(false)
    const [dbError, setDbError] = useState(null)

    const [knownVersions] = useState([])
    const [currentVersion, setCurrentVersion] = useState('')
    const newVersionAvailable = !knownVersions.includes(currentVersion)

    // VERSION SUBSCRIPTION
    useEffect(() => {
        if (isLoggedIn) {
            const ref = doc(db, 'versions', 'challenge-locks')
            return onSnapshot(ref, async doc => {
                const data = doc.data()
                if (data) {
                    setCurrentVersion(data.version)
                    if (knownVersions.length === 0) knownVersions.push(data.version)
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
            setDbLoaded(true)
        }
    }, [authLoaded, isLoggedIn, knownVersions, user])

    const updateVersion = useCallback(async () => {
        if (dbError) return false

        const safeName = profile?.username
            ? profile?.username.replace(/\s/g, '_')
            : user?.uid
        const ref = doc(db, 'versions', 'challenge-locks')
        const newVersion = safeName + '_' + new Date().toISOString().substring(0, 21)
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
    }, [dbError, knownVersions, profile?.username, user?.uid])

    // CHALLENGE LOCKS //
    const getDbEntries = useCallback(async () => {
        if (dbError) return false
        const entries = []
        const querySnapshot = await getDocs(collection(db, 'challenge-locks'))
        querySnapshot.forEach((doc) => {
            entries.push(doc.data())
        })
        return entries
    }, [dbError])

    const [allEntries, setAllEntries] = useState([])
    useEffect(() => {
        async function fetchData() {
            setAllEntries(await getDbEntries())
        }
        fetchData().then()
    }, [getDbEntries])


/*
    const allEntries = useMemo(async () => {
        if (!dbLoaded) return []
        return await getDbEntries()
            .then(entries => {
                if (entries && entries.length > 0) {
                    return entries
                } else {
                    console.warn('No entries found in the database.')
                    return []
                }
            })
            .catch(error => {
                console.error('Error fetching entries:', error)
                return []
            })
    },[dbLoaded, getDbEntries])
*/

    const updateEntry = useCallback(async entry => {
        console.log('DB, updating entry: ', entry)
        if (dbError) return false
        const modified = dayjs().format()
        const ref = doc(db, 'challenge-locks', entry.id)
        let statusText = ''

        if (!entry.comments) {entry.comments = ''}

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
                    comments: entry.comments,
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
            //console.log(statusText)
            return statusText
        } catch (e) {
            console.log('error')
            console.error(e)
        }
    }, [dbError, updateVersion])

    // TODO - not working, remove, use postData instead
    const createCheckIn = useCallback(async (checkIn) => {
        let statusText = ''
        console.log('DB, updating entry: ', checkIn)
        if (dbError) return false
        const modified = dayjs().format()
        const ref = doc(db, '/challenge-lock-check-ins', checkIn.id)

        try {
            await runTransaction(db, async transaction => {
                const sfDoc = await transaction.get(ref)
                const delta = { ...checkIn, modified: modified}
                if (!sfDoc.exists()) {
                    transaction.set(ref, delta)
                    statusText = 'Check-in Created'
                } else {
                    statusText = 'Check-in already exists'
                }
            })
            await updateVersion()
            return statusText
        } catch (e) {
            console.error(e)
            statusText = 'Check-in failed to update.'
            return statusText
        }
    }, [dbError, updateVersion])


    // value & provider
    const value = useMemo(() => ({
        dbLoaded,
        profile,
        updateEntry,
        getDbEntries,
        allEntries,
        createCheckIn,
        newVersionAvailable,
        updateVersion,
    }), [
        dbLoaded,
        profile,
        updateEntry,
        getDbEntries,
        allEntries,
        createCheckIn,
        newVersionAvailable,
        updateVersion,
    ])

    return (
        <DBContextCL.Provider value={value}>
            {children}
        </DBContextCL.Provider>
    )
}

export default DBContextCL
