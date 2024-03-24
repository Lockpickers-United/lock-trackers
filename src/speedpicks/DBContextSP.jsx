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

const DBContextSP = React.createContext({})

export function DBSPProvider({children}) {
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
            const ref = doc(db, 'versions', 'speedpicks')
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

        const ref = doc(db, 'versions', 'speedpicks')
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

    // etc
    const addComment = useCallback(async (entry, comment) => {
        console.log('DB, adding comment: ', entry)
        if (dbError) return false
        const ref = doc(db, 'speedPicks', entry.id)
        const currentComments = entry.comments ? entry.comments : []
        currentComments.push(comment)
        let statusText = ''
        try {
            await runTransaction(db, async transaction => {
                const delta = {comments: currentComments}
                transaction.update(ref, delta)
                statusText = 'Comment Added'
            })
        } catch (e) {
            console.log('error')
            console.error(e)
        }
        await updateVersion()
        console.log(statusText)
        return statusText
    }, [dbError, updateVersion])

    const updateEntry = useCallback(async entry => {
        console.log('DB, updating entry: ', entry)
        if (dbError) return false
        const modified = dayjs().format()
        const ref = doc(db, 'speedPicks', entry.id)
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
            console.log(statusText)
            return statusText
        } catch (e) {
            console.log('error')
            console.error(e)
        }
    }, [dbError, updateVersion])

    // value & provider
    const value = useMemo(() => ({
        dbLoaded,
        profile,
        updateEntry,
        getDbEntries,
        newVersionAvailable,
        updateVersion,
        addComment
    }), [
        dbLoaded,
        profile,
        updateEntry,
        getDbEntries,
        newVersionAvailable,
        updateVersion,
        addComment
    ])

    return (
        <DBContextSP.Provider value={value}>
            {children}
        </DBContextSP.Provider>
    )
}

export default DBContextSP
