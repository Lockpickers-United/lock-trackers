import React, {useCallback, useContext} from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import FieldValue from '../util/FieldValue.jsx'
import useWindowSize from '../util/useWindowSize.jsx'
import FilterContext from '../context/FilterContext.jsx'
import LoadingContextLB from '../lockbazaarContext/LoadingContextLB.jsx'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import LinkIcon from '@mui/icons-material/Link'
import {enqueueSnackbar} from 'notistack'
import ListAltIcon from '@mui/icons-material/ListAlt'

// http://localhost:3000/#/speedpicks?pickerId=ClbjuilBEHgbzO4UZl4y3GStlEz2

function SellerProfileInline({listing, handleClose}) {

    const {filters, addFilter} = useContext(FilterContext)
    const filtersMap = new Map(Object.entries(filters))
    const {getSellerFromId, sellerIdMap} = useContext(LoadingContextLB)

    const sellerView = !!filters.sellerName

    const thisSellerId = listing
        ? sellerIdMap[listing.sellerName]
        : sellerIdMap[filtersMap.get('sellerName')]
    const profile = getSellerFromId(thisSellerId)
    const profileName = profile?.username ? profile?.username : ''
    const safeName = profileName.replace(/[\s/]/g, '_').replace(/\W/g, '')

    const sellerShipsTo = profile?.sellerShipsTo?.length === 6
        ? 'Worldwide'
        : profile?.sellerShipsTo?.join(', ')

    if (profile?.username) {
        document.title = `LPU Locks - Seller ${profileName}`
    } else {
        document.title = 'LPU Locks - Seller Profile'
    }

    const sellerNoteLines = profile?.sellerNote
        ? profile?.sellerNote?.split('..')
        : null

    const fieldValueStyle = {margin: '15px 30px 0px 0px', fontSize: '1rem', lineHeight: '1.1rem'}
    const {width} = useWindowSize()
    const breakSize = width <= 500
    const divFlexStyle = !breakSize ? {display: 'flex'} : {}

    const handleCopyLink = useCallback(async () => {
        const link = `https://lpulocks.com/#/lockbazaar?viewSeller=${thisSellerId}&name=${safeName}`
        await navigator.clipboard.writeText(link)
        enqueueSnackbar('Link to seller copied to clipboard.')
    }, [safeName, thisSellerId])

    const handleOpenSellerList = useCallback(event => {
        event.preventDefault()
        event.stopPropagation()
        handleClose()
        addFilter('sellerName', profileName)
        window.scrollTo({top: 0})
    }, [addFilter, handleClose, profileName])

    return (
        <Card style={{
            maxWidth: 700,
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: 0,
            marginBottom: 16
        }}>
            {sellerView &&
                <CardHeader title={profileName}
                            style={{paddingBottom: 0, paddingLeft: 40}}
                            action={
                                <Tooltip title='Copy Seller Link' arrow disableFocusListener>
                                    <IconButton onClick={handleCopyLink}>
                                        <LinkIcon/>
                                    </IconButton>
                                </Tooltip>
                            }
                />
            }

            {!sellerView &&
                <CardHeader title={profileName}
                            style={{paddingBottom: 0, paddingLeft: 40, cursor: 'pointer'}}
                            onClick={handleOpenSellerList}
                            action={
                                <Tooltip title='View Seller Listings' arrow disableFocusListener>
                                    <IconButton onClick={handleOpenSellerList}>
                                        <ListAltIcon/>
                                    </IconButton>
                                </Tooltip>
                            }
                />
            }


            <CardContent>

                {(profile || profile?.discordUsername || profile?.redditUsername) &&
                    <React.Fragment>

                        {sellerNoteLines &&
                            <div style={{fontSize: '1rem', lineHeight: '1.3rem', padding: '0px 30px 20px 30px'}}>
                                {sellerNoteLines.map((line, index) =>
                                    <div key={index}>{line}</div>
                                )}
                            </div>
                        }


                        <div style={{fontSize: '1.1rem', marginBottom: 20}}>
                            <a href={`https://docs.google.com/spreadsheets/d/${profile.spreadsheetId}`}
                               target='_blank'
                               rel='noopener noreferrer'>
                                Click here for detailed seller sheet
                            </a>
                        </div>
                        {profile?.sellerEmail &&
                            <div style={{fontSize: '1rem', marginBottom: 10, marginTop: 10}}>
                                {profile?.sellerEmail}
                            </div>
                        }
                        {profile.sellerShipsTo &&
                            <div style={{fontSize: '1rem', marginBottom: 10, marginTop: 20}}>
                                <FieldValue name='Ships To' value={sellerShipsTo}
                                            style={fieldValueStyle}/>
                            </div>
                        }
                        <div style={{
                            ...divFlexStyle,
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            justifyContent: 'center'
                        }}>
                            <div style={{display: 'flex'}}>
                                {profile?.country &&
                                    <FieldValue name='Location' value={profile?.country}
                                                style={fieldValueStyle}/>
                                }
                                {profile?.shipsTo &&
                                    <FieldValue name='Ships To' value={profile?.shipsTo}
                                                style={fieldValueStyle}/>
                                }
                            </div>
                            <div style={{display: 'flex'}}>
                                {profile?.discordUsername &&
                                    <FieldValue name='Discord&nbsp;Username' value={profile?.discordUsername}
                                                style={fieldValueStyle}/>
                                }
                                {profile?.redditUsername &&
                                    <FieldValue name='Reddit&nbsp;Username' value={profile?.redditUsername}
                                                style={fieldValueStyle}/>
                                }
                            </div>
                        </div>
                    </React.Fragment>
                }
            </CardContent>
        </Card>
    )
}

export default SellerProfileInline
