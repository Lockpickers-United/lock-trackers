import React, {useCallback, useMemo, useContext} from 'react'
import entryName from '../util/entryName'
import dayjs from 'dayjs'
import DataContext from '../context/DataContext.jsx'
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
    const {search, id, tab, name, sellerId, sort, image, profileUpdated, ...filters} = allFilters
    const {allEntries, allLocks} = useContext(LoadingContext)
    const {profile} = useContext(DBContext)
    const {combinedEntries} = useContext(WatchlistContextLB)

    const lockBelts = useMemo(() => belts, [])

    const getLockFromId = useCallback(lockId => {
        return allLocks?.find(({id}) => id === lockId)
    }, [allLocks])

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
                    entry.media?.some(m => !m.fullUrl.match(/youtube\.com/)) ? 'Has Images' : 'No Images',
                    entry.media?.some(m => m.fullUrl.match(/youtube\.com/)) ? 'Has Video' : 'No Video',
                    entry.links?.length > 0 ? 'Has Links' : 'No Links',
                    dayjs(entry.lastUpdated).isAfter(dayjs().subtract(1, 'days')) ? 'Updated Recently' : undefined,
                    entry.belt.startsWith('Black') ? 'Is Black' : undefined,
                    entry.belt !== 'Unranked' ? 'Is Ranked' : undefined
                ].flat().filter(x => x),
                collection: [
                    profile?.watchlist?.includes?.(entry.id) ? 'Watchlist' : ''
                ],
                simpleBelt: entry.belt.replace(/\s\d/g, ''),
                lockBelt: entry.belt.replace(/\s\d/g, '')
            }))
            : []
    }, [combinedEntries, profile?.watchlist])

    const getEntryFromId = useCallback(entryId => {
        return combinedEntries?.find(({id}) => id === entryId)
    }, [combinedEntries])

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
            ? fuzzysort.go(removeAccents(search), filtered, {keys: fuzzySortKeys, threshold: -25000})
                .map(result => ({
                    ...result.obj,
                    score: result.score
                }))
            : filtered

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
                    return b.views - a.views
                        || entryName(a, 'short').localeCompare(entryName(b, 'short'))
                } else {
                    return entryName(a, 'short').localeCompare(entryName(b, 'short'))
                }
            })

    }, [filters, mappedEntries, search, sort, verbose])

    const value = useMemo(() => ({
        lockBelts,
        allLocks,
        getLockFromId,
        getEntryFromId,
        getNameFromId,
        allEntries,
        visibleEntries
    }), [
        lockBelts,
        allLocks,
        getLockFromId,
        getEntryFromId,
        getNameFromId,
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

