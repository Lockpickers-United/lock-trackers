import React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import lpubeltsCopyLink from '../resources/lpubeltsCopyLinkSps.png'
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
                            Only locks listed on <a href='https://lpubelts.com' target='_blank'
                                                    rel='noopener noreferrer'>LPUbelts.com</a> are eligible for speed
                            pick entries.  We use the lpubelts URL to determine the lock being submitted.<br/><br/>

                            The easiest way to get the URL is to click the Copy Link icon at the bottom right of any
                            lock entry.<br/><br/>

                            You can also copy the link from your browser window when looking at a specific lock.
                            We use the information in the URL -- specifically the element &lsquo;id=XXXXXXXX&rsquo; --
                            to match your submission to its corresponding lock
                        </div>
                        <div>
                            <img alt='LPU' src={lpubeltsCopyLink} width={200}/>
                        </div>
                    </div>
                </CardContent>
            </Card>
    )
}

export default LpuCopyLinkInfo