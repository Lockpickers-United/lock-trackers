import React, {useContext} from 'react'
import Tracker from '../app/Tracker'
import Footer from '../nav/Footer'
import Nav from '../nav/Nav'

import {LocalizationProvider} from '@mui/x-date-pickers'
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs'

import CLMain from './CLMain.jsx'


function ChallengeLocksRoute() {

    return (
            <LocalizationProvider dateAdapter={AdapterDayjs}>

                            <Nav title='Challenge Locks'/>
                            <CLMain/>
                            <Footer/>
                            <Tracker feature='cl'/>

            </LocalizationProvider>
    )
}

export default ChallengeLocksRoute
