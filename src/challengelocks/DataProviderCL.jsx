import React, {useCallback, useMemo, useContext, useEffect} from 'react'
import dayjs from 'dayjs'
import DataContext from '../context/DataContext.jsx'
import FilterContext from '../context/FilterContext.jsx'
import fuzzysort from 'fuzzysort'
import removeAccents from 'remove-accents'
import DBContext from './DBProviderCL.jsx'
import AuthContext from '../app/AuthContext.jsx'
import {useLocalStorage} from 'usehooks-ts'

export function DataProvider({children}) {

    const {userClaims} = useContext(AuthContext)
    const isMod = ['CLadmin', 'admin'].some(claim => userClaims.includes(claim))
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

                const mainImage = entry.mainImage?.length > 0 ? entry.mainImage[0] : entry.media?.length > 0 ? entry.media[0] : undefined

                return {
                    ...entry,
                    ...ratings,
                    maxVotes: maxVotes,
                    fuzzy: removeAccents(`${entry.name}, ${entry.maker}`),
                    latestCheckIn: entry.latestUpdate?.pickDate || '2000-01-01T06:00:00.000Z',
                    submittedAt: entry.submittedAt || entry.dateSubmitted,
                    lockCreated: entry.lockCreated || entry.createdAt,
                    updatedAt: entry.updatedAt || entry.latestUpdate?.pickDate || '2000-01-01T06:00:00.000Z',
                    thumbnail: mainImage.thumbnailSquareUrl || entry.thumbnail,
                    mainImage: mainImage,
                    hasProblems: entry.problems?.length > 0 ? 'problems' : undefined,
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
                        || dayjs(b.submittedAt).valueOf() - dayjs(a.submittedAt).valueOf()
                } else if (sort === 'maker') {
                    return a.maker.localeCompare(b.maker)
                        || a.name.localeCompare(b.name)
                        || dayjs(b.submittedAt).valueOf() - dayjs(a.submittedAt).valueOf()
                } else if (sort === 'submittedAt') {
                    return dayjs(b.submittedAt).valueOf() - dayjs(a.submittedAt).valueOf()
                        || a.name.localeCompare(b.name)
                } else if (sort === 'updatedAt') {
                    return dayjs(b.updatedAt).valueOf() - dayjs(a.updatedAt).valueOf()
                        || a.name.localeCompare(b.name)
                } else if (sort === 'createdAsc') {
                    return dayjs(a.lockCreated).valueOf() - dayjs(b.lockCreated).valueOf()
                        || a.name.localeCompare(b.name)
                } else if (sort === 'createdDesc') {
                    return dayjs(b.lockCreated).valueOf() - dayjs(a.lockCreated).valueOf()
                        || a.name.localeCompare(b.name)
                } else if (sort === 'checkInAsc') {
                    return dayjs(a.latestCheckIn).valueOf() - dayjs(b.latestCheckIn).valueOf()
                        || a.name.localeCompare(b.name)
                } else if (sort === 'checkInDesc') {
                    return dayjs(b.latestCheckIn).valueOf() - dayjs(a.latestCheckIn).valueOf()
                        || a.name.localeCompare(b.name)
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

    const makerData = useMemo(() => {
        return allEntries?.reduce((acc, entry) => {
            acc[entry.maker] = acc[entry.maker] ? acc[entry.maker] + 1 : 1
            return acc
        }, {})
    }, [allEntries])

    const value = useMemo(() => ({
        getEntryFromId,
        isMod, adminEnabled, setAdminEnabled,
        allEntries,
        mappedEntries,
        visibleEntries,
        makerData,
    }), [
        getEntryFromId,
        isMod, adminEnabled, setAdminEnabled,
        allEntries,
        mappedEntries,
        visibleEntries,
        makerData,
        ])


    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    )
}

const fuzzySortKeys = ['fuzzy']

