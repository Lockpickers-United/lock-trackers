import React, {useContext, useCallback, useState, useMemo} from 'react'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import FilterContext from '../context/FilterContext'
import useWindowSize from '../util/useWindowSize.jsx'
import FilterButton from '../filters/FilterButton.jsx'
import AdminFilterButton from '../filters/AdminFilterButton.jsx'
import DataContext from '../app/DataContext.jsx'
import SortButton from './SortButton.jsx'
import SearchBox from '../nav/SearchBox.jsx'

function SortFilterBarSP() {

    const {isMod = []} = useContext(DataContext)

    const {
        filters,
        filterCount,
        removeFilter,
        removeFilters,
        filterFieldsByFieldName
    } = useContext(FilterContext)

    const handleDeleteFilter = useCallback((keyToDelete, valueToDelete) => () => {
        removeFilter(keyToDelete, valueToDelete)
        keyToDelete === 'sellerName' && removeFilters(['id'])
    }, [removeFilter, removeFilters])

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
        if (label === 'UNUSED') {
            if (value === 'Unranked') {
                return label
            }
            if (value.includes('Black')) {
                return value.replace(/(Black)\s(\d+)/, '$1 Belt $2')
            } else {
                return value + ' Belt'
            }
        }
        return value
    }, [])

    const [highlight, setHighlight] = useState('all')
    if (filters?.status && highlight !== filters?.status) {
        setHighlight(filters?.status)
    } else if (filters?.isBest && highlight !== 'isBest') {
        setHighlight('isBest')
    } else if (!filters?.isBest && !filters?.status && highlight !== 'all') {
        setHighlight('all')
    }

    const {width} = useWindowSize()
    const mobileLarge428 = width <= 428

    const divStyle = {
        margin: '16px 0px 10px 0px', opacity: 0.8
    }
    const divFlexStyle = !mobileLarge428 ? {display: 'flex'} : {}
    const combinedDivStyle = {
        ...divStyle,
        ...divFlexStyle
    }

    return (
        <div style={combinedDivStyle}>
            <div style={{textAlign: 'left', marginTop: 10, flexGrow: 1}}>
                <SearchBox label='Speedpicks'/>
            </div>
            <div style={{justifyContent: 'right', display: 'flex'}}>
                <SortButton/>
                {filterCount > 0 &&
                        <div>
                            <FilterButton/>
                            <ToggleButtonGroup style={{height: 26, marginTop: 10, marginLeft:10}}>
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
                            {isMod &&
                                <AdminFilterButton/>
                            }
                        </div>
                }
                {filterCount === 0 &&
                    <div>
                        <FilterButton/>
                        {isMod &&
                            <AdminFilterButton/>
                        }
                    </div>
                }
            </div>
        </div>
    )
}

export default SortFilterBarSP