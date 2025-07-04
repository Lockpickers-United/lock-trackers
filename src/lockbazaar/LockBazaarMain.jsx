import React, {useCallback, useContext} from 'react'
import useWindowSize from '../util/useWindowSize.jsx'

import EntriesLB from './EntriesLB.jsx'
import EntriesSkeletonLB from './EntriesSkeletonLB.jsx'

import LoadingContextLB from '../lockbazaarContext/LoadingContextLB.jsx'
import FilterContext from '../context/FilterContext.jsx'
import {useNavigate} from 'react-router-dom'
import SellerProfileInline from './SellerProfileInline.jsx'
import SortFilterBarLB from './SortFilterBarLB.jsx'
import DBContext from '../app/DBContext.jsx'
import SignInButton from '../auth/SignInButton'
import AuthContext from '../app/AuthContext.jsx'
import DataContext from '../context/DataContext.jsx'
import WatchlistAddLPUbeltsButton from './WatchlistAddLPUbeltsButton.jsx'
import MessageContext from '../app/MessageContext.jsx'
import Link from '@mui/material/Link'

function LockBazaarMain() {
    const {allDataLoaded, getSellerFromId} = useContext(LoadingContextLB)
    const {visibleEntries = []} = useContext(DataContext)
    const {profile} = useContext(DBContext)
    const {isLoggedIn} = useContext(AuthContext)
    const {filters} = useContext(FilterContext)
    const {systemMessage} = useContext(MessageContext)

    const watchlistView = !!filters && filters?.collection === 'Watchlist'

    const {width} = useWindowSize()
    const smallWindow = width <= 560
    const pagePadding = !smallWindow
        ? '8px 24px 32px 24px'
        : '8px 8px 32px 8px'

    const navigate = useNavigate()
    if (filters?.viewSeller) {
        if (getSellerFromId(filters.viewSeller)) {
            const sellerName = getSellerFromId(filters.viewSeller).username
            navigate(`/lockbazaar?sellerName=${sellerName}`)
        } else {
            navigate('/lockbazaar')
        }
    }

    const handleClick = useCallback(link => {
        navigate(link)
    }, [navigate])

    return (
        <div style={{
            minWidth: '320px', maxWidth: 720, height: '100%',
            padding: pagePadding, backgroundColor: '#223',
            marginLeft: 'auto', marginRight: 'auto',
            fontSize: '1.5rem', lineHeight: 0.8, textAlign: 'center'
        }}>

            {systemMessage}

            {(!Object.keys(filters).length && !systemMessage && !profile?.created) &&
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
            }

            {(watchlistView) &&
                <div style={{fontSize: '1.2rem', fontWeight: 600, marginBottom: 10, marginTop: 20, textAlign: 'left'}}>
                    Your Watchlist
                </div>
            }

            {filters.giftCertificates &&

                <div style={{}}>
                    <div style={{
                        fontSize: '1rem',
                        lineHeight: '1.3rem',
                        marginBottom: 10,
                        marginTop: 20,
                        textAlign: 'left'
                    }}>
                        <div style={{fontSize: '1.3rem', fontWeight: 700, marginBottom: 10}}>NEW! Rafl Gift
                            Certificates
                        </div>
                        Starting this year, people donating pots to
                        the <strong><a href={'https://lpubelts.com/#/rafl'}
                                       target='_blank'
                                       rel='noopener noreferrer'>LPU Charity Raffle</a></strong> have
                        the option of including &#34;Gift Certificates&#34; redeemable with select #lock-bazaar sellers.
                        Here&#39;s the list of all items available from sellers who currently accept
                        Gift Certificates. <Link onClick={() => handleClick('/rafl')}>Click here for the list of Gift Certificate sellers.</Link>
                    </div>

                </div>
            }


            {(isLoggedIn && watchlistView && (profile?.watchlist?.length === 0 || !profile?.watchlist)) &&
                <div style={{
                    fontSize: '1rem',
                    lineHeight: '1.2rem',
                    width: '100%',
                    textAlign: 'left',
                    marginTop: 10
                }}>
                    There aren&#39;t any available listings in your Watchlist. Click the heart icon in the details for
                    any lock to add it to your list.
                    Items you&#39;ve flagged will appear here.
                </div>
            }

            {(!isLoggedIn && watchlistView) &&
                <div style={{
                    fontSize: '1rem',
                    lineHeight: '1.2rem',
                    textAlign: 'left',
                    marginTop: 15,
                    marginBottom: 20,
                    display: 'flex'
                }}>
                    <div style={{marginTop: 9, marginRight: 15}}>You need to be signed in order to add items to a
                        watchlist.
                    </div>
                    <div style={{fontSize: '1rem', width: 200}}><SignInButton/></div>
                </div>
            }

            {filters.sellerName &&
                <SellerProfileInline/>
            }

            <SortFilterBarLB/>

            {(allDataLoaded && watchlistView) && <WatchlistAddLPUbeltsButton/>}

            {!allDataLoaded && <EntriesSkeletonLB/>}
            {allDataLoaded && <EntriesLB entries={visibleEntries}/>}

        </div>
    )
}

export default LockBazaarMain
