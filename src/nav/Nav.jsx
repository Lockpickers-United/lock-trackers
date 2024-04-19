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
import VersionCheckerLB from '../app/VersionCheckerLB.jsx'
import Tracker from '../app/Tracker.jsx'

function Nav({extras, route}) {
    return (
        <React.Fragment>
            <AppBar position='fixed' sx={{boxShadow: 'none'}}>
                <Toolbar>
                    <MainMenu/>

                    <div style={{
                        flexGrow: 1,
                        minWidth: 150,
                        fontWeight: 500,
                        fontSize: '1.5rem',
                        paddingLeft: 6,
                        display: 'flex'
                    }}>
                        <TopNav route={route}/>
                        <VersionCheckerCode/>

                        {route === 'lb' &&
                            <VersionCheckerLB/>
                        }
                    </div>

                    {extras}

                    {route === 'sp' &&
                        <React.Fragment>
                            <PendingChecker/>
                            <VersionChecker/>
                        </React.Fragment>
                    }
                    <UserMenu/>

                </Toolbar>
            </AppBar>

            {/* Dummy toolbar to help content place correctly below this */}
            <Toolbar style={{backgroundColor: 'rgba(255, 255, 255, 0.09)'}}/>

            <ScrollToTopButton/>
            <Tracker feature='nav'/>

        </React.Fragment>
    )
}

export default Nav
