import React from 'react'
import Tracker from '../app/Tracker'
import Footer from '../nav/Footer'
import Nav from '../nav/Nav'

import ContactMain from './ContactMain.jsx'

function ContactRoute() {

    document.title = 'LPU Locks - Contact Us'

    return (
        <React.Fragment>

            <Nav title='Contact' route='co'/>
            <ContactMain/>
            <Footer/>
            <Tracker feature='contact'/>

        </React.Fragment>
    )
}

export default ContactRoute
