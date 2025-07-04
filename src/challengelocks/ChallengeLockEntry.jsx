import React, {useCallback, useContext, useEffect, useRef, useState} from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionActions from '@mui/material/AccordionActions'
import queryString from 'query-string'
import Tracker from '../app/Tracker.jsx'
import ChallengeLockEntryDetails from './ChallengeLockEntryDetails.jsx'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import useWindowSize from '../util/useWindowSize.jsx'
import AccordionDetails from '@mui/material/AccordionDetails'
import CheckInButton from './CheckInButton.jsx'
import PrintButton from './PrintButton.jsx'
import CopyLinkToCLButton from './CopyLinkToCLButton.jsx'
import ProblemReportButton from './ProblemReportButton.jsx'
import sanitizeValues from '../util/sanitizeValues.js'
import DBContextCL from './DBProviderCL.jsx'
import LpuCircleLogo from '../assets/LpuCircleLogo.jsx'
import ReportProblem from '@mui/icons-material/ReportProblem'
import DataContext from '../context/DataContext.jsx'
import CopyEntryIdButton from './CopyEntryIdButton.jsx'
import ChallengeLockEntryDataDisplay from './ChallengeLockEntryDataDisplay.jsx'
import CopyEntryNameButton from './CopyEntryNameButton.jsx'

const ChallengeLockEntry = ({entry, expanded, onExpand, cycleExpanded, user}) => {
    const {adminEnabled} = useContext(DataContext)
    const {getCheckIns} = useContext(DBContextCL)
    const [checkIns, setCheckIns] = useState([])
    const refreshCheckIns = useCallback(async () => {
        try {
            const data = await getCheckIns({lockId: entry.id})
            setCheckIns(data)
            return data
        } catch (err) {
            console.error('Error fetching check-ins', err)
            setCheckIns([])
        }
    }, [entry.id, getCheckIns])

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
            const isIdFiltered = id === entry?.id

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

    const {isMobile, width} = useWindowSize()
    const mobileSmall = width <= 360
    const mobileMedium = width <= 395
    const mobileLarge = width <= 428  // but test also at 412
    const smallWindow = width <= 560

    const maxNameWidth = mobileSmall ? 155
        : mobileMedium ? 180
            : mobileLarge ? 200
                : smallWindow ? 225
                    : 300
    const nameTextStyle = !isMobile
        ? {
            fontSize: '1.2rem',
            lineHeight: '1.4rem',
            color: '#fff',
            fontWeight: 600,
            marginLeft: 0,
            overflowWrap: 'break-word',
            inlineSize: '100%',
            maxWidth: maxNameWidth
        }
        : {
            fontSize: '1.1rem',
            lineHeight: '1.3rem',
            color: '#fff',
            fontWeight: 600,
            marginLeft: 0,
            overflowWrap: 'break-word',
            inlineSize: '100%',
            maxWidth: maxNameWidth
        }
    const makerTextStyle = !isMobile
        ? {
            fontSize: '1.0rem',
            lineHeight: '1.2rem',
            color: '#fff',
            marginLeft: 5,
            marginTop: 10,
            wordBreak: 'break-all',
            inlineSize: '100%',
            maxWidth: (maxNameWidth - 10)
        }
        : {
            fontSize: '0.95rem',
            lineHeight: '1.15rem',
            color: '#fff',
            marginLeft: 5,
            marginTop: 5,
            wordBreak: 'break-all',
            inlineSize: '100%',
            maxWidth: (maxNameWidth - 10)
        }

    const summaryFlexStyle = !isMobile ? {display: 'flex'} : {}

    const entryInfoMargin = !isMobile ? '0px 20px' : '0px 10px'

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

                        {entry.thumbnail
                            ? <img src={entry.thumbnail} style={{height: 100, width: 100}} alt={entry.name}/>
                            : <LpuCircleLogo style={{width: 100, height: 100}} color={'#444'} size={100}
                                             fillPercent={0.75}/>
                        }
                        <div style={{margin: entryInfoMargin, flexGrow: 1}}>
                            <div style={{display: 'flex'}}>
                                {entry.problems === 'problems' && adminEnabled &&
                                    <div style={{marginRight: 8}}>
                                        <ReportProblem fontSize='medium' style={{color: '#fd4d4d'}}/>
                                    </div>
                                }
                                <div style={{...nameTextStyle}}>{sanitizeValues(entry.name, { profanityOK: true })}</div>
                            </div>
                            <div style={makerTextStyle}>By: {sanitizeValues(entry.maker)}</div>
                            {isMobile &&
                                <div style={{display: 'flex', justifyContent:'end', marginTop: 10}}>
                                    <ChallengeLockEntryDataDisplay entry={entry}/>
                                </div>
                            }

                        </div>

                        {!isMobile &&
                            <ChallengeLockEntryDataDisplay entry={entry}/>
                        }
                        <div style={{width: 10}}/>
                    </div>
                </div>
            </AccordionSummary>
            {
                expanded &&
                <React.Fragment>

                    <AccordionDetails style={{backgroundColor: '#333'}}>
                        <ChallengeLockEntryDetails entry={entry} expanded={expanded} onExpand={onExpand}
                                                   checkIns={checkIns} setCheckIns={setCheckIns}
                                                   refreshCheckIns={refreshCheckIns} cycleExpanded={cycleExpanded} user={user}/>
                        <Tracker feature='challengeLock' id={entry.id} name={entry?.name}/>
                    </AccordionDetails>

                    <AccordionActions>
                        <div style={{display: 'flex', width: '100%'}}>
                            <div style={{flexGrow: 1}}>
                                {user &&
                                    <ProblemReportButton entry={entry} style={{color: '#da5353'}}/>
                                }
                                <CopyEntryIdButton entry={entry}/>
                            </div>
                            <CopyEntryNameButton entry={entry} style={{}}/>
                            <CopyLinkToCLButton entry={entry} style={{}}/>
                            <PrintButton entry={entry} style={{}}/>
                            <CheckInButton entry={entry} style={{margin: '4px 20px'}}/>
                            <Tracker feature='challengelock' id={entry.id}/>
                        </div>
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
