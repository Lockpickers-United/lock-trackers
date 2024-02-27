import LinearProgress from '@mui/material/LinearProgress'
import React, {useContext} from 'react'
import AuthContext from '../app/AuthContext'
import DBContext from '../app/DBContext'
import Tracker from '../app/Tracker'
import Footer from '../nav/Footer'
import Nav from '../nav/Nav'
import lpuLogoPath from '../resources/LPU.png'
import CopyProfileLinkButton from './CopyProfileLinkButton'
import EditProfilePage from './EditProfilePage'
import MustBeLoggedIn from './MustBeLoggedIn'
import LoadingDisplay from '../util/LoadingDisplay.jsx'

function ProfileRoute() {
    const {authLoaded, isLoggedIn} = useContext(AuthContext)
    const {dbLoaded} = useContext(DBContext)

    const nav = (
        <React.Fragment>
            <CopyProfileLinkButton/>
        </React.Fragment>
    )

    return (
        <React.Fragment>
            <Nav title='Edit Profile' extras={nav}/>

            {(!authLoaded || !dbLoaded) &&
                <LoadingDisplay/>
            }

            {authLoaded && !isLoggedIn && <MustBeLoggedIn/>}
            {authLoaded && isLoggedIn && dbLoaded && <EditProfilePage/>}

            <Footer/>

            <Tracker feature='editprofile'/>
        </React.Fragment>
    )
}

export default ProfileRoute
