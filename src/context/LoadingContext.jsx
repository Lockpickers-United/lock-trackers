import React, {useContext, useMemo} from 'react'
import DBContext from '../app/DBContext.jsx'
import skeletonData from '../speedpicks/skeletonData.json'
import {locksData} from '../data/dataUrls'
import useData from '../util/useData.jsx'

const LoadingContext = React.createContext({})
const url = locksData

export function LoadingProvider({children}) {

    const {dbEntries, dbProfiles, dataLoaded} = useContext(DBContext)
    const {data, loading, error} = useData({url})
    const jsonLoaded = (!loading && !error && data)

    const allDataLoaded = dataLoaded && jsonLoaded

    const skeletonEntries = skeletonData.entry
    const allEntries = dataLoaded ? dbEntries : skeletonEntries
    const skeletonProfiles = skeletonData.profile
    const allProfiles = dataLoaded ? dbProfiles : skeletonProfiles
    const skeletonLocks = skeletonData.lock
    const allLocks = jsonLoaded ? data : skeletonLocks

    console.log('lc: ', dbEntries)
    console.log('lc: ', allEntries)
    console.log('lc: ', allProfiles)

    const value = useMemo(() => ({
        allEntries,
        allProfiles,
        allLocks,
        allDataLoaded
    }), [
        allEntries,
        allProfiles,
        allLocks,
        allDataLoaded
    ])

    return (
        <LoadingContext.Provider value={value}>
            {children}
        </LoadingContext.Provider>
    )
}

export default LoadingContext
