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

export function DataProvider({children}) {

    const {user} = useContext(AuthContext)
    const {filters: allFilters} = useContext(FilterContext)
    const {search, id, tab, name, sort, image, ...filters} = allFilters
    const {allEntries, allProfiles, allLocks} = useContext(LoadingContext)

    //console.log('dp: ', allEntries)
    //console.log('dp: ', allProfiles)
    //console.log('dp: ', allLocks)

    const lockBelts = useMemo(() => belts, [])
    const lockData = useMemo(() => allLocks, [allLocks])
    const bestTimes = useMemo(() => new Map(), [])


    const [modMode, setModMode] = useState(false)
    const isMod = modMode
    const [updated, setUpdated] = useState(0)

    const mappedEntries = useMemo(() => {
       return allEntries.map(entry => {

           const pickerId = entry.pickerId

            entry.pickerName = allProfiles.find(({userId}) => userId === pickerId)
                ? allProfiles.find(({userId}) => userId === pickerId).username
                : ''

            const lockId = entry?.lockId
            const thisLock = lockData?.find(({id}) => id === lockId)
            entry.lock = entryName(thisLock, 'short')
            entry.version = thisLock?.version

            entry.belt = thisLock?.belt
            entry.beltIndex = allBelts.indexOf(thisLock?.belt)

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

    const getLockFromId = useCallback(lockId => {
        return lockData?.find(({id}) => id === lockId)
    }, [lockData])

    const getEntryFromId = useCallback(entryId => {
        return allEntries?.find(({id}) => id === entryId)
    }, [allEntries])

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
            .filter(datum => (datum.pickerId === user?.uid) || isMod || datum.status !== 'pending')
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

    const DCUpdate = useCallback(value => {
        setUpdated(value)
    }, [])

    const toggleMod = useCallback(() => {
        setModMode(!modMode)
        DCUpdate(Math.random())
    }, [DCUpdate, modMode])

    const value = useMemo(() => ({
        lockBelts,
        lockData,
        bestTimes,
        getLockFromId,
        getEntryFromId,
        getNameFromId,
        DCUpdate,
        toggleMod,
        isMod,
        allEntries,
        visibleEntries,
    }), [
        lockBelts,
        lockData,
        bestTimes,
        getLockFromId,
        getEntryFromId,
        getNameFromId,
        DCUpdate,
        toggleMod,
        isMod,
        allEntries,
        visibleEntries,
    ])

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    )
}

const fuzzySortKeys = ['fuzzy']

