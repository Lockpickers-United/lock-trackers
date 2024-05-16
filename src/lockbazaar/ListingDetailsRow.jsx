import React, {useCallback, useState} from 'react'
import useWindowSize from '../util/useWindowSize.jsx'
import EntryDetailsField from './EntryDetailsField.jsx'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import SellerPopup from './SellerPopup.jsx'

const ListingDetailsRow = ({listing, sellerView}) => {

    const {width} = useWindowSize()
    const smallWindow = width < 520
    const divFlexStyle = !smallWindow ? {display: 'flex'} : {}
    const sellerButtonWidth = !smallWindow ? 130 : 300



    const photoURL = listing.photo ? listing.photo : null
    const re = /https?:\/\/([\w|.]*)\//g
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
                padding: '20px 0px 0px 0px',
                fontSize: '1rem',
                lineHeight: '1.3rem',
                borderTop: '1px solid #444',
                ...divFlexStyle
            }}>
                {!sellerView &&
                    <div style={{margin: '0px 15px', fontWeight: 500, textAlign: 'left', width: sellerButtonWidth}}>
                        <Button style={{marginRight: 0, padding: 0, textAlign: 'left', minWidth: 0}}
                                onClick={handleOpen} edge='start'
                                disabled={sellerView}>
                            {listing.sellerName}
                        </Button>
                        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                            <SellerPopup listing={listing} handleClose={handleClose}/>
                        </Menu>
                    </div>
                }
                <div style={{...divFlexStyle, flexGrow: 1, flexDirection: 'row'}}>
                    {listing.format && <EntryDetailsField field='Format' value={listing.format}/>}
                    {listing.condition && <EntryDetailsField field='Cond' value={listing.condition}/>}
                    {listing.keys && <EntryDetailsField field='Keys' value={listing.keys}/>}
                    {listing.photo && <EntryDetailsField field='Photo' value={photoLink}/>}
                </div>
                <div style={divFlexStyle}>
                    <EntryDetailsField field='Qty' value={listing.avail}/>
                    <EntryDetailsField field='Price' value={listing.price}/>
                </div>
            </div>
            {listing.notes &&
                <div style={{padding: '0px 20px 15px 30px', fontSize: '.85rem', textAlign: 'left'}}>
                    {listing.notes} <span style={{color: '#777'}}>(Row {listing.rowNum + 1})</span>
                </div>
            }
            <div style={{height: 10}}/>
        </React.Fragment>
    )
}

export default ListingDetailsRow
