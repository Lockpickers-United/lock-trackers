import React, {useContext} from 'react'
import Tracker from '../app/Tracker'
import Footer from '../nav/Footer'
import usePageTitle from '../util/usePageTitle.jsx'
import CheckIn from './CheckIn.jsx'
import {CLFilterFields} from '../data/filterFields.js'
import {ListProvider} from '../context/ListContext.jsx'
import {DataProvider} from './DataProviderCL.jsx'
import {FilterProvider} from '../context/FilterContext.jsx'
import {useOutletContext} from 'react-router-dom'
import DBContext from '../app/DBContext.jsx'

export default function CheckInRoute() {

    usePageTitle('Check in Challenge Lock')

    const {profile} = useContext(DBContext)
    const {user} = useOutletContext()

    return (
        <FilterProvider filterFields={CLFilterFields}>
            <DataProvider>
                <ListProvider>
                    <CheckIn profile={profile} user={user}/>
                    <Footer/>
                    <Tracker feature='clCheckIn'/>
                </ListProvider>
            </DataProvider>
        </FilterProvider>
    )

}
