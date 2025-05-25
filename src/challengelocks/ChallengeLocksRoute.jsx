import React from 'react'
import Tracker from '../app/Tracker'
import Footer from '../nav/Footer'
import Nav from '../nav/Nav'
import ChallengeLocksCardsMain from './ChallengeLocksCardsMain.jsx'
import {LBFilterFields} from '../data/filterFields.js'
import {FilterProvider} from '../context/FilterContext.jsx'
import {DataProvider} from './DataProviderCL.jsx'
import usePageTitle from '../util/usePageTitle.jsx'

function ChallengeLocksRoute() {

    usePageTitle('Challenge Locks')

    return (
        <FilterProvider filterFields={LBFilterFields}>
            <DataProvider>

                <Nav title='Challenge Locks' route='cl'/>
                <ChallengeLocksCardsMain/>
                <Footer/>
                <Tracker feature='challengelocks'/>

            </DataProvider>
        </FilterProvider>
    )

}

export default ChallengeLocksRoute
