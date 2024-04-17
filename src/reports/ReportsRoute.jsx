import React from 'react'
import Tracker from '../app/Tracker'
import Footer from '../nav/Footer'
import Nav from '../nav/Nav'

import SiteReportMain from './SiteReportMain.jsx'

function ReportsRoute() {

    document.title = 'LPU Locks - Site Report'

    return (
        <React.Fragment>

            <Nav title='Site Report' route='rep'/>
            <SiteReportMain/>
            <Footer/>
            <Tracker feature='sitereport'/>

        </React.Fragment>
    )
}

export default ReportsRoute
