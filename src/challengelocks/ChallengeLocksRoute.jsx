import React, {useContext} from 'react'
import Tracker from '../app/Tracker'
import ChallengeLocksMain from './ChallengeLocksMain.jsx'
import usePageTitle from '../util/usePageTitle.jsx'
import {useOutletContext} from 'react-router-dom'
import Footer from '../nav/Footer.jsx'
import {CLFilterFields} from '../data/filterFields.js'
import {ListProvider} from '../context/ListContext.jsx'
import {DataProvider} from './DataProviderCL.jsx'
import {FilterProvider} from '../context/FilterContext.jsx'
import DBContext from '../app/DBContext.jsx'

function ChallengeLocksRoute() {

    usePageTitle('LPU Locks - Challenge Locks')

    const {profile} = useContext(DBContext)
    const {user} = useOutletContext()

    return (
        <FilterProvider filterFields={CLFilterFields}>
            <DataProvider>
                <ListProvider>
                    <ChallengeLocksMain profile={profile} user={user}/>
                    <Footer/>
                    <Tracker feature='challengeLocks'/>
                </ListProvider>
            </DataProvider>
        </FilterProvider>
    )

}

export default ChallengeLocksRoute
