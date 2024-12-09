import React from 'react'
import {LoadingProvider} from '../lockbazaarContext/LoadingContextLB'
import {FilterProvider} from '../context/FilterContext.jsx'
import {DataProvider} from '../lockbazaarContext/DataProviderLB.jsx'
import {ListProvider} from '../context/ListContext.jsx'
import {LBFilterFields} from '../data/filterFields'
import {WatchlistProvider} from '../lockbazaarContext/WatchlistContextLB.jsx'
import {MessageProvider} from '../lockbazaarContext/MessageProviderLB.jsx'

import Tracker from '../app/Tracker'
import Footer from '../nav/Footer'
import Nav from '../nav/Nav'
import RaflPage from './RaflPage.jsx'


function RaflRoute() {

    document.title = 'LPU Locks - RAFL Gift Certificates'

    return (
        <LoadingProvider>
            <FilterProvider filterFields={LBFilterFields}>
                <WatchlistProvider>
                    <DataProvider>
                        <MessageProvider>
                            <ListProvider>
                                <Nav title='Lock Bazaar' route='lb'/>
                                <RaflPage/>
                                <Footer/>
                                <Tracker feature='lockbazaar'/>
                            </ListProvider>
                        </MessageProvider>
                    </DataProvider>
                </WatchlistProvider>
            </FilterProvider>
        </LoadingProvider>
    )
}

export default RaflRoute
