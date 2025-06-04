import React, {useContext} from 'react'
import Footer from '../nav/Footer.jsx'
import Tracker from '../app/Tracker.jsx'
import usePageTitle from '../util/usePageTitle.jsx'
import SubmitChallengeLock from './SubmitChallengeLock.jsx'
import FilterContext from '../context/FilterContext.jsx'
import DataContext from '../context/DataContext.jsx'
import dayjs from 'dayjs'

function SubmitChallengeLockRoute() {
    usePageTitle('Submit Challenge Lock')
    const {allEntries, getEntryFromId} = useContext(DataContext)

    const {filters} = useContext(FilterContext)
    const lockId = filters.id
    const lock = getEntryFromId(lockId) || {}
    const notValidLock = (Object.keys(allEntries).length > 0 && Object.keys(lock).length === 0)

    const entry = {
        id: lockId,
        name: lock.name,
        maker: lock.maker,
        description: lock.description,
        lockCreated: lock.lockCreated || lock.createdAt,
        country: lock.country,
        lockFormat: lock.lockFormat,
        lockingMechanism: lock.lockingMechanism,
        originalLock: lock.originalMake || lock.originalLock,
        approximateBelt: lock.approximateBelt,
        dateSubmitted: lock.dateSubmitted,
        updatedAt: dayjs().toISOString(),
        username: lock.submittedBy?.username,
        usernamePlatform: lock.submittedBy?.usernamePlatform,
        userBelt: lock.submittedBy?.userBelt,
    }

    return (
        <React.Fragment>
            {notValidLock
                ? <div style={{color: 'red', textAlign: 'center', marginTop: 20}}>
                    Invalid lock ID.
                </div>
                : <SubmitChallengeLock entry={entry}/>
            }
            <Footer/>
            <Tracker feature='clSubmit'/>
        </React.Fragment>
    )
}

export default SubmitChallengeLockRoute