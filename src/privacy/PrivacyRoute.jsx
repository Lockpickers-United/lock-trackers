import React from 'react'
import Footer from '../nav/Footer'
import Nav from '../nav/Nav'
import PrivacyPage from './PrivacyPage'
import Tracker from '../app/Tracker.jsx'

function PrivacyRoute() {

    document.title = 'LPU Locks - Privacy Policy'

    return (
        <React.Fragment>
            <Nav title='Privacy Policy' route='priv'/>

            <PrivacyPage/>

            <Footer/>
            <Tracker feature='privacy'/>

        </React.Fragment>
    )
}

export default PrivacyRoute
