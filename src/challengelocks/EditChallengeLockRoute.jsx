import React, {useCallback, useContext, useEffect, useRef, useState} from 'react'
import Footer from '../nav/Footer.jsx'
import Tracker from '../app/Tracker.jsx'
import usePageTitle from '../util/usePageTitle.jsx'
import SubmitChallengeLock from './SubmitChallengeLock.jsx'
import dayjs from 'dayjs'
import DBContextCL from './DBProviderCL.jsx'
import CheckIn from './CheckIn.jsx'
import {CLFilterFields} from '../data/filterFields.js'
import {ListProvider} from '../context/ListContext.jsx'
import {DataProvider} from './DataProviderCL.jsx'
import queryString from 'query-string'
import {FilterProvider} from '../context/FilterContext.jsx'

function EditChallengeLockRoute() {
    usePageTitle('Submit Challenge Lock')
    const {getCheckIn, getChallengeLock} = useContext(DBContextCL)

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

    console.log('entry', entry)

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
                        ? <SubmitChallengeLock entry={editEntry}/>
                        : checkIn
                            ? <CheckIn checkIn={editEntry}/>
                            : <div style={{color: 'red', textAlign: 'center', marginTop: 20}}>
                                Invalid ID.
                            </div>
                    }
                    <Footer/>
                    <Tracker feature='cl-edit'/>
                </ListProvider>
            </DataProvider>
        </FilterProvider>
    )
}

export default EditChallengeLockRoute