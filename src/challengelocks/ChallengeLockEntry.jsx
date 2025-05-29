import React, {useCallback, useEffect, useRef, useState} from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionActions from '@mui/material/AccordionActions'
import queryString from 'query-string'
import Tracker from '../app/Tracker.jsx'
import FilterChip from '../filters/FilterChip.jsx'
import ChallengeLockEntryDetails from './ChallengeLockEntryDetails.jsx'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import useWindowSize from '../util/useWindowSize.jsx'
import AccordionDetails from '@mui/material/AccordionDetails'
import CheckInButton from './CheckInButton.jsx'

const ChallengeLockEntry = ({entry, expanded, onExpand}) => {

    const [scrolled, setScrolled] = useState(false)
    const ref = useRef(null)

    const handleChange = useCallback((_, isExpanded) => {
        onExpand && onExpand(isExpanded ? entry.id : false)
    }, [entry.id, onExpand])

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

    const style = {
        maxWidth: 700,
        marginLeft: 'auto',
        marginRight: 'auto',
        borderBottom: '1px solid #444',
        textAlign: 'left'
    }

    const {flexStyle, isMobile} = useWindowSize()

    const nameTextStyle = !isMobile
        ? {fontSize: '1.2rem', lineHeight: '1.4rem', color: '#fff', fontWeight: 600, marginLeft: 0}
        : {fontSize: '1.1rem', lineHeight: '1.3rem', color: '#fff', fontWeight: 600, marginLeft: 0}
    const makerTextStyle = !isMobile
        ? {fontSize: '1.0rem', color: '#fff', marginLeft: 5, marginTop: 10}
        : {fontSize: '0.95rem', lineHeight: '1.15rem', color: '#fff', marginLeft: 5, marginTop: 5}

    const summaryFlexStyle = !isMobile ? {display: 'flex'} : {}

    return (
        <Accordion expanded={expanded} onChange={handleChange} style={style} ref={ref} disableGutters={false}>
            <AccordionSummary expandIcon={<ExpandMoreIcon/>}
                              style={{padding: '0px 16px 0px 0px'}}
                              sx={{
                                  '& .MuiAccordionSummary-content': {
                                      display: 'block', margin: 0
                                  }
                              }}>

                <div style={summaryFlexStyle}>
                    <div style={{display: 'flex', width: '100%', alignItems: 'center'}}>

                        <img src={entry.thumbnail} style={{height: 100, width: 100}} alt={entry.name}/>

                        <div style={{
                            margin: '0px 20px',
                            flexGrow: 1
                        }}>
                            <div style={nameTextStyle}>{entry.name}</div>
                            <div style={makerTextStyle}>By: {entry.maker}</div>
                        </div>

                        {!isMobile &&
                            <div style={{display: flexStyle}}>
                                <FilterChip
                                    value={entry.lockFormat}
                                    field='lockFormat'
                                />
                                {entry.lockingMechanism &&
                                    <FilterChip
                                        value={entry.lockingMechanism}
                                        field='lockingMechanism'
                                    />
                                }
                            </div>
                        }
                        <div style={{width: 10}}/>
                    </div>
                </div>
            </AccordionSummary>
            {
                expanded &&
                <React.Fragment>

                    <AccordionDetails style={{backgroundColor: '#333'}}>
                        <ChallengeLockEntryDetails entry={entry}/>
                        <Tracker feature='challengeLock' id={entry.id} name={entry?.name}/>
                    </AccordionDetails>

                    <AccordionActions>
                        <CheckInButton entry={entry} style={{margin: '4px 20px'}}/>
                    </AccordionActions>

                </React.Fragment>
            }
        </Accordion>
    )
}

export default React.memo(ChallengeLockEntry, (prevProps, nextProps) => {
    return prevProps.entry.id === nextProps.entry.id &&
        prevProps.expanded === nextProps.expanded &&
        prevProps.onExpand === nextProps.onExpand
})
