import React, {useCallback, useEffect, useRef, useState} from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ListItemText from '@mui/material/ListItemText'
import BeltStripe from './BeltStripe.jsx'
import queryString from 'query-string'
import EntryDetails from './EntryDetails.jsx'
import EditEntry from './EditEntry.jsx'
import {useTheme} from '@mui/material/styles'
import useWindowSize from '../util/useWindowSize.jsx'
import ErrorIcon from '@mui/icons-material/Error'

const Entry = ({entry, expanded, onExpand, entriesUpdate}) => {

    //TODO: handle no lock matching ID (or null)

    const [editing, setEditing] = useState(false)

    const theme = useTheme()

    const isBestTime = entry.rank === 'Fastest'
    const entryColor = entry.status === 'pending'
        ? theme.palette.error.light
        : entry.status === 'rejected'
            ? '#e15c07'
            : isBestTime ? theme.palette.text.primary : theme.palette.text.disabled

    const entryWeight = entry.status !== 'approved'
        ? 400
        : isBestTime ? 600 : 400

    const [scrolled, setScrolled] = useState(false)
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
        entriesUpdate()
    }, [entriesUpdate])

    const handleChange = useCallback((_, isExpanded) => {
        onExpand && onExpand(isExpanded ? entry?.id : false)
        setTimeout(() => endEdit(), 500)
    }, [endEdit, entry?.id, onExpand])

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

    const style = {maxWidth: 700, marginLeft: 'auto', marginRight: 'auto', borderBottom: '1px solid #444'}

    const divStyle = {
        margin: '10px 15px 10px 15px',
        fontSize: '1.0rem',
        color: entryColor,
        fontWeight: entryWeight,
        display: 'flex',
        placeItems: 'center'
    }

    const {width} = useWindowSize()
    const breakSize = width <= 427
    const nameDivStyle = {
        minWidth: 110,
        textAlign: 'right'
    }
    const divFlexStyle = !breakSize ? {display: 'flex'} : {}
    const combinedDivStyle = {
        ...nameDivStyle,
        ...divFlexStyle
    }

    const expandIcon = entry.status === 'rejected'
        ? <ErrorIcon style={{color: '#E15C07FF'}}/>
        : <ExpandMoreIcon/>

    const timeString = entry.status === 'rejected'
    ? 'problems'
        : entry.totalTimeString

    return (
        <Accordion expanded={expanded} onChange={handleChange} style={style} ref={ref} disableGutters>
            <AccordionSummary expandIcon={expandIcon} style={{fontSize: '1.1rem'}}>
                <BeltStripe value={entry.belt}/>
                <ListItemText
                    primary={entry.lock}
                    primaryTypographyProps={{fontWeight: 600, color: entryColor, fontSize: '1.0rem'}}
                    secondary={entry.version}
                    secondaryTypographyProps={{color: entryColor}}
                    style={{padding: '8px 0px 8px 10px'}}
                />
                <div style={combinedDivStyle}>
                    <div style={divStyle}>{entry.pickerName}</div>
                    <div style={divStyle}>{timeString}</div>
                </div>
            </AccordionSummary>
            <AccordionDetails style={{display: 'block', padding: 0}}>
                {(!editing && expanded) &&
                    <EntryDetails entry={entry} startEdit={startEdit} entriesUpdate={entriesUpdate}/>
                }
                {(editing && expanded) &&
                    <EditEntry entry={entry} toggleOpen={toggleOpenTEMP} endEdit={endEdit}
                               entriesUpdate={entriesUpdate}/>
                }
            </AccordionDetails>
        </Accordion>
    )
}

export default Entry
