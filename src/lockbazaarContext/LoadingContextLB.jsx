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

    const getLockFromId = useCallback(lockId => {
        return locksData?.find(({id}) => id === lockId)
    }, [locksData])

    const lockRegex = useMemo(() => /id=(\w{8})/, [])

    function isValidLPUbeltsUrl(urlString) {
        let url
        try {
            url = new URL(urlString)
        } catch (_) {
            return false
        }
        const thisId = lockRegex.test(urlString)
            ? urlString.match(lockRegex)[1]
            : null
        const thisLock = getLockFromId(thisId)
        return (url.protocol === 'http:' || url.protocol === 'https:') && !!thisId && !!thisLock
    }

    const allListings = lockLists
        .map(function (listing) {
                const isValidListing = (listing.available && isValidLPUbeltsUrl(listing.url))

                const thisId = lockRegex.test(listing.url)
                    ? listing.url.match(lockRegex)[1]
                    : null
                const thisLock = getLockFromId(thisId)

                const lockName = listing.samelineIndex
                    ? thisLock?.makeModels[listing.samelineIndex-1].make + ' ' + thisLock?.makeModels[listing.samelineIndex-1].model
                    : entryName(thisLock, 'short')

                return {
                    id: thisId,
                    name: listing.name,
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
        .map(function (listing) {
            const samelineInfo = listing.samelineIndex ? '|' + listing.samelineIndex : ''
            return listing.id + samelineInfo
        })


    let uniqueLockIds = [...new Set(validLockIds)]

    const allEntries = uniqueLockIds.map(function (id) {
        const [lockId, samelineIndex] = id.split('|')
        const samelineName = samelineIndex
            ? getLockFromId(lockId).makeModels[samelineIndex-1].make + ' ' + getLockFromId(lockId).makeModels[samelineIndex-1].model
            : ''

        let foo = getLockFromId(lockId)
        foo = {...foo, samelineName: samelineName}
        return foo
    })

    const skeletonLocks = []
    const allLocks = jsonLoaded ? locksData : skeletonLocks

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

