import React from 'react'
import Tracker from '../app/Tracker'
import Footer from '../nav/Footer'
import Nav from '../nav/Nav'

import CLMain from './CLMain.jsx'

function ChallengeLocksRoute() {

    document.title = 'LPU Locks - Challenge Locks'

    return (
        <React.Fragment>

            <Nav title='Challenge Locks' route='cl'/>
            <CLMain/>
            <Footer/>
            <Tracker feature='challengelocks'/>

        </React.Fragment>
    )
}

export default ChallengeLocksRoute
