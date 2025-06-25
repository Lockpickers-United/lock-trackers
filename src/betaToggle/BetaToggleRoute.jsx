import React from 'react'
import Footer from '../nav/Footer'
import Nav from '../nav/Nav'
import BetaToggle from './BetaToggle.jsx'

function BetaToggleRoute() {

    document.title = 'LPU Locks - Toggle Beta Features'

    return (
        <React.Fragment>

            <Nav title='Toggle Beta Features' route={undefined}/>
            <BetaToggle/>
            <Footer/>

        </React.Fragment>
    )
}

export default BetaToggleRoute
