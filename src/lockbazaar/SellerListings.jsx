import React from 'react'

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Button from '@mui/material/Button'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'

function SellerListings({listings, name}) {

    // TODO Sort not working
    const rows = listings
        .sort((a, b) => {
            a.lockName.localeCompare(b.lockName)
        })
        .map(function (listing) {
            return {
                lockName: listing.lockName,
                avail: listing.avail
        }
        })

    return (

        <div style={{margin:'20px 0px 20px 10px', alignItems:'center'}}>

            <div style={{fontSize:'1.2rem', marginBottom:8}}>
                All listings from {name}
                <Button variant='text' style={{marginLeft:20}} color='primary' endIcon={<OpenInNewIcon size='small'/>}>
                    View Sheet
                </Button>

            </div>
            <TableContainer>
                <Table sx={{maxWidth: 555}} size='small'>
                    <TableHead>
                        <TableRow>
                            <TableCell>Lock</TableCell>
                            <TableCell align='center'>Qty. Available</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {rows.map((row, index) =>
                            <TableRow
                                key={index}
                            >
                                <TableCell component='th' scope='row'>
                                    {row.lockName}
                                </TableCell>
                                <TableCell align='center'>{row.avail}</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

        </div>
    )

}

export default SellerListings