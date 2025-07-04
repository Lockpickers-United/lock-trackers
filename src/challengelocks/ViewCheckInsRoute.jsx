import React, {useContext} from 'react'
import Tracker from '../app/Tracker'
import ViewCheckIns from './ViewCheckIns.jsx'
import usePageTitle from '../util/usePageTitle.jsx'
import {useOutletContext} from 'react-router-dom'
import Footer from '../nav/Footer.jsx'
import {DataProvider} from './DataProviderViewCheckIns.jsx'
import {CheckInFilterFields} from '../data/filterFields.js'
import {ListProvider} from '../context/ListContext.jsx'
import {FilterProvider} from '../context/FilterContext.jsx'
import DBContext from '../app/DBContext.jsx'

function ViewCheckInsRoute() {

    usePageTitle('LPU Locks - View Check-ins')

    const {profile} = useContext(DBContext)
    const {user} = useOutletContext()

    return (
        <FilterProvider filterFields={CheckInFilterFields}>
            <DataProvider>
                <ListProvider>
                    <ViewCheckIns profile={profile} user={user}/>
                    <Footer/>
                    <Tracker feature='clViewCheckIns'/>
                </ListProvider>
            </DataProvider>
        </FilterProvider>
    )

}

export default ViewCheckInsRoute
