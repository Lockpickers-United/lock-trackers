import React from 'react'

import {DataGrid} from '@mui/x-data-grid'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import useWindowSize from '../util/useWindowSize.jsx'

function SellersDataGrid({sellerProfiles, listings}) {

    const totalListingCount = listings ? listings.length : 0

    const rows = sellerProfiles?.map((profile) => {
            const sellerListings = listings?.filter(({sellerName}) => sellerName === profile.username)
            return {
                ...profile,
                id: profile.userId,
                sellerShipsTo: profile?.sellerShipsTo?.join(', '),
                listingCount: sellerListings ? sellerListings.length : 0
            }
        }
    ).sort(function(a, b){ return a.username.localeCompare(b.username)})

    //const rows = validListings
    const columns = [
        {
            field: 'username',
            headerName: 'Seller',
            width: 160,
            editable: false,
            renderCell: (cellValues) => {
                return <Link href={`/#/lockbazaar?sellerName=${cellValues.row.username}`} style={{textDecoration:'none'}}>
                    {cellValues.row.username}
                </Link>
            }
        },
        {
            field: 'listingCount',
            headerName: 'Listings',
            width: 80,
            editable: false,
            align: 'center',
            type: 'number'
        },
        {
            field: 'country',
            headerName: 'Country',
            width: 200,
            editable: false
        },{
            field: 'sellerNote',
            headerName: 'Seller Note',
            width: 200,
            editable: false
        },
        {
            field: 'sellerShipsTo',
            headerName: 'Ships To',
            width: 300,
            editable: false
        }
    ]

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
            fontSize: '1rem', lineHeight: '1.8rem', textAlign: 'left'
        }}>

            Total Listings: {totalListingCount}
            <Box sx={{width: '100%'}}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 50
                            }
                        }
                    }}
                    pageSizeOptions={[50]}
                    density={'compact'}
                    autoHeight
                    autosizeOnMount
                    disableRowSelectionOnClick
                    ignoreDiacritics
                    sx={{fontSize: '.9rem'}}
                />
            </Box>
        </div>
    )
}

export default SellersDataGrid
