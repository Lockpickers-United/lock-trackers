import React from 'react'
import Tracker from '../app/Tracker'
import Footer from '../nav/Footer'
import Nav from '../nav/Nav'

import {LoadingProvider} from '../lockbazaarContext/LoadingContextLB'
import {FilterProvider} from '../context/FilterContext.jsx'
import {DataProvider} from '../lockbazaarContext/DataProviderLB.jsx'
import {ListProvider} from '../context/ListContext.jsx'
import {LBFilterFields} from '../data/filterFields'
import LockBazaarSellersMain from './LockBazaarSellersMain.jsx'


function LockBazaarSellersRoute() {

    document.title = 'LPU Locks - Lock Bazaar Sellers'

    return (
        <LoadingProvider>
            <FilterProvider filterFields={LBFilterFields}>
                <DataProvider>
                    <ListProvider>
                        <Nav title='Lock Bazaar Sellers' route='lbs'/>
                        <LockBazaarSellersMain/>
                        <Footer/>
                        <Tracker feature='lockbazaar'/>
                    </ListProvider>
                </DataProvider>
            </FilterProvider>
        </LoadingProvider>

    )
}

export default LockBazaarSellersRoute
