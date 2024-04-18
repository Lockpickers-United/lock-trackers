import React, {useCallback, useContext, useDeferredValue, useState, useMemo} from 'react'
import useWindowSize from '../util/useWindowSize.jsx'
import DataContext from '../context/DataContext'
import ListContext from '../context/ListContext.jsx'
import Entry from './Entry.jsx'
import NewEntry from './NewEntry.jsx'
import SortFilterBar from './SortFilterBar.jsx'
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
                minWidth: '320px', maxWidth: 800, height: '100%',
                padding: pagePadding, backgroundColor: background,
                marginLeft: 'auto', marginRight: 'auto',
                fontSize: '1.5rem', lineHeight: 0.8
            }}>
                <SortFilterBar view={view} setView={setView}/>

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
