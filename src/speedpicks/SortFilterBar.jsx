import React, {useContext, useCallback, useState} from 'react'
import {ToggleButton, ToggleButtonGroup} from '@mui/material'
import FilterContext from '../context/FilterContext'

function SortFilterBar() {

    const {filters, addFilter, clearFilters, setFilters} = useContext(FilterContext)
    const {sort} = filters
    const [view, setView] = useState('all')

    console.log(filters)
    const handleClick = useCallback(value => () => {
        setTimeout(() => addFilter('sort', value, true), 0)
    }, [addFilter])

    const [belt, setBelt] = useState('')
    const [status, setStatus] = useState('')

    const handleFilter2 = useCallback((field, value) => () => {
        if (field === 'belt') {
            setBelt(value)
        } else if (field === 'status') {
            setStatus(value)
        }
        console.log(status)
        console.log(field)
        console.log(value)
        setFilters({belt, status})
        setView(field)
        window.scrollTo({top: 0, behavior: 'smooth'})
    }, [belt, setFilters, status])


    const handleFilter = useCallback(event => {
        event.preventDefault()
        event.stopPropagation()
        console.log(event.target.value)
        const [field,value] = event.target.value.split(',')
        console.log(field)
        //setOpen(false)
        clearFilters()
        addFilter(field, value)
        //setView(field)
        window.scrollTo({top: 0, behavior: 'smooth'})
    }, [addFilter, clearFilters])


    const handleClear = useCallback(event => {
        event.preventDefault()
        event.stopPropagation()
        clearFilters()
        setStatus('')
        setBelt('')
        setView('all')
    }, [clearFilters])

    return (
        <div style={{display: 'flex', margin: '6px 0px 26px 0px', opacity: 0.8}}>
            <div style={{textAlign: 'left'}}>
                <span style={{fontSize: '.7rem', marginRight: 5}}>SORT</span>
                <ToggleButtonGroup style={{height: 26}}>
                    <ToggleButton selected={sort === 'lock' || !sort} style={{padding: 7}} value={'lock'}
                                  onClick={handleClick('lock')}>Lock</ToggleButton>
                    <ToggleButton selected={sort === 'belt'} style={{padding: 7}} value={'belt'}
                                  onClick={handleClick('belt')}>Belt</ToggleButton>
                    <ToggleButton selected={sort === 'picker'} style={{padding: 7}} value={'picker'}
                    >Picker</ToggleButton>
                </ToggleButtonGroup>
            </div>
            <div style={{
                textAlign: 'right', flexGrow: 1
            }}>
                <span style={{fontSize: '.7rem', marginRight: 5}}>FILTER</span>
                <ToggleButtonGroup style={{height: 26}}>
                    <ToggleButton selected={view === 'all'} style={{padding: 7}} value={'all'}
                                  onClick={handleClear}>All</ToggleButton>
                    <ToggleButton selected={view === 'belt'} style={{padding: 7}} value={['status', 'approved']}
                                  onClick={handleFilter}>Test</ToggleButton>
                    <ToggleButton style={{padding: 7}} value={'approved'}
                                  onClick={handleFilter2('status', 'approved')}>Approved</ToggleButton>
                    <ToggleButton style={{padding: 7}} value={'pending'}
                                  onClick={handleFilter2('status', 'pending')}>Pending</ToggleButton>
                </ToggleButtonGroup>
            </div>
        </div>

    )
}

export default SortFilterBar