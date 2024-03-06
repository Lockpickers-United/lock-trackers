import React from 'react'
import Footer from '../nav/Footer'
import Nav from '../nav/Nav'
import PrivacyPage from './PrivacyPage'

function PrivacyRoute() {

    document.title = 'Lock Trackers - Privacy Policy'

    return (
        <React.Fragment>
            <Nav title='Privacy Policy' route='priv'/>

            <PrivacyPage/>

            <Footer/>
        </React.Fragment>
    )
}

export default PrivacyRoute
