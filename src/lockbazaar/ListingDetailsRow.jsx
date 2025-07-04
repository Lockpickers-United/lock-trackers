import React, {useCallback, useState} from 'react'
import useWindowSize from '../util/useWindowSize.jsx'
import EntryDetailsField from './EntryDetailsField.jsx'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import SellerPopup from './SellerPopup.jsx'
import validator from 'validator'

/**
 * @prop photo
 * @prop otherInfo
 */

const ListingDetailsRow = ({listing, sellerView}) => {

    const {width} = useWindowSize()
    const smallWindow = width < 520
    const divFlexStyle = !smallWindow ? {display: 'flex'} : {}
    const sellerButtonWidth = !smallWindow ? 130 : 300

    const parsedUrl = URL.canParse(listing.photo) ? new URL(listing.photo) : null
    const hostParts = parsedUrl ? parsedUrl?.hostname.split('.') : null
    const domain = parsedUrl ? `${hostParts[hostParts.length - 2]}.${hostParts[hostParts.length - 1]}` : null
    const displayLink = listing.photo?.length > 40 ? listing.photo?.substring(0, 40) + '...' : listing.photo
    const photoLinkText = domain ? domain : displayLink
    const photoLink = <a href={listing.photo} target='_blank' rel='noopener noreferrer'>{photoLinkText}</a>

    let otherInfo = listing.otherInfo

    if (otherInfo && validator.isURL(listing.otherInfo)) {
        const maxInfoLength = !smallWindow ? 70 : 30
        const otherInfoShort = otherInfo.substring(0, maxInfoLength)
        otherInfo = otherInfo.length < maxInfoLength
            ? <a href={otherInfo} target='_blank' rel='noopener noreferrer'>{otherInfo}</a>
            : <a href={otherInfo} target='_blank' rel='noopener noreferrer'>{`${otherInfoShort}...`}</a>
    }

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
            {listing.otherInfo &&
                <div style={{padding: '0px 20px 15px 30px', fontSize: '.85rem', textAlign: 'left'}}>
                    {otherInfo}
                </div>
            }
            {listing.packageContents &&
                <div style={{padding: '0px 20px 15px 30px', fontSize: '.85rem', textAlign: 'left'}}>
                    Package contents:
                    <ul>
                        {listing.packageContents.replace(/\s+,|,\s+/g, ',').split(',').filter(x => x).map((item, index) =>
                            <li key={index}>{item}</li>
                        )}
                    </ul>
                </div>
            }
            <div style={{height: 10}}/>
        </React.Fragment>
    )
}

export default ListingDetailsRow
