import React from 'react'
import Footer from '../nav/Footer.jsx'
import Tracker from '../app/Tracker.jsx'
import usePageTitle from '../util/usePageTitle.jsx'
import SubmitChallengeLock from './SubmitChallengeLock.jsx'

function SubmitChallengeLockRoute() {
    usePageTitle('Submit Challenge Lock')

    return (
        <React.Fragment>
            <SubmitChallengeLock/>
            <Footer/>
            <Tracker feature='clSubmit'/>
        </React.Fragment>
    )
}

export default SubmitChallengeLockRoute