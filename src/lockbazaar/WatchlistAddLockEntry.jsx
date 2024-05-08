import React, {useCallback, useContext, useEffect, useRef, useState} from 'react'
import entryName from '../util/entryName'
import ListItemText from '@mui/material/ListItemText'
import WatchlistButton from './WatchlistButton.jsx'
import LoadingContextLB from '../lockbazaarContext/LoadingContextLB.jsx'
import WatchlistAddAllButton from './WatchlistAddAllButton.jsx'
import BeltStripe from '../speedpicks/BeltStripe.jsx'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import DataContext from '../App/DataContext.jsx'
import useWindowSize from '../util/useWindowSize.jsx'
import Button from '@mui/material/Button'
import AccordionDetails from '@mui/material/AccordionDetails'
import EntryDetailsLB from './EntryDetailsLB.jsx'
import AccordionActions from '@mui/material/AccordionActions'
import EntryActionsLB from './EntryActionsLB.jsx'
import Tracker from '../app/Tracker.jsx'
import queryString from 'query-string'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const WatchlistAddLockEntry = ({lock, expanded, onExpand}) => {
    const {getLockLinesInfoFromId, getListingsFromId, getLockFromId} = useContext(LoadingContextLB)
    const {getEntryFromId, getListingCountFromId} = useContext(DataContext)

    const entry = getEntryFromId(lock.id) ? getEntryFromId(lock.id) : getLockFromId(lock.id)
    const isEntry = !!getEntryFromId(lock.id)
    const listings = getListingsFromId(lock.id)

    const lockName = lock ? entryName(lock, 'short') : ''
    const lockVersion = lock ? lock.version : ''
    const samelines = getLockLinesInfoFromId(lock.id)

    let listingsArray = getListingsFromId(lock.id) ? [{'id': lock.id, 'listings': listings}] : null

    let listingsCount = listings.length

    if (samelines.length > 1) {
        listingsArray = samelines.map((sameline) => {
            listingsCount = listingsCount + getListingsFromId(sameline.id).length
            if (getListingsFromId(sameline.id)) {
                return getListingsFromId(sameline.id) ? {
                    'id': sameline.id,
                    'listings': getListingsFromId(sameline.id)
                } : null
            }
        })
    }

    const expandIcon = listingsCount > 0 ? <ExpandMoreIcon style={{color: '#6cc5f1'}}/> :
        <ExpandMoreIcon style={{color: 'transparent'}}/>

    const [scrolled, setScrolled] = useState(false)
    const ref = useRef(null)
    const handleChange = useCallback((_, isExpanded) => {
        (listings && onExpand) && onExpand(isExpanded ? lock?.id : false)
    }, [listings, lock.id, onExpand])

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

    const {width} = useWindowSize()
    const smallWindow = width <= 480
    const summaryFlexStyle = !smallWindow ? {display: 'flex'} : {}
    const nameDivWidth = !smallWindow
        ? '65%'
        : '90%'

    return (
        <Accordion expanded={expanded} onChange={handleChange} style={style} key={lock.id} ref={ref}
                   disableGutters={false}>
            <AccordionSummary expandIcon={expandIcon}
                              sx={{
                                  '& .MuiAccordionSummary-content': {
                                      display: 'block'
                                  }
                              }}>
                <div style={summaryFlexStyle}>
                    <div style={{display: 'flex', width: '80%'}}>
                        <BeltStripe value={lock.belt}/>

                        <div style={{
                            margin: '12px 0px 8px 8px',
                            width: nameDivWidth,
                            flexShrink: 0,
                            flexDirection: 'column'
                        }}>
                            <ListItemText
                                primary={lockName}
                                primaryTypographyProps={{fontWeight: 600}}
                                secondary={lockVersion}
                                secondaryTypographyProps={{}}
                                style={{padding: '0px 0px 0px 10px'}}
                            />
                        </div>

                        {(!smallWindow) &&
                            <div style={{
                                margin: '0px 0px 0px 0px',
                                width: '40%',
                                display: 'flex',
                                alignItems: 'center',
                                fontSize: '1rem'
                            }}>
                                <Button style={{whiteSpace:'preserve nowrap'}}>{getListingCountFromId(lock.id)}</Button>
                            </div>
                        }

                        <div style={{
                            margin: '0px 0px 0px 10px',
                            width: '10%',
                            display: 'flex',
                            alignItems: 'center'
                        }}>
                            {lock.makeModels.length === 1 &&
                                <WatchlistButton id={lock.id} dense={smallWindow} fontSize='small'/>
                            }
                            {samelines.length > 1 &&
                                <WatchlistAddAllButton entry={lock} fontSize={'small'}/>
                            }
                        </div>

                    </div>
                </div>


                <div style={{display: 'flex', placeItems: 'center', padding: '4px 0px 4px 0px'}}>

                    <div style={{margin: 0, width: '100%', textAlign: 'left'}}>
                        {lockName &&
                            <div style={{display: 'flex', placeItems: 'center', width: '100%'}}>
                                {samelines.length > 1 &&
                                    <table style={{}}>
                                        <tbody>
                                        <tr>
                                            <td>
                                                <table style={{}}>
                                                    <tbody>
                                                    {samelines.map((sameline, index) =>
                                                        <tr key={index} style={{}}>
                                                            <td style={{paddingLeft: 20, fontSize: '1rem'}}>
                                                                <ListItemText
                                                                    primary={sameline.name}
                                                                    primaryTypographyProps={{fontWeight: 600}}
                                                                    style={{padding: '0px 0px 0px 10px'}}
                                                                />
                                                            </td>
                                                            <td style={{paddingLeft: 20, fontSize: '1rem'}}>

                                                                <Button style={{whiteSpace:'preserve nowrap'}}>{getListingCountFromId(sameline.id)}</Button>
                                                            </td>
                                                            <td style={{paddingLeft: 10}}>
                                                                <WatchlistButton id={sameline.id} dense={true}/>
                                                            </td>
                                                        </tr>
                                                    )}
                                                    </tbody>
                                                </table>

                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                }

                            </div>
                        }
                    </div>
                </div>
            </AccordionSummary>
            {(listingsCount > 0) &&
                <React.Fragment>
                    <AccordionDetails style={{backgroundColor: '#272727'}} sx={{padding: '8px 16px 0px 16px'}}>
                        <EntryDetailsLB entry={entry} listingsArray={listingsArray} sellerView={false}/>
                    </AccordionDetails>
                    {isEntry &&
                        <AccordionActions disableSpacing style={{backgroundColor: '#272727'}}>
                            <EntryActionsLB entry={entry}/>
                            <Tracker feature='lock' id={entry.id} lockMake={entry?.makeModels[0].make}
                                     lockModel={entry?.makeModels[0].model}/>
                        </AccordionActions>
                    }
                </React.Fragment>
            }
        </Accordion>

    )
}

export default WatchlistAddLockEntry
