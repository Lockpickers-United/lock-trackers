import React from 'react'
import useWindowSize from '../util/useWindowSize.jsx'
import EntryDetailsField from './EntryDetailsField.jsx'

const ListingDetailsRow = ({listing}) => {

    const {width} = useWindowSize()
    const smallWindow = width <= 520
    const divFlexStyle = !smallWindow ? {display: 'flex'} : {}

    const photoURL = listing.photo ? listing.photo : null
    const re = /http.*:\/\/(\w*.\w*)\//g
    const photoLinkMatches = re.exec(photoURL)
    const photoLinkText = photoLinkMatches ? photoLinkMatches[1] : listing.photo
    const photoLink = <a href={photoURL} target='_blank' rel='noopener noreferrer'>{photoLinkText}</a>

    return (
        <React.Fragment>
            <div style={{
                margin: '0px 0px 12px 0px',
                fontSize: '1rem',
                lineHeight: '1.3rem',
                ...divFlexStyle
            }}>
                <div style={{marginRight: 20, fontWeight:500}}>
                    {listing.seller}
                </div>
                <EntryDetailsField field='Qty' value={listing.avail}/>
                {listing.condition && <EntryDetailsField field='Condition' value={listing.condition}/>}
                {listing.keys && <EntryDetailsField field='Keys' value={listing.keys}/>}
                {listing.photo && <EntryDetailsField field='Photo' value={photoLink}/>}
                {listing.condition && <EntryDetailsField field='Price' value={listing.price}/>}
            </div>
        </React.Fragment>
    )
}

export default ListingDetailsRow