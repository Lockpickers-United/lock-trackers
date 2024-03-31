import React from 'react'
import SellerProfileInline from './SellerProfileInline.jsx'

function SellerPopup({listing, handleClose}) {
    return (
        <div style={{textAlign:'center'}}>
            <SellerProfileInline listing={listing} handleClose={handleClose}/>
        </div>
    )
}

export default SellerPopup
