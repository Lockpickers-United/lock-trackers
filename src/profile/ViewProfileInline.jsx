import React, {useContext} from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import FieldValue from '../util/FieldValue.jsx'
import useWindowSize from '../util/useWindowSize.jsx'
import FilterContext from '../context/FilterContext.jsx'
import DataContext from '../app/DataContext.jsx'
import CopyProfileLinkButton from './CopyProfileLinkButton.jsx'

// http://localhost:3000/#/speedpicks?pickerId=ClbjuilBEHgbzO4UZl4y3GStlEz2
// https://lpubelts.com/#/profile/4qqxB0nW8dczUws5XuAyhEkgZEj2?name=mg_test_account


function ViewProfileInline() {

    const {filters} = useContext(FilterContext)
    const {getProfileFromId} = useContext(DataContext)

    const {width} = useWindowSize()
    const breakSize = width <= 500

    const profile = getProfileFromId(filters.pickerId)
    const profileName = profile?.username ? profile?.username : 'No matching profile.'

    if (profile?.username) {
        document.title = `LPU Locks - ${profile?.username}`
    } else {
        document.title = 'LPU Locks - View Profile'
    }

    const profileLink = profile && lpuIdRegex.test(profile?.LPUBeltsProfile)
        ? profile?.LPUBeltsProfile
        : null

    const profileLinkText = !breakSize
        ? profile?.LPUBeltsProfile
        : profileLink
            ? 'lpubelts.com/#/profile ... ' + profileTextRegex.exec(profileLink)[1]
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
                            {profileLink &&
                                <a href={profileLink} target='_blank' rel='noopener, noreferrer'>{profileLinkText}</a>
                        }
                        {!profileLink &&
                                <span>{profileLinkText}</span>
                            }
                        </div>
                    </div>
                }
            </CardContent>
        </Card>
    )
}

const profileTextRegex = /name=(\w*)/

const lpuIdRegex = /^https:\/\/lpubelts.com\/#\/profile\/([A-Za-z0-9]{28})/

export default ViewProfileInline
