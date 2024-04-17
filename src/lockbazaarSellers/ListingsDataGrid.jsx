import React, {useContext} from 'react'

import {DataGrid} from '@mui/x-data-grid'
import {Box} from '@mui/material'
import LoadingContextLB from '../lockbazaarContext/LoadingContextLB.jsx'
import useWindowSize from '../util/useWindowSize.jsx'

function ListingsDataGrid({listings}) {

    const {getLockFromId} = useContext(LoadingContextLB)

    const rows = listings.map((listing, index) => {
            const id = listing.id.split('|')[0]
            const lock = getLockFromId(id)
            return {
                ...listing,
                belt: (lock?.belt && lock.belt !== 'Unranked') ? lock.belt : '',
                lockId: listing.id,
                id: index,
                version: lock?.version ? lock.version : ''
            }
        }
    )

    //const rows = validListings
    const columns = [
        {
            field: 'sellerName',
            headerName: 'Seller',
            width: 110,
            editable: false
        },
        {
            field: 'lockMake',
            headerName: 'Make',
            width: 110,
            editable: false
        },
        {
            field: 'lockModel',
            headerName: 'Model',
            width: 100,
            editable: false
        },
        {
            field: 'version',
            headerName: 'Version',
            width: 190,
            editable: false
        },
        {
            field: 'belt',
            headerName: 'Belt',
            width: 80,
            editable: false
        },
        {
            field: 'condition',
            headerName: 'Condition',
            width: 90,
            editable: false
        },
        {
            field: 'keys',
            headerName: 'Keys',
            width: 60,
            editable: false,
            align: 'center',
            headerAlign: 'center'
        },
        {
            field: 'price',
            headerName: 'Price',
            width: 60,
            editable: false
        },
        {
            field: 'avail',
            headerName: 'Qty',
            width: 60,
            editable: false,
            align: 'center',
            headerAlign: 'center',
            type: 'number'

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
            fontSize: '1.5rem', lineHeight: 0.8, textAlign: 'center'
        }}>


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
                    pageSizeOptions={[50, 100]}
                    density={'compact'}
                    disableRowSelectionOnClick
                    ignoreDiacritics
                    sx={{fontSize: '.9rem'}}
                />
            </Box>
        </div>
    )
}

export default ListingsDataGrid
