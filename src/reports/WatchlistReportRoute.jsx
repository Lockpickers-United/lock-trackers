import React, {useContext, useEffect} from 'react'
import Tracker from '../app/Tracker'
import Footer from '../nav/Footer'
import Nav from '../nav/Nav'
import {LoadingProvider} from '../lockbazaarContext/LoadingContextLB'
import {FilterProvider} from '../context/FilterContext.jsx'
import {DataProvider} from '../lockbazaarContext/DataProviderLB.jsx'
import {ListProvider} from '../context/ListContext.jsx'
import {LBFilterFields} from '../data/filterFields'

import WatchlistReportMain from './WatchlistReportMain.jsx'
import {useNavigate} from 'react-router-dom'
import AuthContext from '../app/AuthContext.jsx'
import DBContext from '../app/DBContext.jsx'

function ReportsRoute() {

    document.title = 'LPU Locks - Watchlist Report'

    const {authLoaded} = useContext(AuthContext)
    const {dbLoaded, admin} = useContext(DBContext)
    const navigate = useNavigate()
    useEffect(() => {
        if (authLoaded && dbLoaded && !admin) {
            navigate('/')
        }
    }, [admin, authLoaded, dbLoaded, navigate])

    return (
        <LoadingProvider>
            <FilterProvider filterFields={LBFilterFields}>
                <DataProvider>
                    <ListProvider>
                        <Nav title='Watchlist Report' route='rep'/>
                        <WatchlistReportMain/>
                        <Footer/>
                        <Tracker feature='watchlistreport'/>
                    </ListProvider>
                </DataProvider>
            </FilterProvider>
        </LoadingProvider>
    )
}

export default ReportsRoute
