import React, {useCallback, useContext, useState} from 'react'
import useWindowSize from '../util/useWindowSize.jsx'
import EntryDetailsField from './EntryDetailsField.jsx'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import SellerPopup from './SellerPopup.jsx'
import FilterContext from '../context/FilterContext.jsx'

const ListingDetailsRow = ({listing}) => {

    const {filters} = useContext(FilterContext)
    const sellerView = !!filters.sellerName

    const {width} = useWindowSize()
    const smallWindow = width <= 520
    const divFlexStyle = !smallWindow ? {display: 'flex'} : {}

    const photoURL = listing.photo ? listing.photo : null
    const re = /http.*:\/\/(\w*.\w*)\//g
    const photoLinkMatches = re.exec(photoURL)
    const photoLinkText = photoLinkMatches ? photoLinkMatches[1] : listing.photo
    const photoLink = <a href={photoURL} target='_blank' rel='noopener noreferrer'>{photoLinkText}</a>

    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const handleOpen = useCallback(event => setAnchorEl(event.currentTarget), [])
    const handleClose = useCallback(() => setAnchorEl(null), [])

    return (
        <React.Fragment>
            <div style={{
                margin: '0px 0px 12px 0px',
                padding: '15px 0px 0px 0px',
                fontSize: '1rem',
                lineHeight: '1.3rem',
                borderTop: '1px solid #444',
                ...divFlexStyle
            }}>

            <div style={{marginRight: 20, fontWeight: 500}}>
                <Button style={{marginRight: 0, padding:0}} onClick={handleOpen} edge='start' disabled={sellerView}>
                    {listing.sellerName}
                </Button>
                <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                    <SellerPopup listing={listing} handleClose={handleClose}/>
                </Menu>
            </div>

            <EntryDetailsField field='Qty' value={listing.avail}/>
                {listing.format && <EntryDetailsField field='Format' value={listing.format}/>}
                {listing.condition && <EntryDetailsField field='Cond' value={listing.condition}/>}
                {listing.keys && <EntryDetailsField field='Keys' value={listing.keys}/>}
                {listing.photo && <EntryDetailsField field='Photo' value={photoLink}/>}
                {listing.price && <EntryDetailsField field='Price' value={listing.price}/>}

            </div>
            {listing.notes &&
                <div style={{padding: '0px 20px 15px 20px', fontSize: '.85rem', textAlign: 'left'}}>
                    notes: {listing.notes}
                </div>
            }
        </React.Fragment>
    )
}

export default ListingDetailsRow