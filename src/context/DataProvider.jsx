import React, {useCallback, useMemo, useState, useContext} from 'react'
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
import AppContext from '../app/AppContext.jsx'

export function DataProvider({children}) {

    const {user, isLoggedIn} = useContext(AuthContext)
    const {filters: allFilters} = useContext(FilterContext)
    const {search, id, tab, name, sort, image, profileUpdated, ...filters} = allFilters
    const {allEntries, allProfiles, allLocks} = useContext(LoadingContext)
    const {modMode, setModMode} = useContext(AppContext)
    const {profile} = useContext(DBContext)

    //console.log('dp: ', allEntries)
    //console.log('dp: ', allProfiles)
    //console.log('dp: ', allLocks)

    const lockBelts = useMemo(() => belts, [])
    const lockData = useMemo(() => allLocks, [allLocks])
    const bestTimes = useMemo(() => new Map(), [])
    const isMod = !!(user && profile && profile?.isMod)
    const [updated, setUpdated] = useState(0)

    const mappedEntries = useMemo(() => {
        return allEntries.map(entry => {

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

            entry.forceUpdate = updated

            return entry
        })
    }, [allEntries, allProfiles, lockData, bestTimes, updated])

    mappedEntries.map(entry => {
        if (entry.totalTime === bestTimes.get(entry.lockId)) {
            entry.isBest = 'true'
        } else {
            entry.isBest = 'false'
        }
    })

    const getEntryFromId = useCallback(entryId => {
        return allEntries?.find(({id}) => id === entryId)
    }, [allEntries])


    const userEntries = useMemo(() => {  // eslint-disable-line
        if (!isLoggedIn) return []
        const entryIds = []
        mappedEntries.filter(datum => datum.pickerId === user?.uid)
            .map(entry => {
                entryIds.push(entry.id)
            })
        return entryIds
    }, [isLoggedIn, mappedEntries, user?.uid])

    const userEntriesApproved = useMemo(() => {
        if (!isLoggedIn) return []
        const entryIds = []
        mappedEntries.filter(datum => datum.status === 'approved')
            .filter(datum => datum.pickerId === user?.uid)
            .map(entry => {
                entryIds.push(entry.id)
            })
        return entryIds
    }, [isLoggedIn, mappedEntries, user?.uid])

    const newApprovedEntries = useMemo(() => {
        if (!isLoggedIn) return []
        const approvedEntries = profile?.approvedEntries
            ? profile?.approvedEntries
            : []
        const entries = []
        userEntriesApproved.map(id => {
            if (!approvedEntries.includes(id)) {
                entries.push(getEntryFromId(id))
            }
        })
        return entries
    }, [getEntryFromId, isLoggedIn, profile?.approvedEntries, userEntriesApproved])

/*
    console.log('userEntries: ', userEntries)
    console.log('userEntriesApproved: ', userEntriesApproved)
    console.log('profile?.approvedEntries: ',profile?.approvedEntries)
    console.log('newApprovedEntries: ', newApprovedEntries)
*/

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

        // Filter the data
        const filtered = mappedEntries
            .filter(datum => {
                return filterArray.every(({key, value}) => {
                    return Array.isArray(datum[key])
                        ? datum[key].includes(value)
                        : datum[key] === value
                })
            })
            .filter(datum => (datum.pickerId === user?.uid) || isMod || (datum.status !== 'pending' && datum.status !== 'rejected'))
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

    }, [filters, isMod, mappedEntries, search, sort, user?.uid])

    const pendingEntries = useMemo(() => {
        return allEntries.filter(datum => datum.status === 'pending')
    }, [allEntries])

    const DCUpdate = useCallback(value => {
        setUpdated(value)
    }, [])

    const toggleMod = useCallback(() => {
        setModMode(!modMode)
        DCUpdate(Math.random())
    }, [DCUpdate, modMode, setModMode])

    const value = useMemo(() => ({
        lockBelts,
        lockData,
        bestTimes,
        getLockFromId,
        getEntryFromId,
        getNameFromId,
        getProfileFromId,
        DCUpdate,
        toggleMod,
        isMod,
        allEntries,
        visibleEntries,
        pendingEntries,
        newApprovedEntries
    }), [
        lockBelts,
        lockData,
        bestTimes,
        getLockFromId,
        getEntryFromId,
        getNameFromId,
        getProfileFromId,
        DCUpdate,
        toggleMod,
        isMod,
        allEntries,
        visibleEntries,
        pendingEntries,
        newApprovedEntries
    ])

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    )
}

const fuzzySortKeys = ['fuzzy']

