import React, {useCallback, useContext, useEffect, useMemo, useState} from 'react'
import useData from '../util/useData'
import {locksData, lockListings} from '../data/dataUrls'
import entryName from '../util/entryName'
import AuthContext from '../app/AuthContext.jsx'
import DBContext from '../app/DBContext.jsx'

const LoadingContext = React.createContext({})
const urls = {locksData, lockListings}

export function LoadingProvider({children}) {

    const {data, loading, error} = useData({urls})
    const {locksData, lockListings} = data || {}
    const {authLoaded} = useContext(AuthContext)
    const jsonLoaded = (!loading && !error && !!data)

    const {getDbProfiles} = useContext(DBContext)
    const [sellerProfiles, setSellerProfiles] = useState(null)
    const [sellerIdMap, setSellerIdMap] = useState({})

    const refreshData = useCallback(async () => {
        const newDbProfiles = await getDbProfiles()
        setSellerProfiles(newDbProfiles.sellerProfiles)

        const sellerIdMap = new Map()
        newDbProfiles.sellerProfiles.map((profile) => {
                sellerIdMap[profile.username] = profile.userId
            }
        )
        setSellerIdMap(sellerIdMap)

    }, [getDbProfiles]) // eslint-disable-line

    // Initial data load
    useEffect(() => {
        refreshData()
    }, [refreshData])

    const skeletonLocks = []
    const allLocks = jsonLoaded ? locksData : skeletonLocks

    const getLockFromId = useCallback(lockId => {
        return locksData?.find(({id}) => id === lockId)
    }, [locksData])

    const getSellerFromId = useCallback(thisId => {
        return sellerProfiles?.find(({userId}) => userId === thisId)
    }, [sellerProfiles])

    const lockRegex = useMemo(() => /id=(\w{8})/, [])

    function isValidLPUbeltsUrl(urlString) {
        const thisId = lockRegex.test(urlString)
            ? urlString.match(lockRegex)[1]
            : null
        const thisLock = getLockFromId(thisId)
        return !!thisId && !!thisLock
    }

    function isValidUrl(value) {
        return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value)
    }

    const allListings = jsonLoaded ? lockListings
            .map((listing) => {

                    console.log(listing)

                let availableInt = parseInt(listing.available)
                console.log('availableInt', availableInt)
                if (isNaN(availableInt)) { availableInt= 0 }

                const isValidListing = (availableInt > 0 && isValidLPUbeltsUrl(listing.url))
                    if (!isValidListing) { return false }
                console.log('isValidListing', isValidListing)

                    const thisId = lockRegex.test(listing.url)
                        ? listing.url.match(lockRegex)[1]
                        : null
                console.log('thisId', thisId)
                    const thisLock = getLockFromId(thisId)
                console.log('thisLock', thisLock)
                let samelineInt = parseInt(listing.samelineIndex)
                if (isNaN(samelineInt)) { samelineInt= 1 }

                console.log('listing.samelineIndex', samelineInt)
                    const lockName = samelineInt && samelineInt > 0
                        ? thisLock?.makeModels[samelineInt - 1].make + ' ' + thisLock?.makeModels[samelineInt - 1].model
                        : entryName(thisLock, 'short')

                console.log(thisId, lockName)
                    const lockMake = samelineInt
                        ? thisLock?.makeModels[samelineInt - 1].make
                        : thisLock?.makeModels[0].make

                    const lockModel = listing.samelineInt
                        ? thisLock?.makeModels[samelineInt - 1].model
                        : thisLock?.makeModels[0].model
                    const samelineInfo = samelineInt ? '|' + samelineInt : ''
                    const newId = thisId + samelineInfo
                    const photo = (listing.photo && isValidUrl(listing.photo)) ? listing.photo : null

                    //const shipsTo = listing.shipsTo ? listing.shipsTo.join(',') : null
                    //listing.shipsTo && console.log('listing.shipsTo', shipsTo)
                    return {
                        id: newId,
                        lockName: lockName,
                        lockMake: lockMake,
                        lockModel: lockModel,
                        //TODO get from sellerId
                        sellerName: listing.name,
                        shipsTo: listing.shipsTo,
                        sellerId: listing.sellerId,
                        avail: listing.available,
                        format: listing.format,
                        samelineIndex: listing.samelineIndex,
                        isValid: isValidListing,
                        keys: listing.keys,
                        condition: listing.condition,
                        photo: photo,
                        price: listing.price?.replace('.00', ''),
                        notes: listing.notes
                    }
                }
            )
        : []

    const validListings = allListings.filter(listing => listing.isValid)

    //TODO get row number for seller info
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
        let entry = {...lock}

        const lockListings = validListings.filter(listing => listing.id === id)

        const sellers = lockListings
            .map((listing) => {
                return listing.sellerId
            })

        const sellerNames = lockListings
            .map((listing) => {
                const seller = getSellerFromId(listing.sellerId)
                return seller?.username
            })

        const listings = lockListings
            .map((listing) => {
                return listing
            })

        const shipsToFull = lockListings
            .filter(listing => !!listing.shipsTo)
            .map((listing) => {
                return listing.shipsTo ? listing.shipsTo : null
            }).flat()
        const shipsToUnique = [...new Set(shipsToFull)]

        if (samelineIndex) {
            entry.makeModels = [lock.makeModels[samelineIndex - 1]]
            entry.id = id
        }

        //TODO roll up shipTos

        entry.shipsTo = shipsToUnique
        entry.seller = sellers
        entry.sellerName = sellerNames
        entry.listings = listings
        return entry
    })

    const allDataLoaded = ((authLoaded && !!getDbProfiles && jsonLoaded))

    const value = useMemo(() => ({
        allDataLoaded,
        sellerProfiles,
        validListings,
        allEntries,
        allLocks,
        getLockFromId,
        getSellerFromId,
        sellerIdMap
    }), [
        allDataLoaded,
        sellerProfiles,
        validListings,
        allEntries,
        allLocks,
        getLockFromId,
        getSellerFromId,
        sellerIdMap
    ])

    return (
        <LoadingContext.Provider value={value}>
            {children}
        </LoadingContext.Provider>
    )
}

export default LoadingContext

