import React, {useCallback, useContext, useDeferredValue, useState, useMemo} from 'react'
import useWindowSize from '../util/useWindowSize.jsx'
import DataContext from '../app/DataContext.jsx'
import ListContext from '../context/ListContext.jsx'
import Entry from './Entry.jsx'
import NewEntry from './NewEntry.jsx'
import SortFilterBarSP from './SortFilterBarSP.jsx'
import {useTheme} from '@mui/material/styles'
import ViewProfileInline from '../profile/ViewProfileInline.jsx'
import FilterContext from '../context/FilterContext.jsx'
import NoEntriesCard from './NoEntriesCard.jsx'

function Entries() {

    const {bestTimes, visibleEntries = []} = useContext(DataContext)
    const {expanded, setExpanded} = useContext(ListContext)
    const {filters} = useContext(FilterContext)

    const [view, setView] = useState('all')
    const [updated, setUpdated] = useState(0)

    const entriesUpdate = useCallback(value => {
        setUpdated(value)
        console.log('entriesUpdate: ', updated)
    }, [updated])

    const defExpanded = useDeferredValue(expanded)

    if (!filters.pickerId) document.title = 'LPU Locks - Speed Picks'

    const entries = useMemo(() => {
        // removed tab/search code
        return visibleEntries
    }, [visibleEntries])

    const {width} = useWindowSize()
    const smallWindow = width <= 560
    const pagePadding = !smallWindow
        ? '24px 24px 32px 24px'
        : '8px 8px 32px 8px'

    const theme = useTheme()
    const background = theme.palette.mode === 'dark' ? '#223' : '#ffffff'

    return (
        <React.Fragment>
            <div style={{
                minWidth: '320px', maxWidth: 720, height: '100%',
                padding: pagePadding, backgroundColor: background,
                marginLeft: 'auto', marginRight: 'auto',
                fontSize: '1.5rem', lineHeight: 0.8
            }}>
                {!Object.keys(filters).length &&

                    <div style={{
                        fontSize: '1rem',
                        lineHeight: '1.2rem',
                        width: '100%',
                        textAlign: 'left',
                        marginTop: 10
                    }}>
                        Check out who&#39;s got the fastest pick times from across the community and share your best
                        picks! Join
                        the conversation on the <a href={'https://discord.gg/BQDN5fa9ff'}
                                                   target='_blank'
                                                   rel='noopener noreferrer'>#unLOCKED discord</a>.

                    </div>
                }
                <SortFilterBarSP view={view} setView={setView}/>
                <div style={{height: 5}}/>

                {filters.pickerId &&
                    <ViewProfileInline/>
                }
                <NewEntry entriesUpdate={entriesUpdate}/>

                {entries.map((entry) =>
                    <Entry bestTimes={bestTimes}
                           key={entry.id}
                           entry={entry}
                           expanded={entry.id === defExpanded}
                           onExpand={setExpanded}
                           entriesUpdate={entriesUpdate}
                    />
                )}

                {entries?.length === 0 &&
                    <NoEntriesCard view={view} setView={setView}/>
                }
            </div>
        </React.Fragment>

    )
}

export default Entries
