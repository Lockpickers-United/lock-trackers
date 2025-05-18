import React, {useCallback, useContext, useMemo} from 'react'
import FilterContext from '../context/FilterContext'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'

function FilterDisplayToggleButtons() {
    const {filters, filterCount, removeFilter, filterFieldsByFieldName} = useContext(FilterContext)

    const handleDeleteFilter = useCallback((keyToDelete, valueToDelete) => () => {
        removeFilter(keyToDelete, valueToDelete)
    }, [removeFilter])

    const filterValues = useMemo(() => {
        const {search, id, tab, name, sort, image, ...rest} = filters
        return Object.keys(rest)
            .map(key => {
                const value = filters[key]
                return Array.isArray(value)
                    ? value.map(subValue => ({key, value: subValue}))
                    : {key, value}
            })
            .flat()
    }, [filters])

    const cleanChipLabel = useCallback((label, value) => {
        if (label === 'Belt') {
            if (value === 'Unranked') {
                return label
            } else if (value.includes('Black')) {
                return value.replace(/(Black)\s(\d+)/, '$1 Belt $2')
            } else {
                return value + ' Belt'
            }
        } else if (label === 'UL Group') {
            return 'Group ' + value
        }

        return value
    }, [])

    if (filterCount === 0) return null
    return (
        <ToggleButtonGroup style={{height: 26, marginTop: 10, marginLeft: 10}}>
            {filterValues.map(({key, value: filter}, index) =>
                <ToggleButton
                    key={index}
                    selected={true}
                    value={`${cleanChipLabel(filterFieldsByFieldName[key]?.label, filter)}`}
                    variant='outlined'
                    style={{padding: 7}}
                    onClick={handleDeleteFilter(key, filter)}
                >{cleanChipLabel(filterFieldsByFieldName[key]?.label, filter)}</ToggleButton>
            )}
        </ToggleButtonGroup>

    )
}

export default FilterDisplayToggleButtons
