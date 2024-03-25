import React, {useCallback, useMemo, useContext} from 'react'
import entryName from '../util/entryName'
import dayjs from 'dayjs'
import DataContext from '../context/DataContext.jsx'
import FilterContext from '../context/FilterContext.jsx'
import fuzzysort from 'fuzzysort'
import removeAccents from 'remove-accents'
import AuthContext from '../app/AuthContext.jsx'
import LoadingContext from './LoadingContextLB.jsx'
import DBContext from '../app/DBContext.jsx'
import belts, {beltSort} from '../data/belts'

export function DataProvider({children}) {

    const {user} = useContext(AuthContext)
    const {filters: allFilters} = useContext(FilterContext)
    const {search, id, tab, name, sort, image, profileUpdated, ...filters} = allFilters
    const {allEntries, allLocks} = useContext(LoadingContext)
    const {profile} = useContext(DBContext)

    const lockBelts = useMemo(() => belts, [])
    const lockData = useMemo(() => allLocks, [allLocks])
    const isMod = !!(user && profile && profile?.isMod)

    const getLockFromId = useCallback(lockId => {
        return lockData?.find(({id}) => id === lockId)
    }, [lockData])

    const mappedEntries = useMemo(() => {
        return allEntries
            .map(entry => ({
                ...entry,
                makes: entry.makeModels.map(({make}) => make),
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
                simpleBelt: entry.belt.replace(/\s\d/g, '')
            }))
    }, [allEntries])

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

        // TODO: get name to sort by???
        return sort
            ? searched.sort((a, b) => {
                if (sort === 'lock') {
                    return entryName(a, 'short').localeCompare(entryName(b, 'short'))
                } else if (sort === 'belt') {
                    return beltSort(a.belt, b.belt)
                        || entryName(a, 'short').localeCompare(entryName(b, 'short'))
                } else if (sort === 'seller') {
                    return entryName(a, 'short').localeCompare(entryName(b, 'short'))
                } else {
                    return a.localeCompare(b)
                }
            })
            : searched.sort((a, b) => {
                return beltSort(a.belt, b.belt)
                    || entryName(a, 'short').localeCompare(entryName(b, 'short'))
            })

    }, [filters, mappedEntries, search, sort])

    const value = useMemo(() => ({
        lockBelts,
        lockData,
        getLockFromId,
        getEntryFromId,
        getNameFromId,
        isMod,
        allEntries,
        visibleEntries,
    }), [
        lockBelts,
        lockData,
        getLockFromId,
        getEntryFromId,
        getNameFromId,
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

