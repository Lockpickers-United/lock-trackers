import React, {useCallback, useContext, useMemo, useState} from 'react'
import DBContext from '../app/DBContext.jsx'
import skeletonData from '../speedpicks/skeletonData.json'
import {locksData} from '../data/dataUrls'
import useData from '../util/useData.jsx'
import dataSnapshot from '../data/dataSnapshot.json'

const LoadingContext = React.createContext({})
const url = locksData

export function LoadingProvider({children}) {

    const {getDbEntries, getDbProfiles, profile} = useContext(DBContext)
    const {data, loading, error} = useData({url})
    const jsonLoaded = (!loading && !error && data)

    const [dbEntries, setDbEntries] = useState([])
    const [dbProfiles, setDbProfiles] = useState([])

    const jsonEntriesMap = dataSnapshot.__collections__.speedPicks

    //const jsonEntriesArray = Object.keys(jsonEntriesMap).map(key => jsonEntriesMap[key])
    const jsonEntries = Object.keys(jsonEntriesMap).map(key => ({key, ...jsonEntriesMap[key]}))

    const jsonProfilesMap = dataSnapshot.__collections__.profiles
    const jsonProfiles =
        Object.keys(jsonProfilesMap)
            .map(key => {
                    const profile = jsonProfilesMap[key]
                    profile.userId = key
                    return profile
                }
            )

    const refreshData = useCallback(async () => {
        const newDbEntries = await getDbEntries()
        setDbEntries(newDbEntries)

        const newDbProfiles = await getDbProfiles()
        setDbProfiles(newDbProfiles)
    }, [getDbEntries, getDbProfiles])

    if (profile.username && dbEntries.length === 0) {
        refreshData() // eslint-disable-line
        console.log('refreshData')
    }

    const allDataLoaded = dbEntries && dbProfiles && jsonLoaded

    const skeletonEntries = skeletonData.entry
    const allEntries = !allDataLoaded ? skeletonEntries
        : profile.username ? dbEntries
            : jsonEntries

    const skeletonProfiles = skeletonData.profile
    const allProfiles = !allDataLoaded ? skeletonProfiles
        : profile.username ? dbProfiles
            : jsonProfiles

    const skeletonLocks = skeletonData.lock
    const allLocks = jsonLoaded ? data : skeletonLocks

    console.log('lc, dbEntries: ', dbEntries.length)
    console.log('lc, allEntries: ', allEntries.length)

    console.log('lc, dbProfiles: ', dbProfiles.length)
    console.log('lc, jsonProfiles: ', jsonProfiles)
    console.log('lc, allProfiles: ', allProfiles)

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
