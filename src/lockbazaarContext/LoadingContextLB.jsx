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

    const localLocksData = useMemo(() => [], [])
    for (let i = 0; i < locksData?.length; i++) {
        localLocksData[i] = locksData[i]
    }

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
    const allLocks = jsonLoaded ? localLocksData : skeletonLocks

    const isLPUbeltsLock = useCallback(lockId => {
        return locksData?.find(({id}) => id === lockId) || false
    }, [locksData])

    const getLockFromId = useCallback(lockId => {
        return localLocksData?.find(({id}) => id === lockId) || null
    }, [localLocksData])

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

    const allListings = jsonLoaded ?
        lockListings.map((listing) => {

                let availableInt = parseInt(listing?.available)
                if (isNaN(availableInt) || availableInt === 0) {
                    return false
                }

                let thisId = lockRegex.test(listing.url)
                    ? listing.url.match(lockRegex)[1]
                    : null

                const isLPUlock = isLPUbeltsLock(thisId)
                const isLPUListing = (availableInt > 0 && isLPUlock)

                let thisLock

                if (isLPUListing) {
                    thisLock = getLockFromId(thisId)
                    if (isLPUListing && !thisLock) {
                        return false
                    }
                }

                let samelineInt = parseInt(listing.samelineIndex)
                if (isNaN(samelineInt)) {
                    samelineInt = null
                }

                if (listing && !isLPUListing) {
                    thisLock = {}
                    thisId = 'lb_' + genHexString(8)
                    thisLock.id = thisId
                    thisLock.belt = 'Unranked'
                    thisLock.makeModels = [{make: listing.make, model: listing.model}]
                    thisLock.lockingMechanisms = listing.mechanism
                        ? [listing.mechanism.replace('Pin tumbler','Pin-tumbler')]
                        : null
                    thisLock.views = 0
                    if (!localLocksData?.find(({id}) => id === thisLock.id)) {
                        localLocksData.push(thisLock)
                    }
                }

            if (!thisLock || !thisLock.makeModels) {
                console.log('no lock or makeModels', thisLock)
                return false
            }

            if (!thisLock.makeModels[0].make && !thisLock.makeModels[0].model) {
                console.log('neither make nor model', thisLock)
                return false
            }

            const lockName = samelineInt && samelineInt > 0
                    ? thisLock?.makeModels[samelineInt - 1]?.make + ' ' + thisLock?.makeModels[samelineInt - 1]?.model
                    : entryName(thisLock, 'short')

                const lockMake = samelineInt
                    ? thisLock?.makeModels[samelineInt - 1]?.make
                    : thisLock?.makeModels[0]?.make

                const lockModel = samelineInt
                    ? thisLock?.makeModels[samelineInt - 1]?.model
                    : thisLock?.makeModels[0]?.model

                const samelineInfo = samelineInt ? '|' + samelineInt : ''
                const newId = thisId + samelineInfo

                const photo = (listing.photo && isValidUrl(listing.photo)) ? listing.photo : null

                const isValid = thisLock && thisLock.makeModels

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
                    isValid: isValid,
                    keys: listing.keys,
                    condition: listing.condition,
                    lockingMechanism: [listing.mechanism],
                    photo: photo,
                    price: listing.price?.replace('.00', ''),
                    notes: listing.notes,
                    lockBelt: thisLock?.belt.replace(/\s\d/g, '')
                }
            }
        )
        : []

    console.log('allListings', allListings)

    const validListings = allListings.filter(listing => listing.isValid)
    console.log('validListings', validListings)

    //TODO get row number for seller info
    const invalidListings = allListings // eslint-disable-line
        .filter(listing => !listing.isValid)

    const validLockIds = validListings
        .filter(listing => listing.isValid)
        .map((listing) => {
            return listing.id
        })

    console.log('validLockIds', validLockIds)
    let uniqueLockIds = [...new Set(validLockIds)]

    console.log('uniqueLockIds', uniqueLockIds)

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
            entry.makeModels = [lock?.makeModels[samelineIndex - 1]]
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
        sellerIdMap,
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

