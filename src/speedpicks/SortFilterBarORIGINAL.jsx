import React, {useContext, useCallback, useState} from 'react'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import FilterContext from '../context/FilterContext'
import DataContext from '../app/DataContext.jsx'
import useWindowSize from '../util/useWindowSize.jsx'

function SortFilterBarORIGINAL({view, setView}) {

    const {isMod = []} = useContext(DataContext)
    const {filters, addFilter, clearFilters, setFilters} = useContext(FilterContext)
    const {sort} = filters

    const [highlight, setHighlight] = useState('all')
    if (filters?.status && highlight !== filters?.status) {
        setHighlight(filters?.status)
    } else if (filters?.isBest && highlight !== 'isBest') {
        setHighlight('isBest')
    } else if (!filters?.isBest && !filters?.status && highlight !== 'all') {
        setHighlight('all')
    }

    const [dateSort, setDateSort] = useState('')
    const dateSortText = sort === 'dateAsc'
        ? 'Date ⬆'
        : sort === 'dateDesc'
            ? 'Date ⬇'
            : 'Date'

    const handleSort = useCallback(value => () => {
        setTimeout(() => addFilter('sort', value, true), 0)
        setDateSort('')
    }, [addFilter])

    const handleDateSort = useCallback(value => () => {
        const newSort = value === 'dateDesc' ? 'dateAsc' : 'dateDesc'
        setDateSort(newSort)
        setTimeout(() => addFilter('sort', newSort, true), 0)
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
        setView('all')
    }, [clearFilters, setView])

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
            <div style={{textAlign: 'left', marginTop: 10}}>
                <span style={{fontSize: '.7rem', marginRight: 5}}>SORT</span>
                <ToggleButtonGroup style={{height: 26}}>
                    <ToggleButton selected={sort === 'lock' || !sort} style={{padding: 7}} value={'lock'}
                                  onClick={handleSort('lock')}>Lock</ToggleButton>
                    <ToggleButton selected={sort === 'belt'} style={{padding: 7}} value={'belt'}
                                  onClick={handleSort('belt')}>Belt</ToggleButton>
                    <ToggleButton selected={sort === 'totalTime'} style={{padding: 7}} value={'belt'}
                                  onClick={handleSort('totalTime')}>Pick Time</ToggleButton>
                    {!filters.pickerId &&
                        <ToggleButton selected={sort === 'picker'} style={{padding: 7}} value={'picker'}
                                      onClick={handleSort('picker')}>Picker</ToggleButton>
                    }
                    <ToggleButton selected={sort === 'dateAsc' || sort === 'dateDesc'} style={{padding: 7}}
                                  value={'date'}
                                  onClick={handleDateSort(dateSort)}>{dateSortText}</ToggleButton>
                </ToggleButtonGroup>
            </div>
            {!filters.pickerId &&
                <div style={{
                    textAlign: 'right', flexGrow: 1, marginTop: 10
                }}>
                    <span style={{fontSize: '.7rem', marginRight: 5}}>FILTER</span>
                    <ToggleButtonGroup style={{height: 26}}>
                        <ToggleButton selected={highlight === 'all'} style={{padding: 7}} value={'all'}
                                      onClick={handleClear}>All</ToggleButton>
                        <ToggleButton selected={highlight === 'isBest'} style={{padding: 7}} value={['isBest', 'true']}
                                      onClick={handleFilterFieldValue}>Fastest</ToggleButton>

                        {isMod && <ToggleButton selected={highlight === 'rejected'} style={{padding: 7}} value={['status', 'rejected']}
                                                onClick={handleFilterFieldValue}>Rejected</ToggleButton>}

                        {isMod && <ToggleButton selected={highlight === 'pending'} style={{padding: 7}} value={['status', 'pending']}
                                                onClick={handleFilterFieldValue}>Pending</ToggleButton>}
                    </ToggleButtonGroup>
                </div>
            }

            {filters.pickerId &&
                <div style={{
                    textAlign: 'right', flexGrow: 1, marginTop: 10
                }}>
                    <ToggleButtonGroup style={{height: 26}}>
                        <ToggleButton selected={view === 'all'} style={{padding: 7}} value={'all'}
                                      onClick={handleClear}>View All Entries</ToggleButton>
                    </ToggleButtonGroup>

                </div>
            }
        </div>
    )
}

export default SortFilterBarORIGINAL