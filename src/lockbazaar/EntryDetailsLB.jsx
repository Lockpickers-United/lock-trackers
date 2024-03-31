import React from 'react'
import ListingDetailsRow from './ListingDetailsRow.jsx'

const EntryDetailsLB = ({listings}) => {
    return (
        <React.Fragment>
            <div style={{height:10}}/>

            {listings.map((listing, index) =>
                <div key={index} style={{
                    textOverflow: 'ellipsis',
                    margin: '0px 0px 0px 15px',
                    fontSize: '1rem',
                    lineHeight: '1.3rem',
                    alignItems: 'left'
                }}>
                    <ListingDetailsRow listing={listing}/>
                </div>
            )}
            <div style={{borderTop: '1px solid #444', margin: '0px 0px 0px 15px'}}/>
        </React.Fragment>
    )
}

export default EntryDetailsLB