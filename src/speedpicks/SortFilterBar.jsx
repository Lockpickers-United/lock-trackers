import React from 'react'
import {ToggleButton, ToggleButtonGroup} from '@mui/material'

function SortFilterBar() {

    return (
        <div style={{display: 'flex', margin: '6px 0px 26px 0px', opacity: 0.8}}>
            <div style={{textAlign: 'left'}}>
                <span style={{fontSize: '.7rem', marginRight: 5}}>SORT BY</span>
                <ToggleButtonGroup style={{height: 26, color: '#b00'}}>
                    <ToggleButton selected style={{padding: 7}} value={'lock'}>Lock</ToggleButton>
                    <ToggleButton style={{padding: 7}} value={'belt'}>Belt</ToggleButton>
                    <ToggleButton style={{padding: 7}} value={'picker'}>Picker</ToggleButton>
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