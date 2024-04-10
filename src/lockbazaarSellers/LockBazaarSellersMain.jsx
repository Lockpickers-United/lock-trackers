import React, {useContext} from 'react'
import ListingsDataGrid from './ListingsDataGrid.jsx'
import LoadingContextLB from '../lockbazaarContext/LoadingContextLB.jsx'
import SellerHowTo from './SellerHowTo.jsx'
import DBContext from '../app/DBContext.jsx'
import SellersDataGrid from './SellersDataGrid.jsx'
import LoadingDisplay from '../util/LoadingDisplay.jsx'

function LockBazaarSellersMain() {

    const {allDataLoaded, validListings, sellerProfiles} = useContext(LoadingContextLB)
    const {profile = {}} = useContext(DBContext)

    const listings = profile && !profile?.isLBMod
        ? validListings.filter(listing => listing.sellerName === profile?.username)
        : validListings

    return (

        <React.Fragment>

            {!allDataLoaded && <LoadingDisplay/>}

            {(allDataLoaded && !profile.isSeller) && <SellerHowTo/>}
            {(allDataLoaded && profile.isSeller) && <ListingsDataGrid listings={listings} profile={profile}/>}
            {(allDataLoaded && profile.isLBMod) &&
                <SellersDataGrid listings={listings} sellerProfiles={sellerProfiles}/>
            }
        </React.Fragment>

    )
}

export default LockBazaarSellersMain
