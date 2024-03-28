import React, {useContext} from 'react'

import {DataGrid} from '@mui/x-data-grid'
import {Box} from '@mui/material'
import LoadingContextLB from '../lockbazaarContext/LoadingContextLB.jsx'

function ListingsDataGrid({listings}) {

    const {getLockFromId} = useContext(LoadingContextLB)

    const rows = listings.map((listing, index) => {

            const id = listing.id.split('|')[0]

            const lock = getLockFromId(id)
            return {
                ...listing,
                belt: lock?.belt ? lock.belt : '',
                lockId: listing.id,
                id: index,
                version: lock?.version ? lock.version : ''
            }
        }
    )

    //const rows = validListings
    const columns = [
        {
            field: 'seller',
            headerName: 'Seller',
            width: 130,
            editable: false
        },
        {
            field: 'lockName',
            headerName: 'Lock',
            width: 190,
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
            width: 90,
            editable: false
        },
        {
            field: 'condition',
            headerName: 'Condition',
            width: 100,
            editable: false
        },
        {
            field: 'keys',
            headerName: 'Keys',
            width: 60,
            editable: false,
            align: 'center'
        },
        {
            field: 'price',
            headerName: 'Price',
            width: 70,
            editable: false
        },
        {
            field: 'avail',
            headerName: 'Qty',
            width: 60,
            editable: false,
            align: 'center'
        }
    ]

    return (
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
                checkboxSelection
                density={'compact'}
                disableRowSelectionOnClick
                ignoreDiacritics
                sx={{fontSize: '.9rem'}}
            />
        </Box>
    )
}

export default ListingsDataGrid
