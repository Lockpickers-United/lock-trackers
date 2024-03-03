import React, {useContext, useCallback, useState} from 'react'
import {ToggleButton, ToggleButtonGroup} from '@mui/material'
import FilterContext from '../context/FilterContext'
import DataContext from '../context/DataContext.jsx'
import useWindowSize from '../util/useWindowSize.jsx'

function SortFilterBar() {

    const {isMod = []} = useContext(DataContext)

    const {filters, addFilter, clearFilters, setFilters} = useContext(FilterContext)
    const {sort} = filters
    const [view, setView] = useState('all')
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
        const newSort = value === 'dateAsc' ? 'dateDesc' : 'dateAsc'
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
    }, [setFilters])

    const handleFilter = useCallback(event => {
        event.preventDefault()
        event.stopPropagation()
        const {value} = event.target
        setFilters({status: value})
        setView(value)
        window.scrollTo({top: 0, behavior: 'smooth'})
    }, [setFilters])

    const handleClear = useCallback(event => {
        event.preventDefault()
        event.stopPropagation()
        clearFilters()
        setView('all')
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
            <div style={{textAlign: 'left', marginTop:10}}>
                <span style={{fontSize: '.7rem', marginRight: 5}}>SORT</span>
                <ToggleButtonGroup style={{height: 26}}>
                    <ToggleButton selected={sort === 'lock' || !sort} style={{padding: 7}} value={'lock'}
                                  onClick={handleSort('lock')}>Lock</ToggleButton>
                    <ToggleButton selected={sort === 'belt'} style={{padding: 7}} value={'belt'}
                                  onClick={handleSort('belt')}>Belt</ToggleButton>
                    <ToggleButton selected={sort === 'picker'} style={{padding: 7}} value={'picker'}
                                  onClick={handleSort('picker')}>Picker</ToggleButton>
                    <ToggleButton selected={sort === 'dateAsc' || sort === 'dateDesc'} style={{padding: 7}} value={'date'}
                                  onClick={handleDateSort(dateSort)}>{dateSortText}</ToggleButton>
                </ToggleButtonGroup>
            </div>
            <div style={{
                textAlign: 'right', flexGrow: 1, marginTop:10
            }}>
                <span style={{fontSize: '.7rem', marginRight: 5}}>FILTER</span>
                <ToggleButtonGroup style={{height: 26}}>
                    <ToggleButton selected={view === 'all'} style={{padding: 7}} value={'all'}
                                  onClick={handleClear}>All</ToggleButton>
                    <ToggleButton selected={view === 'isBest'} style={{padding: 7}} value={['isBest', 'true']}
                                  onClick={handleFilterFieldValue}>Fastest</ToggleButton>
                    {isMod && <ToggleButton selected={view === 'approved'} style={{padding: 7}} value={'approved'}
                                            onClick={handleFilter}>Approved</ToggleButton>}
                    {isMod && <ToggleButton selected={view === 'pending'} style={{padding: 7}} value={'pending'}
                                            onClick={handleFilter}>Pending</ToggleButton>}
                </ToggleButtonGroup>
            </div>
        </div>
    )
}

export default SortFilterBar