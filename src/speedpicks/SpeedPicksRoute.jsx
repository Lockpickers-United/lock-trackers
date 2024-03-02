import React, {useContext} from 'react'
import Tracker from '../app/Tracker'
import Footer from '../nav/Footer'
import Nav from '../nav/Nav'
import Main from './Main.jsx'
import ModModeCheckbox from './ModModeCheckbox.jsx'

import {LocalizationProvider} from '@mui/x-date-pickers'
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs'
import {spFilterFields} from '../data/filterFields'
import DBContext from '../app/DBContext'
import {DataProvider} from '../context/DataProvider.jsx'
import {ListProvider} from './ListContext.jsx'
import {FilterProvider} from '../context/FilterContext.jsx'

import speedPickData from './speedPicks.json'

function SpeedPicksRoute() {

    const {lockCollection} = useContext(DBContext)

    const allEntries = speedPickData.data

    const nav = (<ModModeCheckbox/>)

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <FilterProvider filterFields={spFilterFields}>
                <DataProvider allEntries={allEntries} profile={lockCollection}>
                    <ListProvider>
                            <Nav title='Speed Picks' extras={nav}/>
                            <Main/>
                            <Footer/>
                            <Tracker feature='sp'/>
                    </ListProvider>
                </DataProvider>
            </FilterProvider>
        </LocalizationProvider>
    )
}

export default SpeedPicksRoute
