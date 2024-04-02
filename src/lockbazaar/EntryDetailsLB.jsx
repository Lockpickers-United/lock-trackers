import React from 'react'
import ListingDetailsRow from './ListingDetailsRow.jsx'

const EntryDetailsLB = ({listings, sellerView}) => {

    const margin = sellerView
        ? '0px 0px 0px 40px'
        : '0px 0px 0px 15px'

    return (
        <React.Fragment>
            <div style={{height: 10}}/>

            {listings.map((listing, index) =>
                <div key={index} style={{
                    textOverflow: 'ellipsis',
                    margin: margin,
                    fontSize: '1rem',
                    lineHeight: '1.3rem',
                    alignItems: 'left'
                }}>
                    <ListingDetailsRow listing={listing} sellerView={sellerView}/>
                </div>
            )}
            {!sellerView &&
                <div style={{borderTop: '1px solid #444', margin: '0px 0px 0px 15px'}}/>
            }
        </React.Fragment>
    )
}

export default EntryDetailsLB