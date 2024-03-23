import React, {useCallback, useMemo} from 'react'
import lockLists from '../lockbazaar/lockLists.json'
import useData from '../util/useData'
import {locksData} from '../data/dataUrls'
import entryName from '../util/entryName'

const LoadingContext = React.createContext({})
const urls = {locksData}

export function LoadingProvider({children}) {
    const {data, loading, error} = useData({urls})
    const {locksData} = data || {}
    const jsonLoaded = (!loading && !error && !!data)

    const skeletonLocks = []
    const allLocks = jsonLoaded ? locksData : skeletonLocks

    const getLockFromId = useCallback(lockId => {
        return locksData?.find(({id}) => id === lockId)
    }, [locksData])

    const lockRegex = useMemo(() => /id=(\w{8})/, [])

    function isValidLPUbeltsUrl(urlString) {
        const thisId = lockRegex.test(urlString)
            ? urlString.match(lockRegex)[1]
            : null
        const thisLock = getLockFromId(thisId)
        return !!thisId && !!thisLock
    }

    const allListings = lockLists
        .map((listing) => {
                const isValidListing = (listing.available && isValidLPUbeltsUrl(listing.url))
                const thisId = lockRegex.test(listing.url)
                    ? listing.url.match(lockRegex)[1]
                    : null
                const thisLock = getLockFromId(thisId)
                const lockName = listing.samelineIndex
                    ? thisLock?.makeModels[listing.samelineIndex - 1].make + ' ' + thisLock?.makeModels[listing.samelineIndex - 1].model
                    : entryName(thisLock, 'short')
                const samelineInfo = listing.samelineIndex ? '|' + listing.samelineIndex : ''
                const newId = thisId + samelineInfo

                return {
                    id: newId,
                    seller: listing.name,
                    avail: listing.available,
                    samelineIndex: listing.samelineIndex,
                    isValid: isValidListing,
                    lockName: lockName
                }
            }
        )

    const validListings = allListings.filter(listing => listing.isValid)

    //TODO get row number for seller
    const invalidListings = allListings // eslint-disable-line
        .filter(listing => !listing.isValid)

    const validLockIds = validListings
        .filter(listing => listing.isValid)
        .map((listing) => {
            return listing.id
        })

    let uniqueLockIds = [...new Set(validLockIds)]

    const allEntries = uniqueLockIds.map((id) => {
        const [lockId, samelineIndex] = id.split('|')
        const lock = getLockFromId(lockId)
        const samelineName = samelineIndex
            ? lock.makeModels[samelineIndex - 1].make + ' ' + lock.makeModels[samelineIndex - 1].model
            : ''

        let entry = {...lock}

        const sellers = validListings
            .filter(listing => listing.id === id)
            .map((listing) => {
                return listing.seller
            })

        if (samelineIndex) {
            entry.makeModels = [lock.makeModels[samelineIndex - 1]]
            entry.id = id
        }

        entry.sellers = sellers

        return entry
    })



    const value = useMemo(() => ({
        validListings,
        allEntries,
        allLocks
    }), [
        validListings,
        allEntries,
        allLocks
    ])

    return (
        <LoadingContext.Provider value={value}>
            {children}
        </LoadingContext.Provider>
    )
}

export default LoadingContext

