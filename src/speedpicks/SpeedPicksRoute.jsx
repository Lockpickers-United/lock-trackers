import React from 'react'
import Tracker from '../app/Tracker'
import Footer from '../nav/Footer'
import Nav from '../nav/Nav'

import {LocalizationProvider} from '@mui/x-date-pickers'
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs'

import Main from './Main.jsx'
import {DataProvider} from './DataContext.jsx'
import {SPListProvider} from './ListContext.jsx'
import {FilterProvider} from './FilterContext.jsx'
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
                            <Main/>

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
