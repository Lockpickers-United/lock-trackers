import React, {useCallback, useMemo, useContext, useState} from 'react'
import dayjs from 'dayjs'
import DataContext from '../context/DataContext.jsx'
import FilterContext from '../context/FilterContext.jsx'
import fuzzysort from 'fuzzysort'
import removeAccents from 'remove-accents'
import DBContext from './DBContextCL.jsx'

//import allEntries from './challengeLocks.json'


export function DataProvider({children}) {

    const {filters: allFilters} = useContext(FilterContext)
    const {search, id, tab, name, sort, image, profileUpdated, ...filters} = allFilters
    const {allEntries} = useContext(DBContext)

    const isMod = true

    const mappedEntries = useMemo(() => {
        return allEntries
            ? allEntries.map(entry => ({
                ...entry,
                fuzzy: removeAccents(`${entry.name}, ${entry.maker}`)
            }))
            : []
    }, [allEntries])

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
            ? fuzzysort.go(removeAccents(search), filtered, {keys: fuzzySortKeys, threshold: -15000})
                .map(result => ({
                    ...result.obj,
                    score: result.score
                }))
            : filtered

        return sort
            ? searched.sort((a, b) => {
                if (sort === 'name') {
                    return a.name.localeCompare(b.name)
                } else if (sort === 'createdAsc') {
                    return dayjs(a.createdAt).valueOf() - dayjs(b.createdAt).valueOf()
                        || a.name.localeCompare(b.name)
                } else if (sort === 'createdDesc') {
                    return dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf()
                        || a.name.localeCompare(b.name)
                } else {
                    return a.name.localeCompare(b.name)
                }
            })
            : searched.sort((a, b) => {
                return a.name.localeCompare(b.name)
            })

    }, [filters, mappedEntries, search, sort])


    const getEntryFromId = useCallback(entryId => {
        return allEntries?.find(({id}) => id === entryId)
    }, [allEntries])

    // needed for card layout only
    const [openId, setOpenId] = useState(null)

    const makerData = useMemo(() => {
        return allEntries?.reduce((acc, entry) => {
            acc[entry.maker] = acc[entry.maker] ? acc[entry.maker] + 1 : 1
            return acc
        }, {})
    }, [allEntries])

    const value = useMemo(() => ({
        getEntryFromId,
        isMod,
        allEntries,
        visibleEntries,
        makerData,
        openId, setOpenId
    }), [getEntryFromId,
        isMod,
        allEntries,
        visibleEntries,
        makerData,
        openId])


    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    )
}

const fuzzySortKeys = ['fuzzy']

