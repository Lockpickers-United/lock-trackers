import React from 'react'
import Tracker from '../app/Tracker'
import Footer from '../nav/Footer'
import Nav from '../nav/Nav'

import {LocalizationProvider} from '@mui/x-date-pickers'
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs'

import SPMain from './SPMain.jsx'
import {DataProvider} from './SPDataContext'
import {SPListProvider} from './SPListContext'
import {FilterProvider} from './SPFilterContext'
import ModModeCheckbox from './ModModeCheckbox.jsx'

function SpeedPicksRoute() {

    const nav = (<ModModeCheckbox/>)

    return (
        <React.Fragment>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DataProvider>
                    <FilterProvider>
                        <SPListProvider>

                            <Nav title='Speed Picks' extras={nav}/>
                            <SPMain/>

                        </SPListProvider>
                    </FilterProvider>
                </DataProvider>
            </LocalizationProvider>

            <Footer/>
            <Tracker feature='sp'/>
        </React.Fragment>
    )
}

export default SpeedPicksRoute
