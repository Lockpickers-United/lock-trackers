import React, {useCallback, useContext, useDeferredValue, useState, useMemo} from 'react'
import useWindowSize from '../util/useWindowSize.jsx'
import DataContext from '../context/DataContext'
import ListContext from './ListContext.jsx'
import Entry from './Entry.jsx'
import NewEntry from './NewEntry.jsx'
import SortFilterBar from './SortFilterBar.jsx'
import {useTheme} from '@mui/material/styles'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import AccordionDetails from '@mui/material/AccordionDetails'
import JsonDisplay from './JsonDisplay.jsx'
import EntrySkeleton from './EntrySkeleton.jsx'

function Entries() {

    const {bestTimes, visibleEntries, allEntries = []} = useContext(DataContext)
    const {expanded, setExpanded} = useContext(ListContext)

    const [updated, setUpdated] = useState(0)
    const entriesUpdate = useCallback(value => {
        setUpdated(value)
        console.log(updated)
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

    console.log(entries)
    return (
        <div style={{
            minWidth: '320px', maxWidth: 800, height: '100%',
            padding: pagePadding, backgroundColor: background,
            marginLeft: 'auto', marginRight: 'auto',
            fontSize: '1.5rem', lineHeight: 0.8
        }}>
            <SortFilterBar/>

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

            <div style={{height: 40}}/>

            <Accordion style={{width: '100%'}}>
                <AccordionSummary expandIcon={<ExpandMoreIcon/>} style={{fontSize: '1.0rem'}}>
                    SPEEDPICKS DATA
                </AccordionSummary>
                <AccordionDetails>
                    <JsonDisplay json={allEntries} jsonName={'allEntries (json + calculated)'}/>
                </AccordionDetails>
            </Accordion>

        </div>
    )
}

export default Entries
