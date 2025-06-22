import React, {useContext} from 'react'
import Footer from '../nav/Footer.jsx'
import Tracker from '../app/Tracker.jsx'
import usePageTitle from '../util/usePageTitle.jsx'
import SubmitChallengeLock from './SubmitChallengeLock.jsx'
import {CLFilterFields} from '../data/filterFields.js'
import {ListProvider} from '../context/ListContext.jsx'
import {FilterProvider} from '../context/FilterContext.jsx'
import {DataProvider} from './DataProviderCL.jsx'
import {useOutletContext} from 'react-router-dom'
import DBContext from '../app/DBContext.jsx'

function SubmitChallengeLockRoute() {

    usePageTitle('LPU Locks - Submit Challenge Lock')

    const {profile} = useContext(DBContext)
    const {user} = useOutletContext()

    return (
        <FilterProvider filterFields={CLFilterFields}>
            <DataProvider>
                <ListProvider>
                    <SubmitChallengeLock profile={profile} user={user}/>
                    <Footer/>
                    <Tracker feature='clSubmit'/>
                </ListProvider>
            </DataProvider>
        </FilterProvider>
    )
}

export default SubmitChallengeLockRoute