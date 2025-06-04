import Button from '@mui/material/Button'
import React, {useCallback, useContext, useEffect, useMemo, useState} from 'react'
import {db} from '../auth/firebase'
import {
    doc,
    onSnapshot,
    runTransaction,
    getDocs,
    getDoc,
    setDoc,
    collection,
    query,
    where,
    deleteDoc
} from 'firebase/firestore'
import AuthContext from '../app/AuthContext'
import {enqueueSnackbar} from 'notistack'
import dayjs from 'dayjs'
import DBContext from '../app/DBContext.jsx'
import validator from 'validator'
import clRatingDimensions from '../data/clRatingDimensions.json'

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
            console.log('error')
            console.error(e)
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
        console.log('DB getChallengeLock, entry id:', lockId)

        try {
            const docRef = doc(db, 'challenge-locks', lockId)
            const docSnap = await getDoc(docRef)
            if (docSnap.exists()) {
                console.log('Document data:', lockId, docSnap.data())
            } else {
                console.log('No such document', lockId)
                return null
            }
            return docSnap.data()
        } catch (error) {
            console.error('Error getting document:', error)
        }
    }, [])

    const updateEntry = useCallback(async delta => {
        console.log('DB, updating entry: ', delta)
        if (dbError) return false
        const ref = doc(db, 'challenge-locks', delta.id)
        let statusText = ''
        const cleanDelta = Object.fromEntries(Object.entries(delta).filter(([, value]) => value !== undefined))

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
            console.log(statusText)
            return statusText
        } catch (e) {
            console.log('error')
            console.error(e)
        }
    }, [dbError])


    const getCheckIns = useCallback(async (lockId) => {
        if (dbError) return false
        const checkIns = []
        const q = query(collection(db, 'challenge-lock-check-ins'), where('lockId', '==', lockId))
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc) => {
            checkIns.push(doc.data())
        })
        console.log('got checkins for lockId:', lockId, checkIns.length)
        return checkIns.sort((a, b) => dayjs(b.pickDate).isBefore(dayjs(a.pickDate)) ? -1 : 1)
    }, [dbError])


    const deleteChallengeLock = useCallback(async ({entryId}) => {
        if (dbError) return false

        const collectionName = 'challenge-locks'
        console.log('DB, deleting entry: ', entryId, 'from', collectionName)

        try {

            const ref = doc(db, collectionName, entryId)
            try {
                await deleteDoc(ref)
                console.log('DB, successfully deleted entry: ', entryId, 'from', collectionName)
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
            console.log('error')
            console.error(e)
        }
    }, [dbError, refreshEntries, updateVersion])


    const createCheckIn = useCallback(async (checkIn) => {

        const urlError = checkIn.videoUrl?.length > 0 && !validator.isURL(checkIn.videoUrl)
        if (urlError) checkIn.videoUrl = 'invalid video URL'

        // TODO - validate all of checkIn data

        const ref = doc(db, 'challenge-lock-check-ins', checkIn.id)

        try {
            await setDoc(ref, checkIn)
        } catch (error) {
            console.log('error')
            console.error(error)
        }

        // set lock: latestCheckIn, ratings, approx belt, checkInCount, successCount

        const lockEntry = await getChallengeLock(checkIn.lockId)

        console.log('DB, updating lock entry with check-in: ', checkIn.lockId, lockEntry)

        let updates = {}
        if (!lockEntry.latestUpdate || dayjs(checkIn.pickDate).isAfter(lockEntry.latestUpdate?.pickDate)) {
            updates.latestUpdate = checkIn
        }

        const ratings = Object.keys(checkIn)
            .filter(key => key.startsWith('rating'))
            .reduce((acc, key) => {
                acc[key] = parseInt(checkIn[key])
                return acc
            }, {})
        Object.keys(ratings).forEach(key => {
            updates[key] = lockEntry[key]
                ? [...lockEntry[key], ratings[key]]
                : [ratings[key]]
        })

        updates.approxBelt = lockEntry.approxBelt
            ? checkIn.approxBelt
                ? [...lockEntry.approxBelt, checkIn.approxBelt]
                : lockEntry.approxBelt
            : checkIn.approxBelt
                ? [checkIn.approxBelt]
                : []

        updates.checkInCount = (lockEntry.checkInCount || 0) + 1
        updates.successCount = (lockEntry.successCount || 0) + (checkIn.successfulPick === 'Yes' ? 1 : 0)

        // SUBMIT UPDATES
        if (Object.keys(updates).length > 0) {
            updates.id = checkIn.lockId
            await updateEntry(updates)
        }

        await updateVersion()
        await refreshEntries()
        console.log('done')

    }, [getChallengeLock, refreshEntries, updateEntry, updateVersion])

    const deleteCheckIn = useCallback(async (checkIn) => {
        if (dbError) return false
        const collectionName = 'challenge-lock-check-ins'
        const parentId = checkIn.lockId
        console.log('DB, deleting entry: ', checkIn.id, 'from', collectionName)

        try {

            const ref = doc(db, collectionName, checkIn.id)
            try {
                await deleteDoc(ref)
                console.log('DB, successfully deleted check-in: ', checkIn.id, 'from', collectionName)
            } catch (e) {
                console.error('DB, could not delete:', checkIn.id, 'from collection:', collectionName, e)
            }

            // change "latest check-in" if deleting the latest check-in
            //   - just delete check-in if it is the only one
            //   - set to latest remaining check-in if it exists
            //   - update check-in count

            const checkIns = await getCheckIns(parentId)
            console.log('remaining check-ins for lockId:', parentId, 'check-ins:', checkIns.length)

            if (checkIns.length > 0) {

                // set lock: latestCheckIn, checkInCount, successCount, RATINGS, approx belt

                checkIns.sort((a, b) => dayjs(b.pickDate).valueOf() - dayjs(a.pickDate).valueOf())

                const successCount = checkIns.reduce((acc, ci) => {
                    return acc + (ci.successfulPick === 'Yes' ? 1 : 0)
                }, 0)
                console.log('got remaining check-ins for lockId:', parentId, checkIns)

                // TODO - maxVotes
                const ratings = Object.keys(clRatingDimensions).reduce((acc, dimension) => {

                    const ratingKey = `rating${dimension}`
                    if (!acc[ratingKey]) acc[ratingKey] = []

                    checkIns.forEach(ci => {
                        if (ci[ratingKey] !== undefined) {
                            acc[ratingKey].push(parseInt(ci[ratingKey]))
                        }
                    })
                    return acc
                }, {})

                console.log('ratings:', ratings)

                const latestCheckIn = checkIns[0]
                const lockRef = doc(db, 'challenge-locks', parentId)
                await runTransaction(db, async transaction => {
                    transaction.update(lockRef, {
                        latestUpdate: latestCheckIn,
                        checkInCount: checkIns.length,
                        latestCheckIn: latestCheckIn.pickDate || null,
                        successCount: successCount,
                        ...ratings
                    })
                })
            } else {
                const lockRef = doc(db, 'challenge-locks', parentId)

                const ratings = Object.keys(clRatingDimensions).reduce((acc, dimension) => {
                    const ratingKey = `rating${dimension}`
                    acc[ratingKey] = []
                    return acc
                }, {})

                await runTransaction(db, async transaction => {
                    transaction.update(lockRef, {
                        latestUpdate: null,
                        latestCheckIn: null,
                        checkInCount: 0,
                        successCount: 0,
                        ...ratings
                    })
                })
            }

            await updateVersion()
            await refreshEntries()
            enqueueSnackbar('Check-in deleted successfully.', {variant: 'success'})
        } catch (e) {
            enqueueSnackbar(`Error deleting check-in: ${e}`, {variant: 'error'})
            console.log('error')
            console.error(e)
        }
    }, [dbError, getCheckIns, refreshEntries, updateVersion])

    // value & provider
    const value = useMemo(() => ({
        dbLoaded,
        profile,
        updateEntry,
        refreshEntries,
        allEntries,
        getChallengeLock,
        deleteChallengeLock,
        createCheckIn,
        deleteCheckIn,
        getCheckIns,
        currentVersion,
        newVersionAvailable,
        updateVersion
    }), [
        dbLoaded,
        profile,
        updateEntry,
        refreshEntries,
        allEntries,
        getChallengeLock,
        deleteChallengeLock,
        createCheckIn,
        deleteCheckIn,
        getCheckIns,
        currentVersion,
        newVersionAvailable,
        updateVersion
    ])

    return (
        <DBContextCL.Provider value={value}>
            {children}
        </DBContextCL.Provider>
    )
}

export default DBContextCL
