import React, {useContext} from 'react'
import ListingsDataGrid from './ListingsDataGrid.jsx'
import LoadingContextLB from '../lockbazaarContext/LoadingContextLB.jsx'
import SellerHowTo from './SellerHowTo.jsx'
import DBContext from '../app/DBContext.jsx'
import SellersDataGrid from './SellersDataGrid.jsx'

function LockBazaarSellersMain() {

    const {validListings, sellerProfiles} = useContext(LoadingContextLB)
    const {profile = {}} = useContext(DBContext)

    const listings = profile && !profile?.isLBMod
        ? validListings.filter(listing => listing.sellerName === profile?.username)
        : validListings

    console.log('sellerProfiles', sellerProfiles)

    return (
        <React.Fragment>
            {!profile.isSeller && <SellerHowTo/>}
            {profile.isSeller && <ListingsDataGrid listings={listings} profile={profile}/>}
            {profile.isLBMod && <SellersDataGrid listings={listings} sellerProfiles={sellerProfiles}/>}
        </React.Fragment>
    )
}

export default LockBazaarSellersMain
