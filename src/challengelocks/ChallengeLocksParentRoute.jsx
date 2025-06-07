import React, {useCallback, useContext} from 'react'
import {Outlet} from 'react-router-dom'
import AuthContext from '../app/AuthContext'
import LoadingDisplay from '../misc/LoadingDisplay.jsx'
import Fade from '@mui/material/Fade'
import useData from '../util/useData.jsx'
import {FilterProvider} from '../context/FilterContext.jsx'
import {DataProvider} from './DataProviderCL.jsx'
import {ListProvider} from '../context/ListContext.jsx'
import {LocalizationProvider} from '@mui/x-date-pickers'
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs'
import SignInButton from '../auth/SignInButton.jsx'
import {CLFilterFields} from '../data/filterFields.js'
import Nav from '../nav/Nav.jsx'

import DBContextGlobal from '../app/DBContextGlobal'
import {DBProviderGlobal} from '../app/DBContextGlobal.jsx'

import {DBProviderCL} from './DBProviderCL.jsx'


export default function ChallengeLocksParentRoute() {
    const {authLoaded} = useContext(AuthContext)
    const {adminRole, getProfile} = useContext(DBContextGlobal)  //eslint-disable-line

    const {user} = useContext(AuthContext)
    const userId = user ? user.uid : null
    const loadFn = useCallback(async () => {
        if (!userId) return null
        try {
            return await getProfile(userId)
        } catch (ex) {
            console.error('Error loading profile.', ex)
            return null
        }
    }, [getProfile, userId])
    const {data = {}, loading, error} = useData({loadFn}) // eslint-disable-line
    const profile = data

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DBProviderGlobal>
                <DBProviderCL>
                    <FilterProvider filterFields={CLFilterFields}>
                        <DataProvider>
                            <ListProvider>
                                <Nav title='Challenge Locks' route='cl'/>

                                {!authLoaded &&
                                    <LoadingDisplay/>
                                }

                                {authLoaded && user && <Outlet context={{profile, user}}/>}

                                {authLoaded && !user &&
                                    <Fade in={true} timeout={1000}>
                                        <div style={{
                                            width: '350px', textAlign: 'center',
                                            padding: 50, marginTop: 100, backgroundColor: '#292929',
                                            marginLeft: 'auto', marginRight: 'auto',
                                            fontSize: '1.4rem', fontWeight: 700
                                        }}>
                                            You must be logged in to view this page.<br/><br/>
                                            <div style={{width: 210, marginLeft: 'auto', marginRight: 'auto'}}>
                                                <SignInButton/>
                                            </div>
                                        </div>
                                    </Fade>
                                }
                            </ListProvider>
                        </DataProvider>
                    </FilterProvider>
                </DBProviderCL>
            </DBProviderGlobal>
        </LocalizationProvider>
    )
}
