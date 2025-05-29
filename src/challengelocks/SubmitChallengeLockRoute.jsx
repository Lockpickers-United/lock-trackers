import React from 'react'
import Nav from '../nav/Nav.jsx'
import Footer from '../nav/Footer.jsx'
import Tracker from '../app/Tracker.jsx'
import usePageTitle from '../util/usePageTitle.jsx'
import {lockFilterFields} from '../data/filterFields'
import {FilterProvider} from '../context/FilterContext.jsx'
import SubmitChallengeLock from './SubmitChallengeLock.jsx'
import {DataProvider} from './DataProviderCL.jsx'

function SubmitChallengeLockRoute() {
    usePageTitle('Submit Challenge Lock')

    return (
        <FilterProvider filterFields={lockFilterFields}>
            <DataProvider>

                <React.Fragment>
                    <Nav title='Challenge Locks' route='cl'/>

                    <SubmitChallengeLock/>

                    <Footer/>
                    <Tracker feature='submitChallengeLock'/>
                </React.Fragment>
            </DataProvider>
        </FilterProvider>
    )
}

export default SubmitChallengeLockRoute