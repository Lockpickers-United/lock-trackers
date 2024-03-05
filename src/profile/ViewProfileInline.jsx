import React, {useContext, useMemo, useState} from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import DBContext from '../app/DBContext'
import FieldValue from '../util/FieldValue.jsx'
import useWindowSize from '../util/useWindowSize.jsx'


function ViewProfileInline({viewProfile}) {

    const {profile} = useContext(DBContext)
    const profileNameRegex = useMemo(() => /name=(\w*)/, [])

    const fieldValueStyle = {margin: '15px 30px 0px 0px', fontSize: '1rem', lineHeight: '1.1rem'}

    const {width} = useWindowSize()
    const breakSize = width <= 500

    const profileLink = profile ? profile?.LPUBeltsProfile : 'https://lpubelts.com/#/profile/GGplAdctTfVDLVvYsfIADJmfp8f2?name=mgsecure'
    const profileLinkText = !breakSize
        ? profile?.LPUBeltsProfile
        : 'lpubelts.com/#/profile ... ' + profileNameRegex.exec(profileLink)[1]


    const divFlexStyle = !breakSize ? {display: 'flex'} : {}

    return (
        <Card style={{
            maxWidth: 700,
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: 26,
            marginBottom: 16
        }}>
            <CardHeader title={profile?.username} action={null} style={{paddingBottom: 0}}/>
            <CardContent>
                <div style={divFlexStyle}>
                    <div style={{display: 'flex'}}>
                        <FieldValue name='Belt' value={profile?.belt} style={fieldValueStyle}/>
                        <FieldValue name='Discord&nbsp;Username' value={profile?.discordUsername} style={fieldValueStyle}/>
                    </div>
                    <div style={{display: 'flex'}}>
                        <FieldValue name='Reddit&nbsp;Username' value={profile?.redditUsername} style={fieldValueStyle}/>
                        <FieldValue name='Country' value={profile?.country} style={fieldValueStyle}/>
                    </div>
                </div>
                <FieldValue name='LPUbelts Profile' value={null} style={fieldValueStyle}/>
                <div style={{margin: '5px 0px 0px 4px', width: '95%', fontSize: '1rem', lineHeight:'1.2rem'}}>
                    <a href={profile?.LPUBeltsProfile} target='_blank' rel='noreferrer'>{profileLinkText}</a>
                </div>
            </CardContent>
        </Card>
    )
}

export default ViewProfileInline
