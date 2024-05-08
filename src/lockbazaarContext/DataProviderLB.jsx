import React, {useCallback, useMemo, useContext} from 'react'
import entryName from '../util/entryName'
import dayjs from 'dayjs'
import DataContext from '../app/DataContext.jsx'
import FilterContext from '../context/FilterContext.jsx'
import fuzzysort from 'fuzzysort'
import removeAccents from 'remove-accents'
import LoadingContext from './LoadingContextLB.jsx'
import belts, {beltSort, beltSortReverse} from '../data/belts'
import AppContext from '../app/AppContext.jsx'
import DBContext from '../app/DBContext.jsx'
import WatchlistContextLB from './WatchlistContextLB.jsx'

export function DataProvider({children}) {

    const {verbose, beta} = useContext(AppContext)  //eslint-disable-line
    const {filters: allFilters} = useContext(FilterContext)
    const {search, id, tab, name, sellerId, sort, image, profileUpdated, add, ...filters} = allFilters
    const {allEntries, allLocks, getLockFromId, samelineViews} = useContext(LoadingContext)
    const {profile} = useContext(DBContext)
    const {combinedEntries} = useContext(WatchlistContextLB)
    const lockBelts = useMemo(() => belts, [])

    const mappedEntries = useMemo(() => {
        return combinedEntries
            ? combinedEntries
                .filter(listing => (!listing?.makeModels?.make && !listing?.makeModels?.model))
                .map(entry => ({
                    ...entry,
                    makes: entry.makeModels ? entry.makeModels.map(({make}) => make) : [],
                    fuzzy: removeAccents(
                        entry.makeModels
                            .map(({make, model}) => [make, model])
                            .flat()
                            .filter(a => a)
                            .concat([
                                entry.version,
                                entry.notes,
                                entry.belt
                            ])
                            .join(',')
                    ),
                    content: [
                        entry.belt.startsWith('Black') ? 'Is Black' : undefined,
                        entry.belt !== 'Unranked' ? 'Is Ranked' : undefined
                    ].flat().filter(x => x),
                    collection: [
                        profile?.watchlist?.includes?.(entry.id) ? 'Watchlist' : 'Not in Watchlist'
                    ],
                    simpleBelt: entry.belt.replace(/\s\d/g, ''),
                    lockBelt: entry.belt.replace(/\s\d/g, ''),
                    samelineViews: samelineViews[entry.id] || 1
                }))
            : []
    }, [combinedEntries, profile?.watchlist, samelineViews])

    const filteredEntries = useMemo(() => {

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
        return mappedEntries
            .filter(datum => {
                return filterArray.every(({key, value}) => {
                    return Array.isArray(datum[key])
                        ? datum[key].includes(value)
                        : datum[key] === value
                })
            })

    }, [filters, mappedEntries])

    // USE LISTINGS UP TO HERE? //

    // INJECT WATCHLIST //

    // USE ENTRIES //

    const visibleEntries = useMemo(() => {

        // If there is a search term, fuzzy match that
        const searched = search
            ? fuzzysort.go(removeAccents(search), filteredEntries, {keys: fuzzySortKeys, threshold: -25000})
                .map(result => ({
                    ...result.obj,
                    score: result.score
                }))
            : filteredEntries

        verbose && console.log('searched', searched)

        return search
            ? searched
            : searched.sort((a, b) => {
                if (sort === 'belt') {
                    return beltSort(a.belt, b.belt)
                        || entryName(a, 'short').localeCompare(entryName(b, 'short'))
                } else if (sort === 'beltDesc') {
                    return beltSortReverse(a.belt, b.belt)
                        || entryName(a, 'short').localeCompare(entryName(b, 'short'))
                } else if (sort === 'popularity') {
                    return b.samelineViews - a.samelineViews
                        || b.views - a.views
                        || entryName(a, 'short').localeCompare(entryName(b, 'short'))
                } else if (sort === 'newListings') {
                    return Math.floor(dayjs(b.newListingsDate).valueOf() / 60000) * 60000 - Math.floor(dayjs(a.newListingsDate).valueOf() / 60000) * 60000
                        || entryName(a, 'short').localeCompare(entryName(b, 'short'))
                } else {
                    return entryName(a, 'short').localeCompare(entryName(b, 'short'))
                }
            })

    }, [filteredEntries, search, sort, verbose])

    const getEntryFromId = useCallback(entryId => {
        return allEntries?.find(({id}) => id === entryId)
    }, [allEntries])

    const getListingCountFromId = useCallback(entryId => {
        const entry = getEntryFromId(entryId)
        return entry?.listings
            ? entry?.listings.length === 1
                ? '1 Listing'
                : `${entry?.listings.length} Listings`
            : ''
    }, [getEntryFromId])

    const getNameFromId = useCallback(id => {
        const entry = getEntryFromId(id)
        const lock = getLockFromId(entry?.lockId)
        if (lock) {
            const {makeModels} = lock
            const {make, model} = makeModels[0]
            const makeModel = make && make !== model ? `${make} ${model}` : model
            return makeModel.replace(/[\s/]/g, '_').replace(/\W/g, '')
        } else {
            return null
        }
    }, [getEntryFromId, getLockFromId])


    const groupedIds = visibleEntries.reduce((acc, entry) => {
        const id = entry.id.replace(/(\w+)-*.*/, '$1')
        if (!acc[id]) {
            acc[id] = []
        }
        entry.listings && acc[id].push(entry.id)
        acc[id].sort()
        return acc
    }, {})

    const allGroupedIds = mappedEntries.reduce((acc, entry) => {
        const id = entry.id.replace(/(\w+)-*.*/, '$1')
        if (!acc[id]) {
            acc[id] = []
        }
        entry.listings && acc[id].push(entry.id)
        acc[id].sort()
        return acc
    }, {})

    const value = useMemo(() => ({
        lockBelts,
        allLocks,
        getLockFromId,
        getEntryFromId,
        getListingCountFromId,
        getNameFromId,
        allGroupedIds,
        groupedIds,
        allEntries,
        visibleEntries
    }), [
        lockBelts,
        allLocks,
        getLockFromId,
        getEntryFromId,
        getListingCountFromId,
        getNameFromId,
        allGroupedIds,
        groupedIds,
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

