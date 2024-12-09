import React, {useCallback, useContext} from 'react'
import FieldValue from '../util/FieldValue.jsx'
import useWindowSize from '../util/useWindowSize.jsx'
import FilterContext from '../context/FilterContext.jsx'
import LoadingContextLB from '../lockbazaarContext/LoadingContextLB.jsx'
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'
import {useNavigate} from 'react-router-dom'
import Link from '@mui/material/Link'

function RaflSellerProfileInline({listing}) {
    const navigate = useNavigate()
    const {filters} = useContext(FilterContext)
    const filtersMap = new Map(Object.entries(filters))
    const {getSellerFromId, sellerIdMap} = useContext(LoadingContextLB)

    const thisSellerId = listing
        ? sellerIdMap[listing.sellerName]
        : sellerIdMap[filtersMap.get('sellerName')]
    const profile = getSellerFromId(thisSellerId)
    const profileName = profile?.username ? profile?.username : ''

    const sellerShipsTo = profile?.sellerShipsTo?.length === 6
        ? 'Worldwide'
        : profile?.sellerShipsTo?.join(', ')

    if (profile?.username) {
        document.title = `LPU Locks - Seller ${profileName}`
    } else {
        document.title = 'LPU Locks - Seller Profile'
    }

    const fieldValueStyle = {margin: '5px 30px 0px 0px', fontSize: '1rem', lineHeight: '1.1rem', textAlign: 'left'}
    const {isMobile} = useWindowSize()
    const flexStlye = !isMobile ? 'flex' : 'block'
    const handleOpenSellerList = useCallback(() => {
        navigate(`/lockbazaar?sellerName=${profileName}`)
    }, [navigate, profileName])

    const cardHeaderStyle = {
        display: flexStlye,
        padding: '20px 16px 20px 16px',
        backgroundColor: '#222',
        alignItems: 'center',
        textAlign: 'left'
    }

    const listingsText = !isMobile ? 'Listings' : 'Listings'
    const locationPadding = !isMobile ? '0px 0px 0px 20px' : '6px 0px 20px 16px'
    const country = profile?.country
        .replace(' (Kingdom of the)', '')
        .replace(' of America', '')

    return (
        <div style={{
            maxWidth: 700,
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: 0,
            borderBottom:'1px solid #666'
        }}>

            <div style={cardHeaderStyle}>

                <div style={{fontSize: '1.4rem', fontWeight: 700, alignContent: 'center', minWidth:170}}>
                    <Link onClick={()=>handleOpenSellerList()} style={{color: '#fff'}}>
                        {profileName}
                    </Link>
                </div>

                <div style={{display:'flex', flexGrow:1, alignItems:'center'}}>

                    {profile &&
                        <div style={{
                            display: 'flex',
                            justifyContent: 'left',
                            backgroundColor: '#222',
                            padding: locationPadding,
                            flexGrow:1
                        }}>
                            {profile?.country &&
                                <FieldValue name='Location' value={country}
                                            style={fieldValueStyle}/>
                            }
                            {profile.sellerShipsTo &&
                                <div style={{fontSize: '1rem', marginTop: 0, marginBottom: 0}}>
                                    <FieldValue name='Ships To' value={sellerShipsTo}
                                                style={fieldValueStyle}/>
                                </div>
                            }
                        </div>
                    }

                    <Tooltip title='View Seller Listings' arrow disableFocusListener>
                        <Button onClick={handleOpenSellerList} variant='contained' size='small'
                                style={{backgroundColor: '#429cbe', color: '#000', height:32}}>
                            {listingsText}
                        </Button>
                    </Tooltip>

                </div>

            </div>
        </div>
    )
}

export default RaflSellerProfileInline
