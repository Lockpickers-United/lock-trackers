import React, {useCallback, useContext} from 'react'
import Chip from '@mui/material/Chip'
import FilterContext from '../context/FilterContext'

function FilterChip({field, value, label = value, ...props}) {
    const {filters,addFilter} = useContext(FilterContext)

    const handleFilter = useCallback(event => {
        const filtersMap = new Map(Object.entries(filters))
        event.preventDefault()
        event.stopPropagation()
        if (filtersMap.get(field) !== value) {
            console.log(field, value)
            addFilter(field, value)
        }
        window.scrollTo({top: 0, behavior: 'smooth'})
    }, [addFilter, field, filters, value])

    return (
        <React.Fragment>
            <Chip
                clickable
                variant='outlined'
                label={label}
                style={{marginRight: 4, marginBottom: 4, lineHeight:1}}
                onClick={handleFilter}
                {...props}
            />
        </React.Fragment>
    )
}

export default FilterChip
