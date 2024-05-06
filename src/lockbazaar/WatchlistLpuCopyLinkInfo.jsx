import React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import lpubeltsCopyProfileLink from '../resources/lpubeltsCopyProfileLink.gif'
import useWindowSize from '../util/useWindowSize.jsx'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'

function LpuCopyLinkInfo() {

    const {width} = useWindowSize()
    const breakSize = width <= 500
    const divFlexStyle = !breakSize ? {display: 'flex'} : {}

    return (
            <Card style={{
                maxWidth: 600,
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: 26,
                marginBottom: 16
            }}>
                <CardHeader title={'LPUbelts.com URLs'} action={<HighlightOffIcon/>} style={{paddingBottom: 0}}/>
                <CardContent>
                    <div style={divFlexStyle}>
                        <div style={{fontSize: '0.9rem', lineHeight: '1.3rem', marginRight: 30}}>
                            New! You can now import your Wishlist from <a href='https://lpubelts.com/#/profile/view' target='_blank'
                                                    rel='noopener noreferrer'>your LPUbelts.com profile</a>.
                            <br/><br/>

                            We use the LPUbelts URL to look up the details. The easiest way to get the URL is to click the Copy Link icon at the top right of your View Profile page LPUbelts.com.<br/><br/>

                            You can also copy the link from your browser window when looking at your profile.
                            We use the information in the URL -- specifically the element &lsquo;/profile/XXXXXXXX&rsquo; --
                            to find your Wishlist.
                        </div>
                        <div>
                            <img alt='LPU' src={lpubeltsCopyProfileLink} width={200}/>
                        </div>
                    </div>
                </CardContent>
            </Card>
    )
}

export default LpuCopyLinkInfo