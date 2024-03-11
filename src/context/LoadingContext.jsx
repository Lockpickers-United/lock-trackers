import React, {useCallback, useContext, useEffect, useMemo, useState} from 'react'
import DBContext from '../app/DBContext.jsx'
import skeletonData from '../speedpicks/skeletonData.json'
import AuthContext from '../app/AuthContext.jsx'
import useData from '../util/useData'
import {locksData, jsonBackup} from '../data/dataUrls'

const urls = {
    locksData, jsonBackup
}

const LoadingContext = React.createContext({})

export function LoadingProvider({children}) {
    const {data, loading, error} = useData({urls})
    const {locksData, jsonBackup} = data || {}
    const jsonLoaded = (!loading && !error && !!data)

    const {isLoggedIn} = useContext(AuthContext)
    const {getDbEntries, getDbProfiles, profile} = useContext(DBContext)

    const [dbEntries, setDbEntries] = useState([])
    const [dbProfiles, setDbProfiles] = useState([])

    const [jsonEntries, setJsonEntries] = useState([])
    const [jsonProfiles, setJsonProfiles] = useState([])

    console.log('loggedIn: ', isLoggedIn)
    const dbUser = isLoggedIn

    const jsonEntrySource = jsonLoaded
        ? jsonBackup?.__collections__.speedPicks
        : skeletonData.entry

    const jsonProfileSource = jsonLoaded
        ? jsonBackup?.__collections__.profiles
        : skeletonData.profile

    const refreshData = useCallback(async () => {
        if (dbUser) {
            console.log('REFRESHDATA: using dbEntries')
            const newDbEntries = await getDbEntries()
            setDbEntries(newDbEntries)
            const newDbProfiles = await getDbProfiles()
            setDbProfiles(newDbProfiles)
        } else {
            console.log('REFRESHDATA: using jsonEntries')
            const jsonEntriesMap = jsonEntrySource
            setJsonEntries(Object.keys(jsonEntriesMap).map(key => ({key, ...jsonEntriesMap[key]})))

            const jsonProfilesMap = jsonProfileSource
            setJsonProfiles(Object.keys(jsonProfilesMap).map(key => {
                const profile = jsonProfilesMap[key]
                profile.userId = key
                return profile
            }))
        }
    }, [dbUser, getDbEntries, getDbProfiles, profile, jsonLoaded]) // eslint-disable-line

    const allDataLoaded = !!dbEntries && !!dbProfiles && jsonLoaded

    // Initial data load
    useEffect(() => {
         refreshData()
    }, [refreshData])

    const allEntries = !allDataLoaded ? skeletonData.entry
        : dbUser ? dbEntries
            : jsonEntries

    const allProfiles = !allDataLoaded ? skeletonData.profile
        : dbUser ? dbProfiles
            : jsonProfiles

    const skeletonLocks = skeletonData.lock
    const allLocks = jsonLoaded ? locksData : skeletonLocks

    console.log('jsonLoaded: ', jsonLoaded)
    console.log('allDataLoaded: ', allDataLoaded)

    //console.log('lc, dbEntries: ', dbEntries.length)
    //console.log('lc, jsonEntries: ', jsonEntries.length)
    console.log('lc, allEntries: ', allEntries.length)
    //console.log('lc, dbProfiles: ', dbProfiles.length)
    //console.log('lc, jsonProfiles: ', jsonProfiles.length)
    //console.log('lc, allProfiles: ', allProfiles.length)

    const value = useMemo(() => ({
        allEntries,
        allProfiles,
        allLocks,
        allDataLoaded,
        refreshData
    }), [
        allEntries,
        allProfiles,
        allLocks,
        allDataLoaded,
        refreshData
    ])

    return (
        <LoadingContext.Provider value={value}>
            {children}
        </LoadingContext.Provider>
    )
}

export default LoadingContext
