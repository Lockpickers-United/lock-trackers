import React, {useContext, useMemo} from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import DBContext from '../app/DBContext'
import {Backdrop} from '@mui/material'
import FieldValue from '../util/FieldValue.jsx'


function ViewProfile({viewProfile}) {

    const {profile} = useContext(DBContext)
    const profileNameRegex = useMemo(() => /name=(\w*)/, [])

    const profileLink = profile ? profile?.LPUBeltsProfile : 'https://lpubelts.com/#/profile/GGplAdctTfVDLVvYsfIADJmfp8f2?name=mgsecure'

    const profileLinkText = profile
        ? 'lpubelts.com/#/profile ... ' + profileNameRegex.exec(profileLink)[1]
        : ''

    const fieldValueStyle = {margin: '15px 0px 0px 0px', fontSize: '1rem', lineHeight: '1.9rem'}

    const [open, setOpen] = React.useState(viewProfile)

    const handleClose = () => {
        setOpen(false)
    }
    /*
    const handleOpen = () => {
        setOpen(true)
    }
     */

    return (
        <Backdrop
            sx={{color: '#fff', marginTop: '-200px', zIndex: (theme) => theme.zIndex.drawer + 1}}
            open={open}
            onClick={handleClose}
        >
            <Card style={{
                width: 360,
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: 26,
                marginBottom: 16
            }}>
                <CardHeader title={profile?.username} action={null} style={{paddingBottom: 0}}/>
                <CardContent>
                    <FieldValue name='Belt' value={profile?.belt} style={fieldValueStyle}/>
                    <FieldValue name='Discord Username' value={profile?.discordUsername} style={fieldValueStyle}/>
                    <FieldValue name='Reddit Username' value={profile?.redditUsername} style={fieldValueStyle}/>
                    <FieldValue name='Country' value={profile?.country} style={fieldValueStyle}/>
                    <FieldValue name='LPUbelts Profile' value={null} style={fieldValueStyle}/>
                    <div style={{marginLeft: 4, width: '95%'}}>
                        <a href={profile?.LPUBeltsProfile} target='_blank' rel='noreferrer'>{profileLinkText}</a>
                    </div>
                </CardContent>
            </Card>
        </Backdrop>
    )
}

export default ViewProfile
