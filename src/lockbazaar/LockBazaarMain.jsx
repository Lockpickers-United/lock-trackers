import React, {useContext} from 'react'
import useWindowSize from '../util/useWindowSize.jsx'
import LoadingDisplay from '../util/LoadingDisplay.jsx'

import EntriesLB from './EntriesLB.jsx'
import LoadingContextLB from '../lockbazaarContext/LoadingContextLB.jsx'
import FilterContext from '../context/FilterContext.jsx'
import {useNavigate} from 'react-router-dom'

function LockBazaarMain() {
    const {allDataLoaded, getSellerFromId} = useContext(LoadingContextLB)
    const {filters} = useContext(FilterContext)

    const {width} = useWindowSize()
    const smallWindow = width <= 560
    const pagePadding = !smallWindow
        ? '8px 24px 32px 24px'
        : '8px 8px 32px 8px'

    const navigate = useNavigate()
    if (filters.viewSeller) {

        if (getSellerFromId(filters.viewSeller)) {
            const sellerName = getSellerFromId(filters.viewSeller).username
            navigate(`/lockbazaar?sellerName=${sellerName}`)
        } else {
            navigate('/lockbazaar')
        }
    }

    return (
        <div style={{
            minWidth: '320px', maxWidth: 800, height: '100%',
            padding: pagePadding, backgroundColor: '#223',
            marginLeft: 'auto', marginRight: 'auto',
            fontSize: '1.5rem', lineHeight: 0.8, textAlign: 'center'
        }}>

            {!allDataLoaded && <LoadingDisplay/>}
            {allDataLoaded && <EntriesLB/>}

        </div>
    )
}

export default LockBazaarMain
