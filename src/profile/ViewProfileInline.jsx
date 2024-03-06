import React, {useContext, useMemo} from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import FieldValue from '../util/FieldValue.jsx'
import useWindowSize from '../util/useWindowSize.jsx'
import FilterContext from '../context/FilterContext.jsx'
import DataContext from '../context/DataContext.jsx'
import CopyProfileLinkButton from './CopyProfileLinkButton.jsx'

// http://localhost:3000/#/speedpicks?pickerId=ClbjuilBEHgbzO4UZl4y3GStlEz2

function ViewProfileInline() {

    const {filters} = useContext(FilterContext)
    const {getProfileFromId} = useContext(DataContext)

    const profile = getProfileFromId(filters.pickerId)
    const profileName = profile?.username ? profile?.username : 'No matching profile.'
    const profileURLRegex = useMemo(() => /name=(\w*)/, [])

    if (profile?.username) { document.title = `Lock Trackers - ${profile?.username}` }
    else { document.title = 'Lock Trackers - View Profile' }

    const {width} = useWindowSize()
    const breakSize = width <= 500

    const profileLink = profile ? profile?.LPUBeltsProfile : ''
    const profileLinkText = !breakSize
        ? profile?.LPUBeltsProfile
        : profileLink
            ? 'lpubelts.com/#/profile ... ' + profileURLRegex.exec(profileLink)[1]
            : ''

    const fieldValueStyle = {margin: '15px 30px 0px 0px', fontSize: '1rem', lineHeight: '1.1rem'}

    const divFlexStyle = !breakSize ? {display: 'flex'} : {}

    return (
        <Card style={{
            maxWidth: 700,
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: 26,
            marginBottom: 16
        }}>
            <CardHeader title={profileName}
                        action={
                            <CopyProfileLinkButton/>
                        }
                        style={{paddingBottom: 0}}/>
            <CardContent>
                {(profile?.belt || profile?.LPUBeltsProfile || profile?.discordUsername || profile?.redditUsername) &&
                    <div style={divFlexStyle}>
                        <div style={{display: 'flex'}}>
                            {profile?.belt &&
                                <FieldValue name='Belt' value={profile?.belt} style={fieldValueStyle}/>
                            }
                            {profile?.discordUsername &&
                                <FieldValue name='Discord&nbsp;Username' value={profile?.discordUsername}
                                            style={fieldValueStyle}/>
                            }
                        </div>
                        <div style={{display: 'flex'}}>
                            {profile?.redditUsername &&
                                <FieldValue name='Reddit&nbsp;Username' value={profile?.redditUsername}
                                            style={fieldValueStyle}/>
                            }
                            {profile?.country &&
                                <FieldValue name='Country' value={profile?.country} style={fieldValueStyle}/>
                            }
                        </div>
                    </div>
                }
                {profile?.LPUBeltsProfile &&
                    <div>
                        <FieldValue name='LPUbelts Profile' value={null} style={fieldValueStyle}/>
                        <div style={{margin: '5px 0px 0px 4px', width: '95%', fontSize: '1rem', lineHeight: '1.2rem'}}>
                            <a href={profile?.LPUBeltsProfile} target='_blank' rel='noreferrer'>{profileLinkText}</a>
                        </div>
                    </div>
                }
            </CardContent>
        </Card>
    )
}

export default ViewProfileInline
