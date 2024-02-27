import React, {useCallback, useContext, useDeferredValue, useState} from 'react'
import useWindowSize from '../util/useWindowSize.jsx'
import DataContext from '../context/DataContext'
import ListContext from './ListContext.jsx'
import Entry from './Entry.jsx'
import NewEntry from './NewEntry.jsx'
import SortFilterBar from './SortFilterBar.jsx'
import {useTheme} from '@mui/material/styles'

function Entries() {

    const {bestTimes, allEntries = []} = useContext(DataContext)
    const {expanded, setExpanded} = useContext(ListContext)

    const [updated, setUpdated] = useState(0)
    const entriesUpdate = useCallback(value => {
        setUpdated(value)
        console.log(updated)
    }, [updated])

    //const defTab = useDeferredValue(tab)
    const defExpanded = useDeferredValue(expanded)
    //const defDisplayAll = useDeferredValue(displayAll)


    const {width} = useWindowSize()
    const smallWindow = width <= 560

    const pagePadding = !smallWindow
        ? '24px 24px 32px 24px'
        : '8px 8px 32px 8px'

    const theme = useTheme()
    const background = theme.palette.mode === 'dark' ? '#223' : '#ffffff'

    return (
        <div style={{
            minWidth: '320px', maxWidth: 800, height: '100%',
            padding: pagePadding, backgroundColor: background,
            marginLeft: 'auto', marginRight: 'auto',
            fontSize: '1.5rem', lineHeight: 0.8
        }}>
            <SortFilterBar/>

            <NewEntry entriesUpdate={entriesUpdate}/>

            {allEntries.map((entry) =>
                <Entry bestTimes={bestTimes}
                       key={entry.id}
                       entry={entry}
                       expanded={entry.id === defExpanded}
                       onExpand={setExpanded}
                       entriesUpdate={entriesUpdate}
                />
            )}

        </div>
    )
}

export default Entries
