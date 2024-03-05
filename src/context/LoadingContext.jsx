import React, {useCallback, useContext, useEffect, useMemo, useState} from 'react'
import DBContext from '../app/DBContext.jsx'
import skeletonData from '../speedpicks/skeletonData.json'
import {locksData} from '../data/dataUrls'
import useData from '../util/useData.jsx'

const LoadingContext = React.createContext({})
const url = locksData

export function LoadingProvider({children}) {

    const {getDbEntries, getDbProfiles} = useContext(DBContext)
    const {data, loading, error} = useData({url})
    const jsonLoaded = (!loading && !error && data)

    const [dbEntries, setDbEntries] = useState()
    const [dbProfiles, setDbProfiles] = useState()

    const refreshData = useCallback(async () => {
        const newDbEntries = await getDbEntries()
        setDbEntries(newDbEntries)

        const newDbProfiles = await getDbProfiles()
        setDbProfiles(newDbProfiles)
    }, [getDbEntries, getDbProfiles])

    // Initial data load
    useEffect(() => {
        refreshData()
    }, []) // eslint-disable-line

    const allDataLoaded = dbEntries && dbProfiles && jsonLoaded

    const skeletonEntries = skeletonData.entry
    const allEntries = allDataLoaded ? dbEntries : skeletonEntries
    const skeletonProfiles = skeletonData.profile
    const allProfiles = allDataLoaded ? dbProfiles : skeletonProfiles
    const skeletonLocks = skeletonData.lock
    const allLocks = jsonLoaded ? data : skeletonLocks

    //console.log('lc: ', dbEntries)
    //console.log('lc: ', allEntries)
    //console.log('lc: ', allProfiles)

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
