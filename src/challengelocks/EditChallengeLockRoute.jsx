import React, {useCallback, useContext, useEffect, useRef, useState} from 'react'
import Footer from '../nav/Footer.jsx'
import Tracker from '../app/Tracker.jsx'
import usePageTitle from '../util/usePageTitle.jsx'
import SubmitChallengeLock from './SubmitChallengeLock.jsx'
import FilterContext from '../context/FilterContext.jsx'
import DataContext from '../context/DataContext.jsx'
import dayjs from 'dayjs'
import DBContextCL from './DBProviderCL.jsx'
import CheckIn from './CheckIn.jsx'

function EditChallengeLockRoute() {
    usePageTitle('Submit Challenge Lock')
    const {allEntries, getEntryFromId} = useContext(DataContext)
    const {getCheckIn} = useContext(DBContextCL)
    const {filters} = useContext(FilterContext)
    const id = filters.id

    const [lock, setLock] = useState(undefined)
    const [checkIn, setCheckIn] = useState(undefined)
    const [entry, setEntry] = useState(undefined)
    const [dataLoaded, setDataLoaded] = useState(false)
    const [editEntry, setEditEntry] = useState(undefined)

    const getEntities = useCallback(async () => {
        const thisLock = await getEntryFromId(id) || undefined
        setLock(thisLock)
        const thisCheckIn = await getCheckIn(id) || undefined
        setCheckIn(thisCheckIn)
        setEntry(thisLock || thisCheckIn || undefined)
        setDataLoaded(true)
    },[getCheckIn, getEntryFromId, id])

    const hasFetched = useRef(false)
    useEffect(() => {
        if (!hasFetched.current) {
            getEntities().then()
            hasFetched.current = true
        }
    }, [getEntities])

    console.log('entry', entry?.id)

    if (dataLoaded && allEntries.length > 0 && lock && !editEntry) {
        setEditEntry({
            ...entry,
            lockCreated: lock.lockCreated || lock.createdAt,
            originalLock: lock.originalMake || lock.originalLock,
            updatedAt: dayjs().toISOString(),
            username: lock.submittedBy?.username,
            usernamePlatform: lock.submittedBy?.usernamePlatform,
            userBelt: lock.submittedBy?.userBelt
        })
    } else if (dataLoaded && allEntries.length > 0 && checkIn && !editEntry) {
        setEditEntry({...entry})
    }

    return (
        <React.Fragment>
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
        </React.Fragment>
    )
}

export default EditChallengeLockRoute