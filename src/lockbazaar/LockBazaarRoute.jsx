import React from 'react'
import Tracker from '../app/Tracker'
import Footer from '../nav/Footer'
import Nav from '../nav/Nav'
import LockBazaarMain from './LockBazaarMain.jsx'

import {LoadingProvider} from '../lockbazaarContext/LoadingContextLB'
import {FilterProvider} from '../context/FilterContext.jsx'
import {DataProvider} from '../lockbazaarContext/DataProviderLB.jsx'
import {ListProvider} from '../context/ListContext.jsx'
import {LBFilterFields} from '../data/filterFields'


function ChallengeLocksRoute() {

    document.title = 'Lock Trackers - Lock Bazaar Browser'

    return (
        <LoadingProvider>
            <FilterProvider filterFields={LBFilterFields}>
                <DataProvider>
                    <ListProvider>
                        <Nav title='Lock Bazaar' route='lb'/>
                        <LockBazaarMain/>
                        <Footer/>
                        <Tracker feature='lockbazaar'/>
                    </ListProvider>
                </DataProvider>
            </FilterProvider>
        </LoadingProvider>

    )
}

export default ChallengeLocksRoute
