import React, {useContext} from 'react'
import {Outlet} from 'react-router-dom'
import AuthContext from '../app/AuthContext'
import LoadingDisplay from '../misc/LoadingDisplay.jsx'
import {LocalizationProvider} from '@mui/x-date-pickers'
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs'
import Nav from '../nav/Nav.jsx'

import {DBProvider} from '../app/DBContext.jsx'
import {DBProviderCL} from './DBProviderCL.jsx'

export default function ChallengeLocksParentRoute() {
    const {authLoaded, user} = useContext(AuthContext)

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DBProvider>
                <DBProviderCL>
                    <Nav title='Challenge Locks' route='cl'/>

                    {!authLoaded &&
                        <LoadingDisplay/>
                    }

                    {authLoaded && <Outlet context={{user}}/>}

                </DBProviderCL>
            </DBProvider>
        </LocalizationProvider>
    )
}
