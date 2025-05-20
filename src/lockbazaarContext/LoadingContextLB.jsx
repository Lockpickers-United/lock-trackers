import React, {useCallback, useMemo} from 'react'
import useData from '../util/useData'
import {allLocks, lockBazaarData, samelineViewsJson} from '../data/dataUrls'

const LoadingContext = React.createContext({})
const urls = {allLocks, lockBazaarData, samelineViewsJson}

export function LoadingProvider({children}) {
    const {data, loading, error} = useData({urls})
    const {allLocks, lockBazaarData, samelineViewsJson} = data || {}
    const jsonLoaded = (!loading && !error && !!data)
    const {VITE_RAFL_STATE: raflState} = import.meta.env

    const sellerProfiles = useMemo(() => lockBazaarData?.sellerProfiles || [], [lockBazaarData?.sellerProfiles])
    const sellerIdMap = useMemo(() => lockBazaarData?.sellerIdMap || [], [lockBazaarData?.sellerIdMap])
    const validListings = useMemo(() => lockBazaarData?.validListings || [], [lockBazaarData?.validListings])
    const samelineViews = useMemo(() => samelineViewsJson?.samelineViews || [], [samelineViewsJson?.samelineViews])

    const getListingsFromId = useCallback(lockId => {
        return validListings?.filter(({id}) => id === lockId) || null
    }, [validListings])

    const getLockFromId = useCallback(lockId => {
        return allLocks?.find(({id}) => id === lockId) || null
    }, [allLocks])

    const getLockLinesInfoFromId = useCallback(lockId => {
        const [thisId, samelineInt] = lockId.split('-') //eslint-disable-line
        const entry = allLocks?.find(({id}) => id === thisId)
        const entryClone = entry ? {...entry} : null
        return entryClone && entryClone.makeModels.length > 1
            ? entryClone.makeModels.map((makeModel, index) => {
                const samelineId = lockId + '-' + (index+1)
                const samelineName = entry?.makeModels[index]?.make + ' ' + entry?.makeModels[index]?.model
                return {id: samelineId, name: samelineName}
            })
            : {id: lockId, name: entry?.makeModels[0]?.make + ' ' + entry?.makeModels[0]?.model}
    }, [allLocks])

    const getLockLineFromId = useCallback(lockId => {
        const [thisId, samelineInt] = lockId.split('-')
        const entry = allLocks?.find(({id}) => id === thisId)
        const entryClone = entry ? {...entry} : null

        if (entryClone) {
            entryClone.makeModels = samelineInt && samelineInt > 0
                ? [{
                    make: entry?.makeModels[samelineInt - 1]?.make,
                    model: entry?.makeModels[samelineInt - 1]?.model
                }]
                : entry?.makeModels
            entryClone.name = entry?.makeModels[samelineInt - 1]?.make + ' ' + entry?.makeModels[samelineInt - 1]?.model
            entryClone.id = lockId
        }
        return entryClone
    }, [allLocks])

    const getSellerFromId = useCallback(thisId => {
        return sellerProfiles?.find(({userId}) => userId === thisId)
    }, [sellerProfiles])

    const validLockIds = validListings
        .map((listing) => {
            return listing.id
        })
    let uniqueLockIds = useMemo(() => [...new Set(validLockIds)], [validLockIds])

    let allEntries = useMemo(() => lockBazaarData?.allEntries || [], [lockBazaarData?.allEntries])

    const allDataLoaded = ((jsonLoaded))

    const value = useMemo(() => ({
        allDataLoaded,
        sellerProfiles,
        validListings,
        allEntries,
        allLocks,
        uniqueLockIds,
        getLockFromId,
        getLockLineFromId,
        getLockLinesInfoFromId,
        getListingsFromId,
        getSellerFromId,
        sellerIdMap,
        samelineViews,
        raflState
    }), [
        allDataLoaded,
        sellerProfiles,
        validListings,
        allEntries,
        allLocks,
        uniqueLockIds,
        getLockFromId,
        getLockLineFromId,
        getLockLinesInfoFromId,
        getListingsFromId,
        getSellerFromId,
        sellerIdMap,
        samelineViews,
        raflState
    ])

    return (
        <LoadingContext.Provider value={value}>
            {children}
        </LoadingContext.Provider>
    )
}

export default LoadingContext

