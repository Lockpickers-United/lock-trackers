import React, {useContext, useCallback} from 'react'
import {ToggleButton, ToggleButtonGroup} from '@mui/material'
import FilterContext from '../context/FilterContext'

function SortFilterBar() {

    const {filters, addFilter} = useContext(FilterContext)
    const {sort} = filters

    const handleClick = useCallback(value => () => {
        setTimeout(() => addFilter('sort', value, true), 0)
    }, [addFilter])

    return (
        <div style={{display: 'flex', margin: '6px 0px 26px 0px', opacity: 0.8}}>
            <div style={{textAlign: 'left'}}>
                <span style={{fontSize: '.7rem', marginRight: 5}}>SORT</span>
                <ToggleButtonGroup style={{height: 26, color: '#b00'}}>
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
                    <ToggleButton selected style={{padding: 7}} value={'all'}>All</ToggleButton>
                    <ToggleButton style={{padding: 7}} value={'fastest'}>Fastest</ToggleButton>
                    <ToggleButton style={{padding: 7}} value={'approved'}>Approved</ToggleButton>
                    <ToggleButton style={{padding: 7}} value={'pending'}>Pending</ToggleButton>
                </ToggleButtonGroup>
            </div>
        </div>

    )
}

export default SortFilterBar