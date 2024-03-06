import React from 'react'
import Tracker from '../app/Tracker'
import Footer from '../nav/Footer'
import Nav from '../nav/Nav'

import ContactMain from './ContactMain.jsx'

function ContactRoute() {

    document.title = 'Lock Trackers - Contact Us'

    return (
        <React.Fragment>

            <Nav title='Contact' route='co'/>
            <ContactMain/>
            <Footer/>
            <Tracker feature='cl'/>

        </React.Fragment>
    )
}

export default ContactRoute
