import React, {useCallback, useMemo, useContext, useState} from 'react'
import dayjs from 'dayjs'
import DataContext from '../context/DataContext.jsx'
import FilterContext from '../context/FilterContext.jsx'
import fuzzysort from 'fuzzysort'
import removeAccents from 'remove-accents'
import AuthContext from '../app/AuthContext.jsx'
import DBContext from '../app/DBContext.jsx'

import allEntries from './challengeLocks.json'

export function DataProvider({children}) {

    const {user} = useContext(AuthContext)
    const {filters: allFilters} = useContext(FilterContext)
    const {search, id, tab, name, sort, image, profileUpdated, ...filters} = allFilters
    const {adminFlags} = useContext(DBContext)

    const isMod = !!adminFlags.isSPMod

    const mappedEntries = useMemo(() => {
        return allEntries
            ? allEntries.map(entry => ({
                ...entry,
                fuzzy: removeAccents(`${entry.name}, ${entry.maker}`)
            }))
            : []
    }, [])


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
        const allFiltered = mappedEntries
            .filter(datum => {
                return filterArray.every(({key, value}) => {
                    return Array.isArray(datum[key])
                        ? datum[key].includes(value)
                        : datum[key] === value
                })
            })
            .filter(datum => (datum.pickerId === user?.uid) || isMod || !['pending', 'deleted', 'rejected'].includes(datum.status))
            .filter(datum => datum.status !== 'deleted')

        const filtered = filters.rank === 'Show All'
            ? allFiltered
            : allFiltered.filter(entry => entry.isBest)


        // If there is a search term, fuzzy match that
        const searched = search
            ? fuzzysort.go(removeAccents(search), filtered, {keys: fuzzySortKeys, threshold: -15000})
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
    }, [])

    const getEntryFromId = useCallback(entryId => {
        return allEntries?.find(({id}) => id === entryId)
    }, [])

    const [openId, setOpenId] = useState(null)


    const value = useMemo(() => ({
        getEntryFromId,
        isMod,
        allEntries,
        visibleEntries,
        pendingEntries, openId, setOpenId
    }), [getEntryFromId, isMod, visibleEntries, pendingEntries, openId, setOpenId])


    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    )
}

const fuzzySortKeys = ['fuzzy']

