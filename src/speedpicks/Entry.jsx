import React, {useCallback, useContext, useEffect, useRef, useState} from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {ListItemText} from '@mui/material'
import formatTime from '../util/formatTime.jsx'
import BeltStripe from './BeltStripe.jsx'
import queryString from 'query-string'
import EntryDetails from './EntryDetails.jsx'
import EditEntry from './EditEntry.jsx'
import DataContext from '../context/DataContext'
import {useTheme} from '@mui/material/styles'

const Entry = ({entry, expanded, onExpand, bestTimes, entriesUpdate}) => {

    //TODO: handle no lock matching ID (or null)

    const {DCUpdate = []} = useContext(DataContext)

    const [editing, setEditing] = useState(false)

    const theme = useTheme()

    entry.bestTime = formatTime(bestTimes.get(entry.lockId))
    const isBestTime = entry.totalTime === bestTimes.get(entry.lockId)
    const entryColor = entry.status !== 'approved'
        ? theme.palette.error.light
        : isBestTime ? theme.palette.text.primary : theme.palette.text.disabled
    const entryWeight = entry.status !== 'approved'
        ? 400
        : isBestTime ? 600 : 400

    const [scrolled, setScrolled] = useState(false)
    const style = {maxWidth: 700, marginLeft: 'auto', marginRight: 'auto'}
    const ref = useRef(null)

    const [openTEMP, setOpenTEMP] = useState(false)
    const toggleOpenTEMP = useCallback(() => {
        setOpenTEMP(!openTEMP)
    }, [openTEMP])

    const startEdit = useCallback(() => {
        setEditing(true)
    }, [])

    const endEdit = useCallback(() => {
        setEditing(false)
        DCUpdate()
        entriesUpdate()
    }, [DCUpdate, entriesUpdate])

    const handleChange = useCallback((_, isExpanded) => {
        onExpand && onExpand(isExpanded ? entry?.id : false)
    }, [entry?.id, onExpand])

    useEffect(() => {
        if (expanded && ref && !scrolled) {
            const isMobile = window.innerWidth <= 600
            const offset = isMobile ? 70 : 74
            const {id} = queryString.parse(location.search)
            const isIdFiltered = id === entry.id

            setScrolled(true)

            setTimeout(() => {
                window.scrollTo({
                    left: 0,
                    top: ref.current.offsetTop - offset,
                    behavior: isIdFiltered ? 'auto' : 'smooth'
                })
            }, isIdFiltered ? 0 : 100)
        } else if (!expanded) {
            setScrolled(false)
        }
    }, [expanded, entry, scrolled])

    const divStyle = {
        margin: '0px 15px 0px 15px',
        fontSize: '1.1rem',
        color: entryColor,
        fontWeight: entryWeight,
        display: 'flex',
        placeItems: 'center'
    }

    return (
        <Accordion expanded={expanded} onChange={handleChange} style={style} ref={ref} disableGutters>
            <AccordionSummary expandIcon={<ExpandMoreIcon/>} style={{fontSize: '1.1rem'}}>
                <BeltStripe value={entry.belt}/>
                <ListItemText
                    primary={entry.lock}
                    primaryTypographyProps={{fontWeight: 600, color: entryColor}}
                    secondary={entry.version}
                    secondaryTypographyProps={{color: entryColor}}
                    style={{padding: '0px 0px 0px 10px'}}
                />
                <div style={divStyle}>{entry.pickerName}</div>
                <div style={divStyle}>{entry.totalTimeString}</div>
            </AccordionSummary>
            <AccordionDetails style={{display: 'block', padding: 0}}>
                {!editing &&
                    <EntryDetails entry={entry} startEdit={startEdit} entriesUpdate={entriesUpdate}/>
                }
                {editing &&
                    <EditEntry entry={entry} toggleOpen={toggleOpenTEMP} endEdit={endEdit} entriesUpdate={entriesUpdate}/>
                }
            </AccordionDetails>
        </Accordion>
    )
}

export default Entry
