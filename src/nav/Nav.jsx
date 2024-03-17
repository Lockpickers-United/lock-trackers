import React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import VersionChecker from '../app/VersionChecker'
import MainMenu from './MainMenu'
import ScrollToTopButton from './ScrollToTopButton'
import UserMenu from './UserMenu'
import TopNav from './TopNav.jsx'
import PendingChecker from '../speedpicks/PendingChecker.jsx'
import VersionCheckerCode from '../app/VersionCheckerCode.jsx'

function Nav({extras, route}) {
    return (
        <React.Fragment>
            <AppBar position='fixed' sx={{boxShadow: 'none', backgroundColor:'#0b0017'}}>
                <Toolbar>
                    <MainMenu/>

                    <div style={{
                        flexGrow: 1,
                        minWidth:150,
                        fontWeight: 500,
                        fontSize: '1.5rem',
                        paddingLeft: 6,
                        display:'flex'
                    }}>
                        <TopNav route={route}/>
                        <VersionCheckerCode/>

                    </div>

                    {extras}

                    <PendingChecker/>
                    <VersionChecker/>
                    <UserMenu/>

                </Toolbar>
            </AppBar>

            {/* Dummy toolbar to help content place correctly below this */}
            <Toolbar style={{backgroundColor: 'rgba(255, 255, 255, 0.09)'}}/>

            <ScrollToTopButton/>
        </React.Fragment>
    )
}

export default Nav
