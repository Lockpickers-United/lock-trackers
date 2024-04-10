import Button from '@mui/material/Button'
import React, {useCallback, useContext, useEffect, useMemo, useState} from 'react'
import {db} from '../auth/firebase'
import {
    doc,
    onSnapshot,
    runTransaction,
    getDoc,
    getDocs,
    query,
    where,
    collection
} from 'firebase/firestore'
import AuthContext from './AuthContext'
import {enqueueSnackbar} from 'notistack'

const DBContext = React.createContext({})

export function DBProvider({children}) {
    const {authLoaded, isLoggedIn, user} = useContext(AuthContext)
    const [dbLoaded, setDbLoaded] = useState(false)
    const [dbError, setDbError] = useState(null)

    const [profile, setProfile] = useState({})

    const [knownVersions] = useState([])
    const [currentVersion, setCurrentVersion] = useState('')
    const newVersionAvailable = !knownVersions.includes(currentVersion)

    const getDbProfiles = useCallback(async () => {
        if (dbError) return false
        const profiles = []
        const sellerProfiles = []
        const q = query(collection(db, 'profiles'))
        const querySnapshot2 = await getDocs(q)
        querySnapshot2.forEach((doc) => {
            const profile = doc.data()
            profile.userId = doc.id
            profiles.push(profile)
            profile.isSeller && sellerProfiles.push(profile)
        })
        return {profiles,sellerProfiles}
    }, [dbError])

    const getSellerProfiles = useCallback(async () => {
        if (dbError) return false
        const sellerProfiles = []
        const q = query(collection(db, 'profiles'), where('isSeller', '==', true))
        const querySnapshot2 = await getDocs(q)
        querySnapshot2.forEach((doc) => {
            const profile = doc.data()
            profile.userId = doc.id
            sellerProfiles.push(profile)
        })
        return sellerProfiles
    }, [dbError])

    // PROFILE SUBSCRIPTION //
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

    // VERSION //
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

    // UPDATES

    function clean(string) {
        return string.replace(/(<([^>]+)>)/gi, '')
    }

    const updateVersion = useCallback(async () => {
        if (dbError) return false

        const safeName = profile?.username
            ? clean(profile?.username.replace(/\s/g, '_'))
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

    // PROFILE //
    const updateProfile = useCallback(async (localProfile) => {
        if (dbError) return false
        const ref = doc(db, 'profiles', user?.uid)
        await runTransaction(db, async transaction => {
            const sfDoc = await transaction.get(ref)
            if (!sfDoc.exists()) {
                transaction.set(ref, localProfile)
            } else {
                transaction.update(ref, localProfile)
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

    // VALUE & PROVIDER //
    const value = useMemo(() => ({
        dbLoaded,
        profile,
        getProfile,
        getProfileName,
        updateProfile,
        getDbProfiles,
        getSellerProfiles,
        newVersionAvailable
    }), [
        dbLoaded,
        getProfile,
        getProfileName,
        updateProfile,
        profile,
        getDbProfiles,
        getSellerProfiles,
        newVersionAvailable
    ])

    return (
        <DBContext.Provider value={value}>
            {children}
        </DBContext.Provider>
    )
}

export default DBContext
