import React, {useCallback, useMemo, useContext, useState, useEffect} from 'react'
import dayjs from 'dayjs'
import DataContext from '../context/DataContext.jsx'
import FilterContext from '../context/FilterContext.jsx'
import fuzzysort from 'fuzzysort'
import removeAccents from 'remove-accents'
import AuthContext from '../app/AuthContext.jsx'
import DBContextCL from './DBProviderCL.jsx'
import {useLocalStorage} from 'usehooks-ts'

export function DataProvider({children}) {

    const {user, userClaims} = useContext(AuthContext)
    const isMod = ['CLadmin', 'admin'].some(claim => userClaims.includes(claim))
    const [adminEnabled, setAdminEnabled] = useLocalStorage('adminEnabled', false)

    const {allEntries, getCheckIns} = useContext(DBContextCL)
    const [allCheckIns, setAllCheckIns] = useState([])
    const {filters: allFilters} = useContext(FilterContext)
    const {search, id, tab, name, sort, image, profileUpdated, ...filters} = allFilters

    const userId = id || user?.uid


    const refreshCheckIns = useCallback(async () => {
        try {
            const data = await getCheckIns({userId: userId})
            setAllCheckIns(data)
            return data
        } catch (err) {
            console.error('Error fetching check-ins', err)
            setAllCheckIns([])
        }
    }, [getCheckIns, userId])

    useEffect(() => {
        if (user && user.uid) {
            refreshCheckIns().then(allCheckIns => {
                setAllCheckIns(allCheckIns)
            })
        }
    }, [allEntries, refreshCheckIns, user])


    const mappedCheckIns = useMemo(() => {
        return allCheckIns
            ? allCheckIns.map(checkIn => {
                const lock = allEntries.find(lock => lock.id === checkIn.lockId)
                return {
                    ...checkIn,
                    lockName: lock?.name || 'Unknown Lock',
                    lockMaker: lock?.maker || undefined,
                    lockFormat: lock?.lockFormat || undefined,
                    lockingMechanism: lock?.lockingMechanism || undefined,
                    fuzzy: removeAccents(`${lock?.name}, ${lock?.maker}`),
                    pickDate: checkIn.pickDate || checkIn.submittedAt,
                    lock
                }
            })
            : []
    }, [allEntries, allCheckIns])

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
        const filtered = mappedCheckIns
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
                    return a.lockName.localeCompare(b.lockName)
                        || dayjs(b.pickDate).valueOf() - dayjs(a.pickDate).valueOf()
                } else if (sort === 'maker') {
                    return a.lockMaker?.localeCompare(b.lockMaker)
                        || a.lockName?.localeCompare(b.lockName)
                        || dayjs(b.pickDate).valueOf() - dayjs(a.pickDate).valueOf()
                } else if (sort.startsWith('rating')) {
                    return (b[sort] || 0) - (a[sort] || 0)
                        || a.lockName?.localeCompare(b.lockName)
                } else {
                    return dayjs(b.pickDate).valueOf() - dayjs(a.pickDate).valueOf()
                }
            })
            : searched.sort((a, b) => {
                return dayjs(b.pickDate).valueOf() - dayjs(a.pickDate).valueOf()
            })

    }, [filters, mappedCheckIns, search, sort])

    const value = useMemo(() => ({
        isMod, adminEnabled, setAdminEnabled,
        allCheckIns,
        mappedCheckIns,
        visibleEntries
    }), [
        isMod, adminEnabled, setAdminEnabled,
        allCheckIns,
        mappedCheckIns,
        visibleEntries
    ])

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    )
}

const fuzzySortKeys = ['fuzzy']

