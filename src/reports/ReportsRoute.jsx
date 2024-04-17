import React from 'react'
import Tracker from '../app/Tracker'
import Footer from '../nav/Footer'
import Nav from '../nav/Nav'
import {LoadingProvider} from '../lockbazaarContext/LoadingContextLB'
import {FilterProvider} from '../context/FilterContext.jsx'
import {DataProvider} from '../lockbazaarContext/DataProviderLB.jsx'
import {ListProvider} from '../context/ListContext.jsx'
import {LBFilterFields} from '../data/filterFields'

import SiteReportMain from './SiteReportMain.jsx'

function ReportsRoute() {

    document.title = 'LPU Locks - Site Report'

    return (
        <LoadingProvider>
            <FilterProvider filterFields={LBFilterFields}>
                <DataProvider>
                    <ListProvider>
                        <Nav title='Site Report' route='rep'/>
                        <SiteReportMain/>
                        <Footer/>
                        <Tracker feature='sitereport'/>
                    </ListProvider>
                </DataProvider>
            </FilterProvider>
        </LoadingProvider>
    )
}

export default ReportsRoute
