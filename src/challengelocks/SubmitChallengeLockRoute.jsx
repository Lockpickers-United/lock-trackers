import React from 'react'
import Footer from '../nav/Footer.jsx'
import Tracker from '../app/Tracker.jsx'
import usePageTitle from '../util/usePageTitle.jsx'
import SubmitChallengeLock from './SubmitChallengeLock.jsx'
import {CLFilterFields} from '../data/filterFields.js'
import {ListProvider} from '../context/ListContext.jsx'
import {FilterProvider} from '../context/FilterContext.jsx'
import {DataProvider} from './DataProviderCL.jsx'

function SubmitChallengeLockRoute() {
    usePageTitle('Submit Challenge Lock')

    return (
        <FilterProvider filterFields={CLFilterFields}>
            <DataProvider>
                <ListProvider>
                    <SubmitChallengeLock/>
                    <Footer/>
                    <Tracker feature='clSubmit'/>
                </ListProvider>
            </DataProvider>
        </FilterProvider>
    )
}

export default SubmitChallengeLockRoute