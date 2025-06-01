import React from 'react'
import Tracker from '../app/Tracker'
import Footer from '../nav/Footer'
import usePageTitle from '../util/usePageTitle.jsx'
import CheckIn from './CheckIn.jsx'

export default function CheckInRoute() {

    usePageTitle('Check in Challenge Lock')

    return (
        <React.Fragment>
            <CheckIn/>
            <Footer/>
            <Tracker feature='clCheckIn'/>
        </React.Fragment>
    )

}
