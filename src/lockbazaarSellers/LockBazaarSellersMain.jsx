import React, {useContext} from 'react'
import ListingsDataGrid from './ListingsDataGrid.jsx'
import LoadingContextLB from '../lockbazaarContext/LoadingContextLB.jsx'
import SellerHowTo from './SellerHowTo.jsx'
import DBContext from '../app/DBContext.jsx'
import SellersDataGrid from './SellersDataGrid.jsx'
import LoadingDisplay from '../util/LoadingDisplay.jsx'

function LockBazaarSellersMain() {

    const {allDataLoaded, validListings, sellerProfiles} = useContext(LoadingContextLB)
    const {profile, adminFlags = {}} = useContext(DBContext)

    const listings = validListings && profile && !adminFlags?.isLBMod
        ? validListings.filter(listing => listing.sellerName === profile?.username)
        : validListings

    return (

        <React.Fragment>

            {!allDataLoaded && <LoadingDisplay/>}

            {(allDataLoaded && adminFlags.isLBMod) &&
                <SellersDataGrid listings={listings} sellerProfiles={sellerProfiles}/>
            }
            {(allDataLoaded && adminFlags.isSeller) && <ListingsDataGrid listings={listings} profile={profile}/>}
            <SellerHowTo/>

        </React.Fragment>

    )
}

export default LockBazaarSellersMain
