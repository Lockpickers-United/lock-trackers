import React from 'react'
import ListingDetailsRow from './ListingDetailsRow.jsx'

const EntryDetailsLB = ({listings}) => {

    console.log('listings', listings)
    return (
        <React.Fragment>
            {listings.map((listing, index) =>
                <div key={index} style={{
                    textOverflow: 'ellipsis',
                    margin: '0px 0px 0px 28px',
                    fontSize: '1rem',
                    lineHeight: '1.3rem',
                    display: 'flex',
                    alignItems: 'left'
                }}>
                    <ListingDetailsRow listing={listing}/>
                </div>
            )}
        </React.Fragment>
    )
}

export default EntryDetailsLB