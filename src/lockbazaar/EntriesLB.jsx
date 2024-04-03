import React, {useCallback, useContext, useDeferredValue, useState, useMemo} from 'react'
import useWindowSize from '../util/useWindowSize.jsx'
import DataContext from '../context/DataContext'
import ListContext from '../context/ListContext'
import {useTheme} from '@mui/material/styles'
import FilterContext from '../context/FilterContext.jsx'
import NoEntriesCardLB from './NoEntriesCardLB.jsx'
import EntryLB from './EntryLB.jsx'
import SortFilterBarLB from './SortFilterBarLB.jsx'
import SellerProfileInline from './SellerProfileInline.jsx'

function EntriesLB() {

    document.title = 'Lock Trackers - Lock Bazaar Browser'

    const {visibleEntries = []} = useContext(DataContext)
    const {expanded, setExpanded} = useContext(ListContext)
    const {filters} = useContext(FilterContext)

    const [updated, setUpdated] = useState(0)

    const entriesUpdate = useCallback(value => {
        setUpdated(value)
        console.log('entriesUpdate: ', updated)
    }, [updated])

    const defExpanded = useDeferredValue(expanded)

    const entries = useMemo(() => {
        // removed tab/search code
        return visibleEntries
    }, [visibleEntries])

console.log('entries', entries)

    const {width} = useWindowSize()
    const smallWindow = width <= 560
    const pagePadding = !smallWindow
        ? '8px 24px 32px 24px'
        : '8px 2px 32px 2px'

    const theme = useTheme()
    const background = theme.palette.mode === 'dark' ? '#223' : '#ffffff'

    return (
        <div style={{
            minWidth: '320px', maxWidth: 800, height: '100%',
            padding: pagePadding, backgroundColor: background,
            marginLeft: 'auto', marginRight: 'auto',
            fontSize: '1.5rem', lineHeight: 0.8
        }}>

            {!filters.sellerName &&
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

            <SortFilterBarLB/>
            {filters.sellerName &&
                <SellerProfileInline/>
            }

            {entries.map((entry) =>
                <EntryLB
                    key={entry.id}
                    entry={entry}
                    expanded={entry.id === defExpanded}
                    onExpand={setExpanded}
                    entriesUpdate={entriesUpdate}
                />
            )}

            {entries?.length === 0 &&
                <NoEntriesCardLB/>
            }
        </div>
    )
}

export default EntriesLB
