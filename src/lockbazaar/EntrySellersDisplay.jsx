import React from 'react'
import Link from '@mui/material/Link'
import useWindowSize from '../util/useWindowSize.jsx'

function EntrySellersDisplay({sellerNames, handleFilter, sellerButtonDisabled}) {

    const sellersText = sellerNames.length > 1 ? 'Sellers' : 'Seller'

    const {width} = useWindowSize()
    const mobile424 = width <= 424

    const sellerFlexStyle = !mobile424 ? {} : {display: '', marginLeft: 15}

    return (
        <div style={sellerFlexStyle}>
            <div style={{margin: '6px 10px 3px 0px', fontSize: '.85rem', color: '#999'}}>
                {sellersText}:
            </div>
            {sellerNames.map((seller, index) =>
                <div key={index} style={{padding:2}}>
                    <Link style={{
                        textDecoration: 'none',
                        fontSize: '0.87rem',
                        lineHeight: '.9rem',
                        fontWeight: 600,
                        minWidth: 40,
                        textAlign: 'left'
                    }}
                          color='primary'
                          value={seller}
                          onClick={handleFilter}
                          disabled={sellerButtonDisabled}
                    >
                        {seller}
                    </Link>
                </div>
            )}
        </div>

    )
}

export default EntrySellersDisplay