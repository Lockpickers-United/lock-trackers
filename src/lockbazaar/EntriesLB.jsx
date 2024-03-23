import React, {useCallback, useContext, useDeferredValue, useState, useMemo} from 'react'
import useWindowSize from '../util/useWindowSize.jsx'
import DataContext from '../lockbazaarContext/DataContextLB'
import ListContext from '../context/ListContext'
import {useTheme} from '@mui/material/styles'
import FilterContext from '../context/FilterContext.jsx'
import NoEntriesCardLB from './NoEntriesCardLB.jsx'
import EntryLB from './EntryLB.jsx'
import SortFilterBarLB from './SortFilterBarLB.jsx'

function EntriesLB() {

    const {visibleEntries = []} = useContext(DataContext)
    const {expanded, setExpanded} = useContext(ListContext)
    const {filters} = useContext(FilterContext)

    console.log('entries, expanded', expanded)

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
                <SortFilterBarLB/>

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
        </React.Fragment>

    )
}

export default EntriesLB
