import React from 'react'
import Tracker from '../app/Tracker'
import Footer from '../nav/Footer'
import Nav from '../nav/Nav'
import ImportMain from './ImportMain.jsx'

import {LoadingProvider} from '../lockbazaarContext/LoadingContextLB'
import {FilterProvider} from '../context/FilterContext.jsx'
import {DataProvider} from '../lockbazaarContext/DataProviderLB.jsx'
import {ListProvider} from '../context/ListContext.jsx'
import {LBFilterFields} from '../data/filterFields'
import {WatchlistProvider} from '../lockbazaarContext/WatchlistContextLB.jsx'


function LockBazaarRoute() {

    document.title = 'LPU Locks - Import LPUbelts Wishlist'

    return (
        <LoadingProvider>
            <FilterProvider filterFields={LBFilterFields}>
                <WatchlistProvider>
                    <DataProvider>
                        <ListProvider>
                            <Nav title='Import LPUbelts Wishlist' route='lb'/>
                            <ImportMain/>
                            <Footer/>
                            <Tracker feature='importWishlist'/>
                        </ListProvider>
                    </DataProvider>
                </WatchlistProvider>
            </FilterProvider>
        </LoadingProvider>

    )
}

export default LockBazaarRoute
