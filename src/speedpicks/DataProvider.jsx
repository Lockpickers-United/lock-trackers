import React, {useCallback, useMemo, useState, useContext} from 'react'
import lockJson from '../data/data.json'
import belts, {beltSort, beltSortReverse, uniqueBelts} from '../data/belts'
import speedPickData from './speedPicks.json'
import entryName from '../entries/entryName'
import formatTime from './formatTime'
import dayjs from 'dayjs'
import DataContext from '../context/DataContext'
import FilterContext from '../context/FilterContext.jsx'
import getAnyCollection from '../util/getAnyCollection'
import fuzzysort from 'fuzzysort'
import removeAccents from 'remove-accents'
import DBContext from '../app/DBContext.jsx'
import useData from '../util/useData.jsx'

export function DataProvider({children, allEntries, profile}) {
    const {filters: allFilters} = useContext(FilterContext)
    const {search, id, tab, name, sort, image, ...filters} = allFilters
    const anyCollection = useMemo(() => getAnyCollection(profile), [profile])

    const lockBelts = useMemo(() => belts, [])
    const [speedPicks, setSpeedPicks] = useState(speedPickData)

    const lockData = useMemo(() => lockJson, [])
    const bestTimes = useMemo(() => new Map(), [])

    const mappedEntries = useMemo(() => {
        return allEntries.map(entry => {

            const lockId = entry.lockId
            const thisLock = lockData?.find(({id}) => id === lockId)
            entry.lock = entryName(thisLock, 'short')
            entry.version = thisLock.version

            entry.belt = thisLock.belt
            const beltLookup = thisLock.belt.startsWith('Black') ? 'Black' : thisLock.belt
            entry.beltIndex = uniqueBelts.indexOf(beltLookup)

            const totalTime = (dayjs(entry.open) - dayjs(entry.start)) / 1000
            entry.totalTime = totalTime
            entry.totalTimeString = formatTime(totalTime)

            if (bestTimes.get(lockId) && entry.approved) {
                const bestTime = totalTime > bestTimes.get(lockId) ? bestTimes.get(lockId) : totalTime
                bestTimes.set(lockId, bestTime)
            } else if (entry.approved) {
                bestTimes.set(lockId, totalTime)
            }
            return entry
        })
    }, [allEntries, bestTimes, lockData])

    console.log(mappedEntries)


    const getPickerNameFromId = useCallback(pickerId => {
        const {getProfile} = useContext(DBContext)
        const loadFn = useCallback(() => {
            return getProfile(pickerId)
        }, [getProfile, pickerId])
        const {data = {}, loading, error} = useData({loadFn})
        return data?.displayName
    }, [])


    const getLockFromId = useCallback(lockId => {
        return lockData?.find(({id}) => id === lockId)
    }, [lockData])

    const getEntryFromId = useCallback(entryId => {
        return allEntries.find(({id}) => id === entryId)
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
                    //return getPickerNameFromId(a.picker).localeCompare(getPickerNameFromId(b.picker))
                    return a.picker.localeCompare(b.picker)
                        || a.totalTime - b.totalTime
                } else {
                    return a.lock.localeCompare(b.lock)
                        || a.totalTime - b.totalTime
                }
            })
            : searched
    }, [filters, mappedEntries, search, sort])

console.log(sort)
    // MG CODE


    const addEntry = useCallback(entry => {
        const foo = speedPickData.data.push(entry)
        console.log(entry)
    }, [])

    const [updated, setUpdated] = useState(0)
    const DCUpdate = useCallback(value => {
        setUpdated(value)
    }, [])


    const [isMod, setIsMod] = useState(true)
    const toggleMod = useCallback(value => {
        setIsMod(!isMod)
        setSpeedPicks(speedPickData)
        DCUpdate(Math.random())
    }, [DCUpdate, isMod])

    if (!isMod) {
        speedPicks.data = speedPicks.data.filter(entry =>
            entry.approved === true
        )
    }

    const value = useMemo(() => ({
        lockBelts,
        lockData,
        bestTimes,
        getLockFromId,
        getEntryFromId,
        getNameFromId,
        addEntry,
        DCUpdate,
        toggleMod,
        isMod,
        allEntries,
        visibleEntries

    }), [
        lockBelts,
        lockData,
        bestTimes,
        getLockFromId,
        getEntryFromId,
        getNameFromId,
        addEntry,
        DCUpdate,
        toggleMod,
        isMod,
        allEntries,
        visibleEntries
    ])

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    )
}

const fuzzySortKeys = ['fuzzy']

export default DataProvider
