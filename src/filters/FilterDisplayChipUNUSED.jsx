import React, {useCallback, useContext, useMemo} from 'react'
import FieldValue from '../util/FieldValue'
import Stack from '@mui/material/Stack'
import Chip from '@mui/material/Chip'
import FilterContext from '../context/FilterContext'

function FilterDisplayChipUNUSED() {
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
        <FieldValue name='Current Filters' style={{marginBottom: 0}} value={
            <Stack direction='row' spacing={0} sx={{flexWrap: 'wrap'}} style={{marginRight: -24}}>
                {filterValues.map(({key, value: filter}, index) =>
                    <Chip
                        key={index}
                        label={`${cleanChipLabel(filterFieldsByFieldName[key]?.label, filter)}`}
                        variant='outlined'
                        style={{marginRight: 4, marginBottom: 4}}
                        onDelete={handleDeleteFilter(key, filter)}
                    />
                )}
            </Stack>
        }/>
    )
}

export default FilterDisplayChipUNUSED
