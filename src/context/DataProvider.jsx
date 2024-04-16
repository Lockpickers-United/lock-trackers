import React, {useCallback, useMemo, useContext} from 'react'
import belts, {allBelts} from '../data/belts'
import entryName from '../util/entryName'
import formatTime from '../util/formatTime.jsx'
import dayjs from 'dayjs'
import DataContext from './DataContext.jsx'
import FilterContext from './FilterContext.jsx'
import fuzzysort from 'fuzzysort'
import removeAccents from 'remove-accents'
import AuthContext from '../app/AuthContext.jsx'
import LoadingContext from './LoadingContext.jsx'
import DBContext from '../app/DBContext.jsx'

export function DataProvider({children}) {
    const verbose = false

    const {user} = useContext(AuthContext)
    const {filters: allFilters} = useContext(FilterContext)
    const {search, id, tab, name, sort, image, profileUpdated, ...filters} = allFilters
    const {allEntries, allProfiles, allLocks} = useContext(LoadingContext)
    const {adminFlags} = useContext(DBContext)

    verbose && console.log('adminFlags: ', adminFlags)
    //console.log('dp: ', allProfiles)
    //console.log('dp: ', allLocks)

    const lockBelts = useMemo(() => belts, [])
    const lockData = useMemo(() => allLocks, [allLocks])
    const bestTimes = useMemo(() => new Map(), [])
    const isMod = !!adminFlags.isSPMod
    //const isMod = !!(user && profile && profile?.isMod)

    const validEntries = useMemo(() => {
        return allEntries && lockData
            ? allEntries.map(entry => {
                const lockId = entry?.lockId
                const thisLock = lockData?.find(({id}) => id === lockId)

                if (!thisLock) {
                    entry.lock = 'Unknown Lock'
                    entry.version = 'Lock ID not valid'
                    entry.belt = 'Unknown'
                    entry.beltIndex = 9
                    entry.status = 'Pending'
                } else {
                    entry.lock = entryName(thisLock, 'short')
                    entry.version = thisLock?.version
                    entry.belt = thisLock?.belt
                    entry.beltIndex = allBelts.indexOf(thisLock?.belt)
                }

                const pickerId = entry.pickerId
                entry.pickerName = allProfiles.find(({userId}) => userId === pickerId)
                    ? allProfiles.find(({userId}) => userId === pickerId).username
                    : ''

                const reviewerId = entry.reviewerId
                entry.reviewerName = reviewerId && allProfiles.find(({userId}) => userId === reviewerId)
                    ? allProfiles.find(({userId}) => userId === reviewerId).username
                    : 'unknown'

                const totalTime = (dayjs(entry.openTime) - dayjs(entry.startTime)) / 1000
                entry.totalTime = totalTime
                entry.totalTimeString = formatTime(totalTime)

                if (bestTimes.get(lockId) && entry.status === 'approved') {
                    const bestTime = totalTime > bestTimes.get(lockId) ? bestTimes.get(lockId) : totalTime
                    bestTimes.set(lockId, bestTime)
                } else if (entry.status === 'approved') {
                    bestTimes.set(lockId, totalTime)
                }

                return entry
            })
            : []
    }, [allEntries, allProfiles, lockData, bestTimes])

    const bestTimeMap = useMemo(() => {
        return allEntries && lockData
            ? allEntries.map(entry => {
                const lockId = entry?.lockId
                if (bestTimes.get(lockId) && entry.status === 'approved') {
                    const bestTime = entry.totalTime > bestTimes.get(lockId) ? bestTimes.get(lockId) : entry.totalTime
                    bestTimes.set(lockId, bestTime)
                } else if (entry.status === 'approved') {
                    bestTimes.set(lockId, entry.totalTime)
                }
            })
            : []

    }, [allEntries, lockData, bestTimes])


                const visibleEntries = useMemo(() => {
        // Filters as an array
        const filterArray = Object.keys(filters)
            .map(key => {
                const value = filters[key]
                return Array.isArray(value)
                    ? value.map(subkey => ({key, value: subkey}))
                    : {key, value}
            })
            .flat()

        // map best times
        const mappedEntries = validEntries
            ? validEntries.map(entry => {
                if (entry.totalTime === bestTimes.get(entry.lockId)) {
                    entry.isBest = 'true'
                } else {
                    entry.isBest = 'false'
                }
                return entry
            })
            : []

        // Filter the data
        const filtered = mappedEntries
            .filter(datum => {
                return filterArray.every(({key, value}) => {
                    return Array.isArray(datum[key])
                        ? datum[key].includes(value)
                        : datum[key] === value
                })
            })
            .filter(datum => (datum.pickerId === user?.uid) || isMod || !['pending', 'deleted', 'rejected'].includes(datum.status))
            .filter(datum => datum.status !== 'deleted')

        // If there is a search term, fuzzy match that
        const searched = search
            ? fuzzysort.go(removeAccents(search), filtered, {keys: fuzzySortKeys})
                .map(result => ({
                    ...result.obj,
                    score: result.score
                }))
            : filtered

        return sort
            ? searched.sort((a, b) => {
                if (sort === 'lock') {
                    return a.lock.localeCompare(b.lock)
                        || a.totalTime - b.totalTime
                } else if (sort === 'belt') {
                    return a.beltIndex - b.beltIndex
                        || a.lock.localeCompare(b.lock)
                        || a.totalTime - b.totalTime
                } else if (sort === 'picker') {
                    return a.pickerName.localeCompare(b.pickerName)
                        || a.totalTime - b.totalTime
                } else if (sort === 'totalTime') {
                    return a.totalTime - b.totalTime
                        || a.lock.localeCompare(b.lock)
                        || a.pickerName.localeCompare(b.pickerName)
                } else if (sort === 'dateAsc') {
                    return dayjs(a.date) - (dayjs(b.date))
                        || a.lock.localeCompare(b.lock)
                        || a.totalTime - b.totalTime
                } else if (sort === 'dateDesc') {
                    return dayjs(b.date) - (dayjs(a.date))
                        || a.lock.localeCompare(b.lock)
                        || a.totalTime - b.totalTime
                } else {
                    return a.lock.localeCompare(b.lock)
                        || a.totalTime - b.totalTime
                }
            })
            : searched.sort((a, b) => {
                return a.lock.localeCompare(b.lock)
                    || a.totalTime - b.totalTime
            })

    }, [bestTimes, filters, isMod, search, sort, user?.uid, validEntries])

    const pendingEntries = useMemo(() => {
        return allEntries.filter(datum => datum.status === 'pending')
    }, [allEntries])

    const getEntryFromId = useCallback(entryId => {
        return allEntries?.find(({id}) => id === entryId)
    }, [allEntries])

    const getLockFromId = useCallback(lockId => {
        return lockData?.find(({id}) => id === lockId)
    }, [lockData])

    const getProfileFromId = useCallback(profileId => {
        return allProfiles?.find(({userId}) => userId === profileId)
    }, [allProfiles])

    const getNameFromId = useCallback(id => {
        const entry = getEntryFromId(id)
        const lock = getLockFromId(entry.lockId)
        if (lock) {
            const {makeModels} = lock
            const {make, model} = makeModels[0]
            const makeModel = make && make !== model ? `${make} ${model}` : model
            return makeModel.replace(/[\s/]/g, '_').replace(/\W/g, '')
        }
    }, [getEntryFromId, getLockFromId])

    const value = useMemo(() => ({
        lockBelts,
        lockData,
        bestTimes,
        bestTimeMap,
        getLockFromId,
        getEntryFromId,
        getNameFromId,
        getProfileFromId,
        isMod,
        allEntries,
        visibleEntries,
        pendingEntries
    }), [
        lockBelts,
        lockData,
        bestTimes,
        bestTimeMap,
        getLockFromId,
        getEntryFromId,
        getNameFromId,
        getProfileFromId,
        isMod,
        allEntries,
        visibleEntries,
        pendingEntries
    ])

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    )
}

const fuzzySortKeys = ['fuzzy']

