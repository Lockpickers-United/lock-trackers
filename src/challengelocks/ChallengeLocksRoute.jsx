import React from 'react'
import Tracker from '../app/Tracker'
import Footer from '../nav/Footer'
import Nav from '../nav/Nav'
import ChallengeLocksMain from './ChallengeLocksMain.jsx'
import {CLFilterFields} from '../data/filterFields.js'
import {FilterProvider} from '../context/FilterContext.jsx'
import {DataProvider} from './DataProviderCL.jsx'
import usePageTitle from '../util/usePageTitle.jsx'
import {ListProvider} from '../context/ListContext.jsx'
import {DBProviderCL} from './DBContextCL.jsx'

function ChallengeLocksRoute() {

    usePageTitle('Challenge Locks')

    return (
        <DBProviderCL>
            <FilterProvider filterFields={CLFilterFields}>
                <DataProvider>
                    <ListProvider>
                        <Nav title='Challenge Locks' route='cl'/>
                        <ChallengeLocksMain/>
                        <Footer/>
                        <Tracker feature='challengelocks'/>
                    </ListProvider>
                </DataProvider>
            </FilterProvider>
        </DBProviderCL>
    )

}

export default ChallengeLocksRoute
