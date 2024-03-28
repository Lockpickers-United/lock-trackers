import React, {useContext} from 'react'
import useWindowSize from '../util/useWindowSize.jsx'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import AccordionDetails from '@mui/material/AccordionDetails'
import JsonDisplay from '../util/JsonDisplay.jsx'

import DataContext from '../context/DataContext'
import AppContext from '../app/AppContext.jsx'
import ListingsDataGrid from './ListingsDataGrid.jsx'
import LoadingContextLB from '../lockbazaarContext/LoadingContextLB.jsx'
import FilterContext from '../context/FilterContext.jsx'

function LockBazaarSellersMain() {

    const {filters} = useContext(FilterContext)

    const {validListings} = useContext(LoadingContextLB)
    const {visibleEntries = []} = useContext(DataContext)
    const {beta} = useContext(AppContext)

    console.log('validListings', validListings)

    const listings = filters.seller
        ? validListings.filter(listing => listing.seller === filters.seller)
        : validListings
    const {width} = useWindowSize()
    const smallWindow = width <= 560
    const pagePadding = !smallWindow
        ? '24px 24px 32px 24px'
        : '8px 8px 32px 8px'

    return (
        <div style={{
            minWidth: '320px', maxWidth: 1000, height: '100%',
            padding: pagePadding, backgroundColor: '#223',
            marginLeft: 'auto', marginRight: 'auto',
            fontSize: '1.5rem', lineHeight: 0.8, textAlign: 'center'
        }}>

            <ListingsDataGrid listings={listings}/>
            {beta &&
                <div>
                    <div style={{height: 40}}/>
                    <Accordion style={{width: '100%'}}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon/>} style={{fontSize: '1.0rem'}}>
                            LOCK BAZAAR DATA
                        </AccordionSummary>
                        <AccordionDetails>
                            <JsonDisplay json={visibleEntries} jsonName={'allEntries'}/>
                        </AccordionDetails>
                    </Accordion>
                </div>
            }

        </div>
    )
}

export default LockBazaarSellersMain
