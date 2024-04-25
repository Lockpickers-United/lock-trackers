import React, {useCallback, useContext, useEffect, useMemo, useState} from 'react'
import useData from '../util/useData'
import {locksData, lockListings} from '../data/dataUrls'
import entryName from '../util/entryName'
import DBContext from '../app/DBContext.jsx'

const LoadingContext = React.createContext({})
const urls = {locksData, lockListings}

export function LoadingProvider({children}) {
    const verbose = false
    const {data, loading, error} = useData({urls})
    const {locksData, lockListings} = data || {}

    const localLocksData = useMemo(() => [], [])
    for (let i = 0; i < locksData?.length; i++) {
        localLocksData[i] = locksData[i]
    }

    const jsonLoaded = (!loading && !error && !!data)

    const {getSellerProfiles} = useContext(DBContext)
    const [sellerProfiles, setSellerProfiles] = useState(null)
    const [sellerIdMap, setSellerIdMap] = useState({})

    const refreshData = useCallback(async () => {
        const dbProfiles = await getSellerProfiles()
        verbose && console.log('sellers', dbProfiles)

        setSellerProfiles(dbProfiles)

        const sellerIdMap = new Map()
        dbProfiles.map((profile) => {
                sellerIdMap[profile.username] = profile.userId
            }
        )
        setSellerIdMap(sellerIdMap)
        verbose && console.log('sellerIdMap', sellerIdMap)
    }, [getSellerProfiles, verbose])
    // eslint-disable-line

    // Initial data load
    useEffect(() => {
        refreshData()
    }, [refreshData])

    const skeletonLocks = []
    const allLocks = jsonLoaded ? localLocksData : skeletonLocks

    const isLPUbeltsLock = useCallback(lockId => {
        return locksData?.find(({id}) => id === lockId) || false
    }, [locksData])

    const getLockFromId = useCallback(lockId => {
        return localLocksData?.find(({id}) => id === lockId) || null
    }, [localLocksData])

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

    function genHexString(len) {
        const hex = '0123456789ABCDEF'
        let output = ''
        for (let i = 0; i < len; ++i) {
            output += hex.charAt(Math.floor(Math.random() * hex.length))
        }
        return output.toLowerCase()
    }

    const lockRegex = useMemo(() => /id=(\w{8})/, [])

    function isValidUrl(value) {
        return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value)
    }

    let badListings = []
    const allListings = jsonLoaded ?
        lockListings.map((listing) => {

                let availableInt = parseInt(listing?.available)
                if (isNaN(availableInt) || availableInt === 0) {
                    return false
                }

                let samelineInt = !isNaN(parseInt(listing.samelineIndex))
                    ? parseInt(listing.samelineIndex)
                    : null

                let thisId = lockRegex.test(listing.url)
                    ? listing.url.match(lockRegex)[1]
                    : null

                const makeModelCount = isLPUbeltsLock(thisId)
                    ? getLockFromId(thisId).makeModels.length
                    : 0

                const isLPUListing = (availableInt > 0 && isLPUbeltsLock(thisId))
                    //&& !(makeModelCount > 1 && !samelineInt)
                    && !(makeModelCount > 1 && samelineInt > makeModelCount)

            let badListing
                if (
                    isLPUbeltsLock(thisId) && ((makeModelCount > 1 && !samelineInt)
                        || (makeModelCount > 1 && samelineInt > makeModelCount)
                    )) {
                    // console.log('bad listing', makeModelCount, samelineInt, listing)
                    badListings.push(listing)
                    badListing = 'X'
                }

                if (isNaN(samelineInt) || !isLPUListing) {
                    samelineInt = null
                }

                let thisLock

                if (isLPUListing) {
                    thisLock = getLockFromId(thisId)
                    if (!thisLock) {
                        return false
                    }
                }

                if (!isLPUListing) {
                    thisLock = {}
                    thisId = 'lb_' + genHexString(8)
                    thisLock.id = thisId
                    thisLock.belt = 'Unranked'

                    const thisMake = /\w+/.test(listing.make) ? listing.make : ''
                    const thisModel = /\w+/.test(listing.model) ? listing.model : ''
                    thisLock.makeModels = [{make: thisMake, model: thisModel}]

                    const lockingMechanisms = listing.mechanism
                        ? listing.mechanism.split(',')
                        : null
                    thisLock.lockingMechanisms = lockingMechanisms && !(typeof lockingMechanisms === 'string')
                        ? lockingMechanisms.map((mechanism) => {
                            return mechanism.charAt(0).toUpperCase() + mechanism.slice(1)
                        })
                        : lockingMechanisms
                    thisLock.views = 0
                    if (!localLocksData?.find(({id}) => id === thisId)) {
                        localLocksData.push(thisLock)
                    }
                }

                if (!thisLock || !thisLock.makeModels) {
                    console.error('no lock or makeModels', thisLock)
                    return false
                }

                if (!thisLock.makeModels[0].make && !thisLock.makeModels[0].model) {
                    console.error('neither make nor model', thisLock)
                    return false
                }

                const lpubeltsName = isLPUListing
                    ? entryName(thisLock, 'any', 1)
                    : null
                const sheetMake = listing.make
                const sheetModel = listing.model

                const samelineInfo = samelineInt ? '-' + samelineInt : ''
                const newId = thisId + samelineInfo

                const photo = (listing.photo && isValidUrl(listing.photo)) ? listing.photo : null

                const isValid = thisLock && thisLock.makeModels

                return {
                    id: newId,
                    lpubeltsName: lpubeltsName,
                    sheetMake: sheetMake,
                    sheetModel: sheetModel,
                    badListing: badListing,
                    //TODO get from sellerId
                    sellerName: listing.name,
                    shipsTo: listing.shipsTo,
                    country: listing.country,
                    sellerId: listing.sellerId,
                    avail: listing.available,
                    format: listing.format,
                    samelineIndex: listing.samelineIndex,
                    isValid: isValid,
                    keys: listing.keys,
                    condition: listing.condition,
                    lockingMechanism: [listing.mechanism],
                    photo: photo,
                    price: listing.price?.replace('.00', ''),
                    rowNum: listing.rowNum,
                    notes: listing.notes,
                    lockBelt: thisLock?.belt.replace(/\s\d/g, '')
                }
            }
        )
        : []

    verbose && console.log('allListings', allListings)

    const validListings = allListings.filter(listing => listing.isValid)
    //console.log('validListings', validListings)

    //TODO get row number for seller info
    const invalidListings = allListings // eslint-disable-line
        .filter(listing => !listing.isValid)

    const validLockIds = validListings
        .filter(listing => listing.isValid)
        .map((listing) => {
            return listing.id
        })

    //console.log('validLockIds', validLockIds)
    let uniqueLockIds = useMemo(() => [...new Set(validLockIds)], [validLockIds])

    const allEntries = uniqueLockIds.map((id) => {
        const [lockId, samelineIndex] = id.split('-')
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

        const countriesFull = lockListings
            .map((listing) => {
                let terse = listing?.country?.replace('United States of America', 'United States')
                terse = terse?.replace('Netherlands (Kingdom of the)', 'Netherlands')
                return listing.country ? terse : null
            }).flat()
        const countryUnique = [...new Set(countriesFull)]

        if (samelineIndex) {
            entry.makeModels = [lock?.makeModels[samelineIndex - 1]]
            entry.id = id
        }

        //TODO roll up shipTos

        entry.shipsTo = shipsToUnique
        entry.country = countryUnique
        entry.seller = sellers
        entry.sellerName = sellerNames
        entry.listings = listings
        return entry
    })

    //console.log(badListings)
    const allDataLoaded = ((!!sellerProfiles && jsonLoaded))

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
        sellerIdMap
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
        sellerIdMap
    ])

    return (
        <LoadingContext.Provider value={value}>
            {children}
        </LoadingContext.Provider>
    )
}

export default LoadingContext

