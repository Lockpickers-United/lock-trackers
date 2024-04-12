import React from 'react'
import Tracker from '../app/Tracker'
import Footer from '../nav/Footer'
import Nav from '../nav/Nav'
import Main from './Main.jsx'

import {LocalizationProvider} from '@mui/x-date-pickers'
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs'
import {spFilterFields} from '../data/filterFields'
import {DataProvider} from '../context/DataProvider.jsx'
import {ListProvider} from '../context/ListContext.jsx'
import {FilterProvider} from '../context/FilterContext.jsx'
import {LoadingProvider} from '../context/LoadingContext.jsx'
import {DBSPProvider} from './DBContextSP.jsx'

function SpeedPicksRoute() {

    const nav = null

    document.title = 'LPU Locks - Speed Picks'

    return (
        <DBSPProvider>
            <LoadingProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <FilterProvider filterFields={spFilterFields}>
                        <DataProvider>
                            <ListProvider>
                                <Nav title='Speed Picks' extras={nav} route='sp'/>
                                <Main/>
                                <Footer/>
                                <Tracker feature='speedpicks'/>
                            </ListProvider>
                        </DataProvider>
                    </FilterProvider>
                </LocalizationProvider>
            </LoadingProvider>
        </DBSPProvider>
    )
}

export default SpeedPicksRoute
