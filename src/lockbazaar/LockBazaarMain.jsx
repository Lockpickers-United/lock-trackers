import React, {useContext} from 'react'
import useWindowSize from '../util/useWindowSize.jsx'

import EntriesLB from './EntriesLB.jsx'
import EntriesSkeletonLB from './EntriesSkeletonLB.jsx'

import LoadingContextLB from '../lockbazaarContext/LoadingContextLB.jsx'
import FilterContext from '../context/FilterContext.jsx'
import {useNavigate} from 'react-router-dom'
import SellerProfileInline from './SellerProfileInline.jsx'
import SortFilterBarLB from './SortFilterBarLB.jsx'
import SearchBox from '../nav/SearchBox.jsx'

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
            minWidth: '320px', maxWidth: 720, height: '100%',
            padding: pagePadding, backgroundColor: '#223',
            marginLeft: 'auto', marginRight: 'auto',
            fontSize: '1.5rem', lineHeight: 0.8, textAlign: 'center'
        }}>

            {!Object.keys(filters).length &&
                <React.Fragment>
                    <div style={{
                        fontSize: '1rem',
                        lineHeight: '1.2rem',
                        width: '100%',
                        textAlign: 'left',
                        marginTop: 10
                    }}>
                        These are user submitted lists of items for sale in
                        the <a href={'https://discord.com/channels/140129091796992000/1109656237269860383'}
                               target='_blank'
                               rel='noopener noreferrer'>
                        <nobr>#lock-bazaar</nobr>
                    </a> channel on the Lockpickers United discord server.
                        We are not vouching for the sellers, please take appropriate precautions as you would with any
                        bazaar purchase.
                        You&apos;ll find some handy tips for safe purchases
                        in <a href={'https://discord.com/channels/140129091796992000/1111777295942828084'}
                              target='_blank'
                              rel='noopener noreferrer'>this post</a>.
                        Sellers maintain &mdash; and are solely responsible for &mdash; all listings.
                    </div>
                </React.Fragment>
            }

            {filters.sellerName &&
                <SellerProfileInline/>
            }

            <SortFilterBarLB/>

            <SearchBox label='Listings'/>

            {!allDataLoaded && <EntriesSkeletonLB/>}
            {allDataLoaded && <EntriesLB/>}

        </div>
    )
}

export default LockBazaarMain
