import React, {useCallback, useMemo, useContext} from 'react'
import LoadingContext from './LoadingContextYT.jsx'
import DataContext from '../app/DataContext.jsx'
import FilterContext from '../context/FilterContext.jsx'
import fuzzysort from 'fuzzysort'
import removeAccents from 'remove-accents'

export function DataProvider({children}) {

    const verbose = false
    const {filters: allFilters} = useContext(FilterContext)
    const {search, id, tab, name, sellerId, sort, image, profileUpdated, add, ...filters} = allFilters
    const {allChannels} = useContext(LoadingContext)

    const filteredChannels = useMemo(() => {

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
        return allChannels
            .filter(datum => {
                return filterArray.every(({key, value}) => {
                    return Array.isArray(datum[key])
                        ? datum[key].includes(value)
                        : datum[key] === value
                })
            })

    }, [filters, allChannels])

    const visibleChannels = useMemo(() => {

        // If there is a search term, fuzzy match that
        const searched = search
            ? fuzzysort.go(removeAccents(search), filteredChannels, {keys: fuzzySortKeys, threshold: -25000})
                .map(result => ({
                    ...result.obj,
                    score: result.score
                }))
            : filteredChannels

        // console.log('searched', searched)

        return searched.sort((a, b) => {
                if (sort === 'views') {
                    return b.viewCount - a.viewCount
                        || a.title.localeCompare(b.title)
                } else if (sort === 'videos') {
                    return b.videoCount - a.videoCount
                        || a.title.localeCompare(b.title)
                } else if (sort === 'subscribers') {
                    return b.subscriberCount - a.subscriberCount
                        || a.title.localeCompare(b.title)
                } else {
                    return a.title.localeCompare(b.title)
                }
            })

    }, [filteredChannels, search, sort])

    const getChannelFromId = useCallback(channelId => {
        return allChannels?.find(({id}) => id === channelId)
    }, [allChannels])

    const getNameFromId = useCallback(id => {
        const channel = getChannelFromId(id)
        return channel.title
    }, [getChannelFromId])

    const value = useMemo(() => ({
        visibleChannels,
        getChannelFromId,
        getNameFromId
    }), [
        visibleChannels,
        getChannelFromId,
        getNameFromId
    ])

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    )
}

const fuzzySortKeys = ['fuzzy']

