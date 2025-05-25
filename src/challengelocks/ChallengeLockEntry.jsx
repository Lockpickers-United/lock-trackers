import React, {useCallback, useMemo, useEffect, useRef, useState, useContext} from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionActions from '@mui/material/AccordionActions'
import BeltStripe from '../speedpicks/BeltStripe.jsx'
import queryString from 'query-string'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import FieldValue from '../util/FieldValue.jsx'
import Tracker from '../app/Tracker.jsx'
import FilterChip from '../filters/FilterChip.jsx'
import FilterContext from '../context/FilterContext.jsx'
import EntryActionsLB from '../lockbazaar/EntryActionsLB.jsx'
import ChallengeLockEntryDetails from './ChallengeLockEntryDetails.jsx'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import useWindowSize from '../util/useWindowSize.jsx'
import EntrySellersDisplay from '../lockbazaar/EntrySellersDisplay.jsx'
import DataContext from '../context/DataContext.jsx'
import EntryYMALDisplay from '../lockbazaar/EntryYMALDisplay.jsx'
import WatchlistButton from '../lockbazaar/WatchlistButton.jsx'
import dayjs from 'dayjs'

const ChallengeLockEntry = ({entry, expanded, onExpand}) => {

    const {filters, addFilter} = useContext(FilterContext)

    const [scrolled, setScrolled] = useState(false)
    const ref = useRef(null)


    const handleChange = useCallback((_, isExpanded) => {
        onExpand && onExpand(isExpanded ? entry.id : false)
    }, [entry.id, onExpand])

    const handleFilter = useCallback(event => {
        event.preventDefault()
        event.stopPropagation()
        addFilter('sellerName', event.target.value)
        window.scrollTo({top: 0})
    }, [addFilter])

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

    const {width, flexStyle} = useWindowSize()
    const smallWindow = width <= 480

    const nameDivWidth = !smallWindow
        ? '55%'
        : '70%'

    const nameTextStyle = {fontSize: '1.2rem', color: '#fff', fontWeight: 600, marginLeft: 0}
    const makerTextStyle = {fontSize: '1.0rem', color: '#fff', marginLeft: 5, marginTop: 10}

    const versionTextStyle = entry.belt === 'Unranked'
        ? {color: '#ccc'}
        : {color: '#aaa'}

    const summaryFlexStyle = !smallWindow ? {display: 'flex'} : {}
    const summarySellersWidth = !smallWindow ? '20%' : '100%'

    const noListingsStyle = !smallWindow
        ? {
            margin: '8px 0px 0px 0px',
            display: 'flex',
            fontSize: '0.9rem',
            lineHeight: '1.2rem',
            color: '#999'
        }
        : {
            margin: '0px 0px 5px 15px',
            display: 'flex',
            fontSize: '1rem',
            lineHeight: '1.2rem',
            fontWeight: 600,
            color: '#999'
        }

    const watchlistButtonMargin = !smallWindow
        ? '0px 50px 0px 10px'
        : '0px 0px 0px 10px'

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

                        <img src={entry.mainImage.thumbnailUrl} style={{height:100, width: 100}} alt={entry.name}/>

                        <div style={{
                            margin: 20,
                            flexGrow: 1
                        }}>
                            <div style={nameTextStyle}>{entry.name}</div>
                            <div style={makerTextStyle}>By: {entry.maker}</div>
                        </div>

                        <div style={{display: flexStyle}}>
                            <FilterChip
                                value={entry.format}
                                field='format'
                            />
                            <FilterChip
                                value={entry.lockingMechanism}
                                field='lockingMechanism'
                            />
                        </div>
                        <div style={{width: 10}}/>
                    </div>
                </div>
            </AccordionSummary>
            {
                expanded &&
                <React.Fragment>
                    <AccordionActions disableSpacing style={{backgroundColor: '#272727'}}>
                        <ChallengeLockEntryDetails entry={entry}/>
                        <Tracker feature='challengeLock' id={entry.id} name={entry?.name}/>
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
