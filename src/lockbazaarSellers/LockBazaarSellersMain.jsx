import React, {useContext} from 'react'
import ListingsDataGrid from './ListingsDataGrid.jsx'
import LoadingContextLB from '../lockbazaarContext/LoadingContextLB.jsx'
import FilterContext from '../context/FilterContext.jsx'
import SellerHowTo from './SellerHowTo.jsx'
import DBContext from '../app/DBContext.jsx'

function LockBazaarSellersMain() {

    const {filters} = useContext(FilterContext)
    const {validListings} = useContext(LoadingContextLB)
    const {profile = {}} = useContext(DBContext)

    const listings = filters.seller
        ? validListings.filter(listing => listing.seller === filters.seller)
        : validListings

    return (
        <React.Fragment>
            {!profile.isSeller && <SellerHowTo/>}
            {profile.isSeller && <ListingsDataGrid listings={listings} profile={profile}/>}
        </React.Fragment>
    )
}

export default LockBazaarSellersMain
