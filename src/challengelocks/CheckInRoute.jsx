import React from 'react'
import Tracker from '../app/Tracker'
import Footer from '../nav/Footer'
import Nav from '../nav/Nav'
import {CLFilterFields} from '../data/filterFields.js'
import {FilterProvider} from '../context/FilterContext.jsx'
import {DataProvider} from './DataProviderCL.jsx'
import usePageTitle from '../util/usePageTitle.jsx'
import {ListProvider} from '../context/ListContext.jsx'
import CheckIn from './CheckIn.jsx'


export default function CheckInRoute() {


    usePageTitle('Check in Challenge Lock')

    return (
            <FilterProvider filterFields={CLFilterFields}>
                <DataProvider>
                    <ListProvider>
                        <Nav title='Check in Challenge Lock' route='cl'/>
                        <CheckIn/>
                        <Footer/>
                        <Tracker feature='challengelocks'/>
                    </ListProvider>
                </DataProvider>
            </FilterProvider>
    )

}
