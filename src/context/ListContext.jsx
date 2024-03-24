import React, {useCallback, useContext, useMemo} from 'react'
import {useParams} from 'react-router-dom'
import DataContext from './DataContext.jsx'
import FilterContext from './FilterContext.jsx'

const ListContext = React.createContext({})

export function ListProvider({children}) {
    const {userId} = useParams()
    const {getEntryFromId,getNameFromId} = useContext(DataContext)
    const {filters, addFilters, removeFilters} = useContext(FilterContext)
    const expanded = filters.id

    const handleSetExpanded = useCallback((newValue, forceTab) => {
        const entry = getEntryFromId(newValue)

        if (newValue && newValue !== 'beltreqs') {
            const name = getNameFromId(newValue)
            const newTab = filters.tab === 'search' && !forceTab ? 'search' : entry.belt.replace(/\s\d/g, '')
            addFilters([
                {key: 'id', value: newValue},
                {key: 'name', value: name},
                {key: 'tab', value: userId ? undefined : newTab}
            ], true)
        } else if (newValue === 'beltreqs') {
            addFilters([
                {key: 'id', value: newValue},
                {key: 'name', value: undefined}
            ], true)
        } else {
            removeFilters(['id', 'name'])
        }
    }, [addFilters, filters.tab, getEntryFromId, getNameFromId, removeFilters, userId])

    const handleClearExpanded = useCallback(() => {
        removeFilters(['id', 'name'])
    }, [removeFilters])

    const handleSetTab = useCallback(tab => {
        addFilters([
            {key: 'tab', value: tab},
            {key: 'id', value: expanded === 'beltreqs' ? 'beltreqs' : undefined},
            {key: 'name', value: undefined}
        ], true)

    }, [addFilters, expanded])

    const value = useMemo(() => ({
        tab: filters.tab,
        setTab: handleSetTab,
        expanded,
        setExpanded: handleSetExpanded,
        clearExpanded: handleClearExpanded,
    }), [expanded, filters.tab, handleClearExpanded, handleSetExpanded, handleSetTab])

    return (
        <ListContext.Provider value={value}>
            {children}
        </ListContext.Provider>
    )
}

export default ListContext
