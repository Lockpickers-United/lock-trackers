import React, {useCallback, useContext, useMemo} from 'react'
import DataContext from '../app/DataContext.jsx'
import FilterContext from './FilterContext.jsx'

const ListContext = React.createContext({})

export function ListProvider({children}) {
    const {getNameFromId} = useContext(DataContext)
    const {filters, addFilters, removeFilters} = useContext(FilterContext)
    const expanded = filters.id

    const handleSetExpanded = useCallback((newValue) => {
        if (newValue && newValue !== 'beltreqs') {
            const name = getNameFromId(newValue)
            addFilters([
                {key: 'id', value: newValue},
                {key: 'name', value: name},
            ], true)
        } else if (newValue === 'beltreqs') {
            addFilters([
                {key: 'id', value: newValue},
                {key: 'name', value: undefined}
            ], true)
        } else {
            removeFilters(['id', 'name'])
        }
    }, [addFilters, getNameFromId, removeFilters])

    const handleClearExpanded = useCallback(() => {
        removeFilters(['id', 'name'])
    }, [removeFilters])

    const value = useMemo(() => ({
        expanded,
        setExpanded: handleSetExpanded,
        clearExpanded: handleClearExpanded,
    }), [expanded, handleClearExpanded, handleSetExpanded])

    return (
        <ListContext.Provider value={value}>
            {children}
        </ListContext.Provider>
    )
}

export default ListContext
