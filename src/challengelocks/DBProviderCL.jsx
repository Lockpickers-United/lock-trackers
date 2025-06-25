import Button from '@mui/material/Button'
import React, {useCallback, useContext, useEffect, useMemo, useState} from 'react'
import {db} from '../auth/firebase'
import {
    doc,
    onSnapshot,
    runTransaction,
    getDocs,
    getDoc,
    collection,
    query,
    where,
    deleteDoc
} from 'firebase/firestore'
import AuthContext from '../app/AuthContext'
import {enqueueSnackbar} from 'notistack'
import dayjs from 'dayjs'
import DBContext from '../app/DBContext.jsx'

export function DBProviderCL({children}) {

    const globalContext = useContext(DBContext)

    const {authLoaded, isLoggedIn, user} = useContext(AuthContext)
    const {profile} = useContext(DBContext)
    const [dbError, setDbError] = useState(null)
    const [dbLoaded, setDbLoaded] = useState(false)
    const [checkInsLoaded, setCheckInsLoaded] = useState(false)

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
                    console.log('DB, listening to version changes', data.version)
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
            console.error('error', e)
        }
    }, [dbError, knownVersions, profile?.username, user?.uid])

    // CHALLENGE LOCKS //

    const [allEntries, setAllEntries] = useState([])

    const refreshEntries = useCallback(async () => {
        if (dbError) return false
        const entries = []
        const querySnapshot = await getDocs(collection(db, 'challenge-locks'))
        querySnapshot.forEach((doc) => {
            entries.push(doc.data())
        })
        setAllEntries(entries)
        console.log('DB refreshEntries, entry count:', entries.length)
        return entries
    }, [dbError])

    useEffect(() => {
        async function fetchData() {
            await refreshEntries()
        }

        fetchData().then()
    }, [refreshEntries])

    const getChallengeLock = useCallback(async (lockId) => {
        //console.log('DB getChallengeLock, entry id:', lockId)

        try {
            const docRef = doc(db, 'challenge-locks', lockId)
            const docSnap = await getDoc(docRef)
            if (docSnap.exists()) {
                //console.log('Document data:', lockId, docSnap.data())
            } else {
                console.error('No such document', lockId)
                return null
            }
            return docSnap.data()
        } catch (error) {
            console.error('Error getting document:', error)
        }
    }, [])

    const updateEntry = useCallback(async delta => {
        if (dbError) return false
        const ref = doc(db, 'challenge-locks', delta.id)
        let statusText = ''
        let cleanDelta = Object.fromEntries(Object.entries(delta).filter(([, value]) => value !== undefined))
        cleanDelta.updatedAt = dayjs().toISOString()

        try {
            await runTransaction(db, async transaction => {
                const sfDoc = await transaction.get(ref)
                if (!sfDoc.exists()) {
                    transaction.set(ref, cleanDelta)
                    statusText = 'Entry Created'
                } else {
                    transaction.update(ref, cleanDelta)
                    statusText = 'Entry Updated'
                }
            })
            return statusText
        } catch (e) {
            console.error('error', e)
            throw new Error(e)
        }
    }, [dbError])

    const getCheckIns = useCallback(async ({lockId, userId}) => {
        if (dbError) return false
        if (!lockId && !userId) return []
        const checkIns = []
        const q = lockId
            ? query(collection(db, 'challenge-lock-check-ins'), where('lockId', '==', lockId))
            : query(collection(db, 'challenge-lock-check-ins'), where('userId', '==', userId))
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc) => {
            checkIns.push(doc.data())
        })
        setCheckInsLoaded(true)
        return checkIns.sort((a, b) => dayjs(b.pickDate).isBefore(dayjs(a.pickDate)) ? -1 : 1)
    }, [dbError])

    const getCheckIn = useCallback(async (checkInId) => {
        try {
            const docRef = doc(db, 'challenge-lock-check-ins', checkInId)
            const docSnap = await getDoc(docRef)
            if (!docSnap.exists()) {
                console.error('- No check-in with id:', checkInId)
                return null
            }
            return docSnap.data()
        } catch (error) {
            console.error('Error getting document:', error)
        }
    }, [])


    const deleteChallengeLock = useCallback(async ({entryId}) => {
        if (dbError) return false
        const collectionName = 'challenge-locks'
        try {

            const ref = doc(db, collectionName, entryId)
            try {
                await deleteDoc(ref)
                // console.log('DB, successfully deleted entry: ', entryId, 'from', collectionName)
            } catch (e) {
                console.error('DB, could not delete:', entryId, 'from collection:', collectionName, e)
            }

            const checkInsQuery = query(
                collection(db, 'challenge-lock-check-ins'),
                where('lockId', '==', entryId)
            )
            const checkInsSnap = await getDocs(checkInsQuery)
            const deletePromises = checkInsSnap.docs.map(ciDoc => deleteDoc(ciDoc.ref))
            await Promise.all(deletePromises)

            await updateVersion()
            await refreshEntries()
            enqueueSnackbar('Entry (and check-ins) deleted successfully.', {variant: 'success'})
        } catch (e) {
            enqueueSnackbar(`Error deleting Entry (and check-ins): ${e}`, {variant: 'error'})
            console.error('error', e)
        }
    }, [dbError, refreshEntries, updateVersion])


    // value & provider
    const value = useMemo(() => ({
        ...globalContext,
        dbLoaded,
        profile,
        updateEntry,
        refreshEntries,
        allEntries,
        getChallengeLock,
        deleteChallengeLock,
        getCheckIn,
        getCheckIns,
        checkInsLoaded,
        currentVersion,
        newVersionAvailable,
        updateVersion
    }), [
        globalContext,
        dbLoaded,
        profile,
        updateEntry,
        refreshEntries,
        allEntries,
        getChallengeLock,
        deleteChallengeLock,
        getCheckIn,
        getCheckIns,
        checkInsLoaded,
        currentVersion,
        newVersionAvailable,
        updateVersion
    ])

    return (
        <DBContext.Provider value={value}>
            {children}
        </DBContext.Provider>
    )
}

export default DBContext
