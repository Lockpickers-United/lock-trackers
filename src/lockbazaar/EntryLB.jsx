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

const Entry = ({entry, expanded, onExpand}) => {

    const {filters, setFilters, addFilter} = useContext(FilterContext)
    //expanded = true

    const sellers = filters.sellers ? [filters.sellers] : entry.sellers
    const sellerButtonDisabled = filters.sellers
    let uniqueSellers = [...new Set(sellers)]

    const sellersText = uniqueSellers.length > 1 ? 'Sellers' : 'Seller'

    const [scrolled, setScrolled] = useState(false)
    const ref = useRef(null)

    const handleChange = useCallback((_, isExpanded) => {
        console.log('handleChange')
        onExpand && onExpand(isExpanded ? entry.id : false)
    }, [entry.id, onExpand])

    const handleFilter = useCallback(event => {
        event.preventDefault()
        event.stopPropagation()
        addFilter('sellers', event.target.value)
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


    return (
        <Accordion expanded={expanded} onChange={handleChange} style={style} ref={ref} disableGutters>
            <AccordionSummary>
                <BeltStripe value={entry.belt}/>
                <div style={{margin: '12px 0px 8px 8px', width: '50%', flexShrink: 0, flexDirection: 'column'}}>
                    <FieldValue
                        value={makeModels}
                        textStyle={entry.belt === 'Unranked' ? {color: '#aaa', marginLeft: '0px'} : {marginLeft: '0px'}}
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
                <div style={{margin: '8px 0px 0px 0px', width: '30%', display: 'flex', alignItems: 'center'}}>
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

                <div style={{
                    margin: '8px 0px 0px 0px',
                    width: '20%',
                    display: 'flex',
                    alignItems: 'center'
                }}>
                    <FieldValue
                        name={sellersText}
                        value={uniqueSellers.map((seller) =>
                            <Button variant='text' size='small'
                                    key={seller} style={{textTransform: 'none'}} color='primary'
                                    value={seller} onClick={handleFilter}
                                    disabled={sellerButtonDisabled}
                            >
                                {seller}
                            </Button>
                        )}
                        headerStyle={{marginBottom: 0}}
                    />
                </div>
            </AccordionSummary>
            {
                expanded &&
                <React.Fragment>
                    <AccordionDetails sx={{padding: '8px 16px 0px 16px'}}>
                        foo
                    </AccordionDetails>
                    <AccordionActions disableSpacing>
                        <Tracker feature='lock' id={entry.id}/>
                    </AccordionActions>
                </React.Fragment>
            }
        </Accordion>
    )
}

export default Entry
