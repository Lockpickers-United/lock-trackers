import React, {useCallback, useMemo, useEffect, useRef, useState, useContext} from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import {AccordionActions} from '@mui/material'
import BeltStripe from '../speedpicks/BeltStripe.jsx'
import queryString from 'query-string'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import FieldValue from '../util/FieldValue.jsx'
import Tracker from '../app/Tracker.jsx'
import FilterChip from '../filters/FilterChip.jsx'
import Button from '@mui/material/Button'
import FilterContext from '../context/FilterContext.jsx'
import EntryActionsLB from './EntryActionsLB.jsx'
import EntryDetailsLB from './EntryDetailsLB.jsx'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import LoadingContextLB from '../lockbazaarContext/LoadingContextLB.jsx'
import useWindowSize from '../util/useWindowSize.jsx'

const Entry = ({entry, expanded, onExpand}) => {

    const {getSellerFromId} = useContext(LoadingContextLB)
    const {filters, addFilter} = useContext(FilterContext)

    const shippableListings = filters.shipsTo
        ? entry.listings
            .filter(listing => !!listing.shipsTo)
            .filter(listing => listing.shipsTo.some(r => [filters.shipsTo].includes(r)))
        : entry.listings

    const sellerView = !!filters.sellerName

    const sellersListings = sellerView
        ? shippableListings.filter(listing => listing.sellerName === filters.sellerName)
        : shippableListings

    const sellerButtonDisabled = sellerView

    const allSellers = sellersListings.map((listing) => {
            return getSellerFromId(listing.sellerId)
        }
    )
    const uniqueSellers = [...new Set(allSellers)].sort()
    const sortSellers = uniqueSellers.sort((item1, item2) => item1.username.localeCompare(item2.username))
    const sellersText = sortSellers.length > 1 ? 'Sellers' : 'Seller'

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
        textAlign: 'left',
        display: 'block'
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
    const smallWindow = width <= 520
    const mobile360 = width < 390
    const nameDivWidth = !smallWindow ? '40%' : '35%'
    const iconDivWidth = !mobile360 ? '60px' : '40px'

    return (
        <Accordion expanded={expanded} onChange={handleChange} style={style} ref={ref} disableGutters>
            <AccordionSummary expandIcon={<ExpandMoreIcon/>}
                              sx={{
                                  '& .MuiAccordionSummary-content': {
                                      display: 'block'
                                  }
                              }}>
                <div style={{display: 'flex'}}>
                    <BeltStripe value={entry.belt}/>

                    <div style={{
                        margin: '12px 0px 8px 8px',
                        width: nameDivWidth,
                        flexShrink: 0,
                        flexDirection: 'column'
                    }}>
                        <FieldValue
                            value={makeModels}
                            textStyle={entry.belt === 'Unranked' ? {
                                color: '#aaa',
                                marginLeft: '0px'
                            } : {marginLeft: '0px'}}
                            style={{marginBottom: '2px', fontSize: '.5rem'}}
                        />

                        {
                            !!entry.version &&
                            <FieldValue
                                name='Version'
                                value={<Typography
                                    style={{fontSize: '0.95rem', lineHeight: 1.25}}>{entry.version}</Typography>}
                                textStyle={entry.belt === 'Unranked' ? {color: '#aaa'} : {}}
                            />
                        }
                    </div>
                    <div style={{margin: '8px 0px 0px 0px', width: '40%', display: 'flex', alignItems: 'center'}}>
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
                    {!sellerView &&
                        <div style={{
                            margin: '8px 0px 0px 0px',
                            width: '20%',
                            display: 'flex',
                            alignItems: 'center'
                        }}>
                            <FieldValue
                                name={sellersText}
                                value={sortSellers.map((seller, index) =>
                                    <Button variant='text' size='small'
                                            key={index}
                                            style={{
                                                textTransform: 'none',
                                                lineHeight: '.9rem',
                                                minWidth: 40,
                                                textAlign: 'left'
                                            }}
                                            color='primary'
                                            value={seller?.username}
                                            onClick={handleFilter}
                                            disabled={sellerButtonDisabled}
                                    >
                                        {seller?.username}
                                    </Button>
                                )}
                                headerStyle={{marginBottom: 0}}
                            />
                        </div>
                    }
                    <div style={{
                        width: iconDivWidth,
                        flex: 'row-end'
                    }}/>
                </div>
                {sellerView &&
                    <div style={{}}>
                        <EntryDetailsLB listings={sellersListings} sellerView={sellerView}/>
                    </div>
                }
            </AccordionSummary>
            {
                expanded &&
                <React.Fragment>
                    {!sellerView &&
                        <AccordionDetails style={{backgroundColor: '#272727'}} sx={{padding: '8px 16px 0px 16px'}}>
                            <EntryDetailsLB listings={sellersListings} sellerView={sellerView}/>
                        </AccordionDetails>
                    }
                    <AccordionActions disableSpacing style={{backgroundColor: '#272727'}}>
                        <EntryActionsLB entry={entry}/>
                        <Tracker feature='lock' id={entry.id}/>
                    </AccordionActions>
                </React.Fragment>
            }
        </Accordion>
    )
}

export default Entry
