import React from 'react'
import Tracker from '../app/Tracker'
import Footer from '../nav/Footer'
import Nav from '../nav/Nav'

import CLMain from './CLMain.jsx'

function ChallengeLocksRoute() {

    return (
        <React.Fragment>

            <Nav title='Challenge Locks' route='cl'/>
            <CLMain/>
            <Footer/>
            <Tracker feature='cl'/>

        </React.Fragment>
    )
}

export default ChallengeLocksRoute
