import React, {useCallback, useMemo} from 'react'
import useData from '../util/useData'
import {allLocks, lockBazaarData} from '../data/dataUrls'

const LoadingContext = React.createContext({})
const urls = {allLocks, lockBazaarData}

export function LoadingProvider({children}) {
    const {data, loading, error} = useData({urls})
    const {allLocks, lockBazaarData} = data || {}
    const jsonLoaded = (!loading && !error && !!data)

    const sellerProfiles = useMemo(() => lockBazaarData?.sellerProfiles || [], [lockBazaarData?.sellerProfiles])
    const sellerIdMap = useMemo(() => lockBazaarData?.sellerIdMap || [], [lockBazaarData?.sellerIdMap])
    const badListings = useMemo(() => lockBazaarData?.badListings || [], [lockBazaarData?.badListings])

    const getLockFromId = useCallback(lockId => {
        return allLocks?.find(({id}) => id === lockId) || null
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
            entryClone.id = lockId
        }
        return entryClone
    }, [allLocks])

    const getSellerFromId = useCallback(thisId => {
        return sellerProfiles?.find(({userId}) => userId === thisId)
    }, [sellerProfiles])

    const allListings = useMemo(() => lockBazaarData?.allListings || [], [lockBazaarData?.allListings])
    const validListings = allListings.filter(listing => listing.isValid)

    const validLockIds = validListings
        .filter(listing => listing.isValid)
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
        getSellerFromId,
        sellerIdMap,
        badListings
    }), [
        allDataLoaded,
        sellerProfiles,
        validListings,
        allEntries,
        allLocks,
        uniqueLockIds,
        getLockFromId,
        getLockLineFromId,
        getSellerFromId,
        sellerIdMap,
        badListings
    ])

    return (
        <LoadingContext.Provider value={value}>
            {children}
        </LoadingContext.Provider>
    )
}

export default LoadingContext

