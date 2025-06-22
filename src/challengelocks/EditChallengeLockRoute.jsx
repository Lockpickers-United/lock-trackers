import React, {useCallback, useContext, useEffect, useRef, useState} from 'react'
import Footer from '../nav/Footer.jsx'
import Tracker from '../app/Tracker.jsx'
import usePageTitle from '../util/usePageTitle.jsx'
import SubmitChallengeLock from './SubmitChallengeLock.jsx'
import dayjs from 'dayjs'
import CheckIn from './CheckIn.jsx'
import {CLFilterFields} from '../data/filterFields.js'
import {ListProvider} from '../context/ListContext.jsx'
import {DataProvider} from './DataProviderCL.jsx'
import queryString from 'query-string'
import {FilterProvider} from '../context/FilterContext.jsx'
import {useOutletContext} from 'react-router-dom'
import DataContext from '../context/DataContext.jsx'
import Dialog from '@mui/material/Dialog'
import SignInButton from '../auth/SignInButton.jsx'
import AuthContext from '../app/AuthContext.jsx'
import DBContext from '../app/DBContext.jsx'
import DBContextCL from './DBProviderCL.jsx'

function EditChallengeLockRoute() {

    const {profile} = useContext(DBContext)
    const {user} = useOutletContext()
    const {authLoaded} = useContext(AuthContext)
    const {getCheckIn, getChallengeLock} = useContext(DBContextCL)
    const {isMod} = useContext(DataContext)

    const searchString = window.location.hash.replace(/^#.*\?/, '')
    const {id} = queryString.parse(searchString)

    const [lock, setLock] = useState(undefined)
    const [checkIn, setCheckIn] = useState(undefined)
    const [entry, setEntry] = useState(undefined)
    const [dataLoaded, setDataLoaded] = useState(false)
    const [editEntry, setEditEntry] = useState(undefined)

    const getEntities = useCallback(async () => {
        const thisLock = await getChallengeLock(id) || undefined
        setLock(thisLock)
        const thisCheckIn = await getCheckIn(id) || undefined
        setCheckIn(thisCheckIn)
        setEntry(thisLock || thisCheckIn || undefined)
        setDataLoaded(true)
    }, [getCheckIn, getChallengeLock, id])

    const hasFetched = useRef(false)
    useEffect(() => {
        if (!hasFetched.current) {
            getEntities().then()
            hasFetched.current = true
        }
    }, [getEntities])

    usePageTitle(`Edit ${lock ? 'Challenge Lock' : 'Check-in'} `)

    if (dataLoaded && lock && !editEntry) {
        setEditEntry({
            ...entry,
            lockCreated: lock.lockCreated || lock.createdAt,
            originalLock: lock.originalMake || lock.originalLock,
            updatedAt: dayjs().toISOString(),
            username: lock.submittedBy?.username,
            usernamePlatform: lock.submittedBy?.usernamePlatform,
            userBelt: lock.submittedBy?.userBelt
        })
    } else if (dataLoaded && checkIn && !editEntry) {
        setEditEntry({...entry})
    }

    return (
        <FilterProvider filterFields={CLFilterFields}>
            <DataProvider>
                <ListProvider>
                    {lock
                        ? <SubmitChallengeLock entry={editEntry} profile={profile} user={user}/>
                        : checkIn
                            ? <CheckIn checkIn={editEntry} profile={profile} user={user}/>
                            : <div style={{color: 'red', textAlign: 'center', marginTop: 20}}>
                                Invalid ID.
                            </div>
                    }
                    <Footer/>

                    <Dialog open={authLoaded && !user && !isMod}
                            componentsProps={{backdrop: {style: {backgroundColor: '#000', opacity: 0.6}}}}>
                        <div style={{
                            width: '350px', textAlign: 'center',
                            padding: 50, marginTop: 0, backgroundColor: '#292929',
                            marginLeft: 'auto', marginRight: 'auto',
                            fontSize: '1.4rem', fontWeight: 700
                        }}>
                            You are not authorized to edit images.<br/><br/>
                            <div style={{width: 210, marginLeft: 'auto', marginRight: 'auto'}}>
                                <SignInButton/>
                            </div>
                        </div>
                    </Dialog>

                    <Tracker feature='clEdit'/>
                </ListProvider>
            </DataProvider>
        </FilterProvider>
    )
}

export default EditChallengeLockRoute