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
import EntryActionsLB from './EntryActionsLB.jsx'
import EntryDetailsLB from './EntryDetailsLB.jsx'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import useWindowSize from '../util/useWindowSize.jsx'
import EntrySellersDisplay from './EntrySellersDisplay.jsx'
import DataContext from '../app/DataContext.jsx'
import EntryYMALDisplay from './EntryYMALDisplay.jsx'
import WatchlistButton from './WatchlistButton.jsx'

const Entry = ({entry, expanded, onExpand}) => {

    const {filters, addFilter} = useContext(FilterContext)

    const {allGroupedIds} = useContext(DataContext)
    const parentId = entry.id.replace(/(\w+)-*.*/, '$1')
    const otherIds = allGroupedIds[parentId].filter(x => x !== entry.id)
    const hasListings = !!entry.listings
    const sellerView = !!filters.sellerName
    const watchlistView = !!filters && filters?.collection === 'Watchlist'

    const countryListings = filters.country
        ? entry.listings
            .map(listing => {
                let terseListing = {...listing}
                terseListing.country = listing?.country?.replace('United States of America', 'United States')
                terseListing.country = terseListing.country.replace('Netherlands (Kingdom of the)', 'Netherlands')
                return terseListing
            })
            .filter(listing => !!listing.country)
            .filter(listing => [filters.country].includes(listing.country))
        : hasListings ? entry.listings : []

    const shippableListings = filters.shipsTo
        ? countryListings
            .filter(listing => !!listing.shipsTo)
            .filter(listing => listing.shipsTo.some(r => [filters.shipsTo].includes(r)))
        : hasListings ? countryListings : []

    const sellersListings = sellerView
        ? shippableListings.filter(listing => listing.sellerName === filters.sellerName)
        : shippableListings

    const listingsArray = [{ 'id':entry.id, 'listings':sellersListings }]

    const sellerButtonDisabled = sellerView

    const allSellers = hasListings
        ? sellersListings.map((listing) => {
                return listing.sellerName
            }
        )
        : []

    const uniqueSellers = [...new Set(allSellers)].sort()

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

    const makeModels = useMemo(() => {
        return (
            <Stack direction='column' spacing={0} sx={{flexWrap: 'wrap'}}>
                {entry.makeModels?.map(({make, model}, index) =>
                    <Typography key={index}
                                style={{fontWeight: 500, fontSize: '1.07rem', lineHeight: 1.25, marginBottom: '4px'}}>
                        {make && make !== model ? `${make} ${model}` : model}
                    </Typography>
                )}
            </Stack>
        )
    }, [entry.makeModels])

    const {width} = useWindowSize()
    const smallWindow = width <= 480

    const nameDivWidth = !smallWindow
        ? '65%'
        : watchlistView
            ? '100%'
            : '70%'

    const nameTextStyle = entry.belt === 'Unranked'
        ? {color: '#ccc', marginLeft: '5px'}
        : !hasListings
            ? {color: '#aaa', marginLeft: '5px'}
            : {marginLeft: '5px'}

    const versionTextStyle = entry.belt === 'Unranked'
        ? {color: '#ccc'}
        : !hasListings
            ? {color: '#aaa'}
            : {}
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

    return (
        <Accordion expanded={expanded} onChange={handleChange} style={style} ref={ref} disableGutters={false}>
            <AccordionSummary expandIcon={<ExpandMoreIcon/>}
                              sx={{
                                  '& .MuiAccordionSummary-content': {
                                      display: 'block'
                                  }
                              }}>

                <div style={summaryFlexStyle}>
                    <div style={{display: 'flex', width: '80%'}}>
                        <BeltStripe value={entry.belt}/>
                        <div style={{
                            margin: '12px 0px 8px 8px',
                            width: nameDivWidth,
                            flexShrink: 0,
                            flexDirection: 'column'
                        }}>
                            <div
                                style={nameTextStyle}
                                //style={{marginBottom: '2px', fontSize: '.5rem'}}
                            >{makeModels}</div>

                            {
                                !!entry.version &&
                                <FieldValue
                                    name='Version'
                                    value={<Typography
                                        style={{fontSize: '0.95rem', lineHeight: 1.25}}>{entry.version}</Typography>}
                                    textStyle={versionTextStyle}
                                />
                            }
                        </div>

                        {(!watchlistView || !smallWindow) &&
                            <div style={{
                                margin: '8px 0px 0px 0px',
                                width: '40%',
                                display: 'flex',
                                alignItems: 'center'
                            }}>
                                {
                                    entry.lockingMechanisms?.length > 0 &&
                                    <FieldValue
                                        value={
                                            <Stack direction='row' spacing={0} sx={{flexWrap: 'wrap'}}>
                                                {entry.lockingMechanisms?.map((lockingMechanism, index) =>
                                                    <FilterChip
                                                        key={index}
                                                        value={lockingMechanism}
                                                        field='lockingMechanisms'
                                                    />
                                                )}
                                            </Stack>
                                        }
                                    />
                                }
                            </div>
                        }

                        {(sellerView && entry?.isLPUbeltsLock) &&
                            <div style={{
                                margin: '0px 0px 0px 10px',
                                width: '10%',
                                display: 'flex',
                                alignItems: 'center'
                            }}>
                                <WatchlistButton id={entry.id} dense={smallWindow} fontSize='small'/>
                            </div>
                        }

                    </div>
                    {!sellerView &&
                        <div style={{
                            margin: '8px 0px 0px 0px',
                            width: summarySellersWidth,
                            display: 'flex'
                        }}>
                            {hasListings &&
                                <EntrySellersDisplay sellerNames={uniqueSellers} handleFilter={handleFilter}
                                                     sellerButtonDisabled={sellerButtonDisabled}/>
                            }
                            {!hasListings &&
                                <div style={noListingsStyle}>
                                    No listings available
                                </div>
                            }
                        </div>
                    }
                </div>
                {sellerView &&
                    <div style={{}}>
                        <EntryDetailsLB entry={entry} listings={sellersListings} sellerView={sellerView} listingsArray={listingsArray}/>
                    </div>
                }
                {(otherIds.length > 0 && !hasListings) &&
                    <EntryYMALDisplay otherIds={otherIds}/>
                }
            </AccordionSummary>
            {
                expanded &&
                <React.Fragment>
                    {!sellerView &&
                        <AccordionDetails style={{backgroundColor: '#272727'}} sx={{padding: '8px 16px 0px 16px'}}>
                            <EntryDetailsLB entry={entry} sellerView={sellerView} listingsArray={listingsArray}/>
                        </AccordionDetails>
                    }
                    <AccordionActions disableSpacing style={{backgroundColor: '#272727'}}>
                        <EntryActionsLB entry={entry}/>
                        <Tracker feature='lock' id={entry.id} lockMake={entry?.makeModels[0].make}
                                 lockModel={entry?.makeModels[0].model}/>
                    </AccordionActions>
                </React.Fragment>
            }
        </Accordion>
    )
}

export default Entry
