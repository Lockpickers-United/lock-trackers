import React, {useContext, useMemo} from 'react'
import DBContext from '../app/DBContext.jsx'
import speedPickData from '../speedpicks/speedPicksSkeleton.json'

const LoadingContext = React.createContext({})

export function LoadingProvider({children}) {

    const {dbEntries, dbProfiles, dataLoaded} = useContext(DBContext)

    const skeletonEntries = speedPickData.data
    const allEntries = dataLoaded ? dbEntries : skeletonEntries

    const skeletonProfiles = [{'userId': 'ClbjuilBEHgbzO4UZl4y3GStlEz2', 'username': 'mgsecure'}]
    const allProfiles = dataLoaded ? dbProfiles : skeletonProfiles

    console.log('lc: ', dbEntries)
    console.log('lc: ', allEntries)
    console.log('lc: ', allProfiles)

    const value = useMemo(() => ({
        skeletonEntries,
        allEntries,
        allProfiles
    }), [
        skeletonEntries,
        allEntries,
        allProfiles
    ])

    return (
        <LoadingContext.Provider value={value}>
            {children}
        </LoadingContext.Provider>
    )
}

export default LoadingContext
