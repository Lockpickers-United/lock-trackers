import React from 'react'
import Tracker from '../app/Tracker'
import ChallengeLocksMain from './ChallengeLocksMain.jsx'
import usePageTitle from '../util/usePageTitle.jsx'
import {useOutletContext} from 'react-router-dom'
import Footer from '../nav/Footer.jsx'

function ChallengeLocksRoute() {

    usePageTitle('Challenge Locks')

    const {profile, user} = useOutletContext()

    return (
        <React.Fragment>
            <ChallengeLocksMain profile={profile} user={user}/>
            <Footer/>
            <Tracker feature='challengelocks'/>
        </React.Fragment>
    )

}

export default ChallengeLocksRoute
