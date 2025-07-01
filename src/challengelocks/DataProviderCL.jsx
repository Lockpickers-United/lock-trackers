import React, {useCallback, useMemo, useContext, useEffect} from 'react'
import dayjs from 'dayjs'
import DataContext from '../context/DataContext.jsx'
import FilterContext from '../context/FilterContext.jsx'
import fuzzysort from 'fuzzysort'
import removeAccents from 'remove-accents'
import DBContext from './DBProviderCL.jsx'
import AuthContext from '../app/AuthContext.jsx'
import {useLocalStorage} from 'usehooks-ts'
import countries from '../data/countries.json'
import createDateSorter from '../util/createDateSorter.js'

export function DataProvider({children}) {

    const {userClaims} = useContext(AuthContext)
    const isMod = ['CLAdmin', 'admin'].some(claim => userClaims.includes(claim))

    const [adminEnabled, setAdminEnabled] = useLocalStorage('adminEnabled', false)

    useEffect(() => {
        if (!isMod && adminEnabled) {
            setAdminEnabled(false)
        }
    }, [adminEnabled, isMod, setAdminEnabled])

    const {filters: allFilters} = useContext(FilterContext)
    const {search, id, tab, name, sort, image, profileUpdated, ...filters} = allFilters
    const {allEntries} = useContext(DBContext)

    const mappedEntries = useMemo(() => {
        return allEntries
            ? allEntries.map(entry => {
                let maxVotes = 0
                const ratings = Object.keys(entry)
                    .filter(key => key.startsWith('rating'))
                    .reduce((acc, key) => {
                        maxVotes = Math.max(maxVotes, entry[key]?.length || 0)
                        acc[key.replace('rating', 'ratingAve')] = entry[key]?.reduce((acc, currentValue) => acc + currentValue, 0) / (entry[key]?.length || 1)
                        return acc
                    }, {})

                return {
                    ...entry,
                    ...ratings,
                    maxVotes: maxVotes,
                    fuzzy: removeAccents(`${entry.name}, ${entry.maker}`),
                    latestCheckIn: entry.latestUpdate?.pickDate || null,
                    updatedAt: entry.updatedAt || entry.latestUpdate?.pickDate || '2000-01-01T06:00:00.000Z',
                    thumbnail: entry.media?.length > 0 && entry.media[0].thumbnailSquareUrl
                        ? entry.media[0].thumbnailSquareUrl
                        : entry.thumbnail || undefined,
                    displayCountry: countries.find(country => country.country_area === entry.country)?.short_name || entry.country || 'Unknown',
                    hasProblems: entry.problems?.length > 0 ? 'problems' : null,
                    checkInCount: entry.checkInIds?.length || 0,
                    successCount: entry.checkInIdsSuccessful?.length || 0,
                    lockingMechanism: entry.lockingMechanism || 'Pin-tumbler',
                    hasImages: entry.media?.length > 0 ? 'Images' : 'No Images'
                }
            })
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

        // Check for exact search match by id
        const exactMatch = search && filtered.find(e => e.id === search)
        let searched = filtered

        // If there is a search term, fuzzy match that
        if (exactMatch) {
            searched = [exactMatch]
        } else if (search) {
            searched = search
                ? fuzzysort.go(removeAccents(search.toString()), filtered, {keys: fuzzySortKeys, threshold: -15000})
                    .map(result => ({
                        ...result.obj,
                        score: result.score
                    }))
                : filtered
        }

        return sort
            ? searched.sort((a, b) => {
                if (sort === 'name') {
                    return a.name.localeCompare(b.name)
                        || dayjs(b.submittedAt).valueOf() - dayjs(a.submittedAt).valueOf()
                } else if (sort === 'maker') {
                    return a.maker.localeCompare(b.maker)
                        || a.name.localeCompare(b.name)
                        || dayjs(b.submittedAt).valueOf() - dayjs(a.submittedAt).valueOf()
                } else if (sort === 'createdAsc') {
                    return createDateSorter('lockCreatedAt', 'asc')(a, b)
                } else if (sort === 'createdDesc') {
                    return createDateSorter('lockCreatedAt', 'desc')(a, b)
                } else if (sort === 'checkInAsc') {
                    return createDateSorter('latestCheckIn', 'asc')(a, b)
                } else if (sort === 'checkInDesc') {
                    return createDateSorter('latestCheckIn', 'desc')(a, b)
                } else if (sort === 'submittedAt') {
                    return createDateSorter('submittedAt', 'desc')(a, b)
                } else if (sort === 'updatedAt') {
                    return createDateSorter('updatedAt', 'desc')(a, b)
                } else if (sort === 'checkInCount') {
                    return (b.checkInCount || 0) - (a.checkInCount || 0)
                        || a.name.localeCompare(b.name)
                } else if (sort.startsWith('ratingAve')) {
                    return (b[sort] || 0) - (a[sort] || 0)
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
        return mappedEntries?.find(({id}) => id === entryId)
    }, [mappedEntries])

    const getEntryFromName = useCallback(entryName => {
        return mappedEntries?.find(({name}) => name === entryName)
    }, [mappedEntries])

    const makerData = useMemo(() => {
        return allEntries?.reduce((acc, entry) => {
            acc[entry.maker] = acc[entry.maker] ? acc[entry.maker] + 1 : 1
            return acc
        }, {})
    }, [allEntries])

    const makerListByCount = useMemo(() => {
        return Object.keys(makerData).sort((a, b) => makerData[b] - makerData[a])
    }, [makerData])

    const lockNames = useMemo(() => {
        return allEntries?.map(entry => entry.name)
    }, [allEntries])

    const value = useMemo(() => ({
        getEntryFromId,
        getEntryFromName,
        isMod,
        adminEnabled,
        setAdminEnabled,
        allEntries,
        mappedEntries,
        visibleEntries,
        makerData,
        makerListByCount,
        lockNames
    }), [
        getEntryFromId,
        getEntryFromName,
        isMod,
        adminEnabled,
        setAdminEnabled,
        allEntries,
        mappedEntries,
        visibleEntries,
        makerData,
        makerListByCount,
        lockNames
    ])


    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    )
}

const fuzzySortKeys = ['fuzzy']

