import React, {useContext, useCallback, useState, useMemo} from 'react'
import {ToggleButton, ToggleButtonGroup} from '@mui/material'
import FilterContext from '../context/FilterContext'
import useWindowSize from '../util/useWindowSize.jsx'
import FilterButton from '../filters/FilterButton.jsx'
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import Badge from '@mui/material/Badge'
import FilterAltIcon from '@mui/icons-material/FilterAlt.js'

function SortFilterBar({view, setView}) {

    const {
        filters,
        addFilter,
        clearFilters,
        setFilters,
        filterCount,
        removeFilter,
        filterFieldsByFieldName
    } = useContext(FilterContext)

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
            }
            if (value.includes('Black')) {
                return value.replace(/(Black)\s(\d+)/, '$1 Belt $2')
            } else {
                return value + ' Belt'
            }
        }
        return value
    }, [])


    const {sort} = filters

    const clearFiltersDisabled = !filterCount
    const clearFiltersColor = !filterCount ? '#777' : '#4db013'

    const [highlight, setHighlight] = useState('all')
    if (filters?.status && highlight !== filters?.status) {
        setHighlight(filters?.status)
    } else if (filters?.isBest && highlight !== 'isBest') {
        setHighlight('isBest')
    } else if (!filters?.isBest && !filters?.status && highlight !== 'all') {
        setHighlight('all')
    }

    const handleSort = useCallback(value => () => {
        setTimeout(() => addFilter('sort', value, true), 0)
    }, [addFilter])

    const handleFilterFieldValue = useCallback(event => {
        event.preventDefault()
        event.stopPropagation()
        console.log(event.target.value)
        const [field, value] = event.target.value.split(',')
        if (field === 'status') {
            setFilters({status: value})
            setView(value)
        } else if (field === 'isBest') {
            setView('isBest')
            setFilters({isBest: value})
        }
        window.scrollTo({top: 0, behavior: 'smooth'})
    }, [setFilters, setView])

    const handleClear = useCallback(event => {
        event.preventDefault()
        event.stopPropagation()
        clearFilters()
    }, [clearFilters])

    const {width} = useWindowSize()
    const mobileLarge428 = width <= 428

    const divStyle = {
        margin: '16px 0px 26px 0px', opacity: 0.8
    }
    const divFlexStyle = !mobileLarge428 ? {display: 'flex'} : {}
    const combinedDivStyle = {
        ...divStyle,
        ...divFlexStyle
    }

    return (
        <div style={combinedDivStyle}>
            <div style={{textAlign: 'left'}}>
                <span style={{fontSize: '.7rem', marginRight: 5}}>SORT</span>
                <ToggleButtonGroup style={{height: 26, marginTop: 10}}>
                    <ToggleButton selected={sort === 'lock' || !sort} style={{padding: 7}} value={'lock'}
                                  onClick={handleSort('lock')}>Lock</ToggleButton>
                    <ToggleButton selected={sort === 'belt'} style={{padding: 7}} value={'belt'}
                                  onClick={handleSort('belt')}>Belt</ToggleButton>
                </ToggleButtonGroup>
            </div>
            <div style={{textAlign: 'right', flexGrow: 1}}>
                {filterCount > 0 &&
                    <div>
                        <span style={{fontSize: '.7rem', marginRight: 5}}>FILTER</span>
                        <ToggleButtonGroup style={{height: 26, marginTop: 10}}>
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
                        <FilterButton/>
                    </div>
                }
                {filterCount === 0 &&
                    <div>
                        <FilterButton/>
                    </div>
                }
            </div>
        </div>
    )
}

export default SortFilterBar