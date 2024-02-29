import React, {useCallback, useMemo, useState, useContext} from 'react'
import lockJson from '../data/data.json'
import belts, {uniqueBelts} from '../data/belts'
import speedPickData from './speedPicks.json'
import entryName from '../util/entryName'
import formatTime from '../util/formatTime.jsx'
import dayjs from 'dayjs'
import DataContext from '../context/DataContext'
import FilterContext from '../context/FilterContext.jsx'
import fuzzysort from 'fuzzysort'
import removeAccents from 'remove-accents'

export function DataProvider({children, allEntries}) {
    const {filters: allFilters} = useContext(FilterContext)
    const {search, id, tab, name, sort, image, ...filters} = allFilters

    const lockBelts = useMemo(() => belts, [])
    const [speedPicks, setSpeedPicks] = useState(speedPickData)

    const lockData = useMemo(() => lockJson, [])
    const bestTimes = useMemo(() => new Map(), [])

    const getPickerNameFromId = useCallback(pickerId => {
        //TODO get actual name
        return pickerId
    }, [])


    const mappedEntries = useMemo(() => {
        return allEntries.map(entry => {

            const lockId = entry.lockId
            const thisLock = lockData?.find(({id}) => id === lockId)
            entry.lock = entryName(thisLock, 'short')
            entry.version = thisLock.version

            entry.pickerName = getPickerNameFromId
            entry.belt = thisLock.belt
            const beltLookup = thisLock.belt.startsWith('Black') ? 'Black' : thisLock.belt
            entry.beltIndex = uniqueBelts.indexOf(beltLookup)

            const totalTime = (dayjs(entry.open) - dayjs(entry.start)) / 1000
            entry.totalTime = totalTime
            entry.totalTimeString = formatTime(totalTime)

            if (bestTimes.get(lockId) && entry.status==='approved') {
                const bestTime = totalTime > bestTimes.get(lockId) ? bestTimes.get(lockId) : totalTime
                bestTimes.set(lockId, bestTime)
            } else if (entry.status==='approved') {
                bestTimes.set(lockId, totalTime)
            }
            return entry
        })
    }, [allEntries, bestTimes, getPickerNameFromId, lockData])


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
            : searched.sort((a, b) => {
                return a.lock.localeCompare(b.lock)
                || a.totalTime - b.totalTime
            })

    }, [filters, mappedEntries, search, sort])

//console.log(visibleEntries)

    const addEntry = useCallback(entry => {
        const temp = speedPickData.data.push(entry)
        console.log(temp)
    }, [])

    const [updated, setUpdated] = useState(0)
    const DCUpdate = useCallback(value => {
        setUpdated(value)
        console.log(updated)
    }, [updated])

    const [isMod, setIsMod] = useState(true)
    const toggleMod = useCallback(() => {
        setIsMod(!isMod)
        setSpeedPicks(speedPickData)
        DCUpdate(Math.random())
    }, [DCUpdate, isMod])

    if (!isMod) {
        speedPicks.data = speedPicks.data.filter(entry =>
            entry.status === 'approved'
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

