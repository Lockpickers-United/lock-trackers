import React, {useCallback, useContext} from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import FieldValue from '../util/FieldValue.jsx'
import useWindowSize from '../util/useWindowSize.jsx'
import FilterContext from '../context/FilterContext.jsx'
import LoadingContextLB from '../lockbazaarContext/LoadingContextLB.jsx'
import CopySellerLinkButton from './CopySellerLinkButton.jsx'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import LinkIcon from '@mui/icons-material/Link.js'
import {enqueueSnackbar} from 'notistack'

// http://localhost:3000/#/speedpicks?pickerId=ClbjuilBEHgbzO4UZl4y3GStlEz2

function ViewProfileInline() {


    const {filters} = useContext(FilterContext)
    const filtersMap = new Map(Object.entries(filters))
    const {sellerList} = useContext(LoadingContextLB)
    const thisSeller = filtersMap.get('sellers')
    console.log(sellerList)

    const profile = sellerList[thisSeller]
    const profileName = profile?.name ? profile?.name : 'No matching profile.'

    if (profile?.name) {
        document.title = `Lock Trackers - Seller ${profileName}`
    } else {
        document.title = 'Lock Trackers - Seller Profile'
    }

    const fieldValueStyle = {margin: '15px 30px 0px 0px', fontSize: '1rem', lineHeight: '1.1rem'}
    const {width} = useWindowSize()
    const breakSize = width <= 500
    const divFlexStyle = !breakSize ? {display: 'flex'} : {}

    const handleCopyLink = useCallback(async () => {
        const link = `https://locktrackers.com/#/lockbazaar?sellers=${profile?.name}`
        await navigator.clipboard.writeText(link)
        enqueueSnackbar('Link to profile copied to clipboard.')
    }, [profile?.name])


    return (
        <Card style={{
            maxWidth: 700,
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: 26,
            marginBottom: 16
        }}>
            <CardHeader title={profileName}
                        style={{paddingBottom: 0, paddingLeft:40}}
                        action={
                            <Tooltip title='Copy Seller Link' arrow disableFocusListener>
                                <IconButton onClick={handleCopyLink}>
                                    <LinkIcon/>
                                </IconButton>
                            </Tooltip>
                        }
            />
            <CardContent>
                {(profile || profile?.discordUsername || profile?.redditUsername) &&
                    <React.Fragment>
                        <div style={{fontSize: '1.1rem', marginBottom: 10}}>
                            <a href={`https://docs.google.com/spreadsheets/d/${profile.spreadsheetId}`} target='_blank'
                               rel='noopener noreferrer'>
                                Click here for detailed seller sheet
                            </a>
                        </div>
                        <div style={{...divFlexStyle, marginLeft: 'auto', marginRight: 'auto', justifyContent:'center'}}>
                            <div style={{display: 'flex'}}>
                                {profile?.country &&
                                    <FieldValue name='Location' value={profile?.country} style={fieldValueStyle}/>
                                }
                                {profile?.shipsTo &&
                                    <FieldValue name='Ships To' value={profile?.shipsTo} style={fieldValueStyle}/>
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

export default ViewProfileInline
