import React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import useWindowSize from '../util/useWindowSize.jsx'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import NewApprovedEntry from './NewApprovedEntry.jsx'
import Button from '@mui/material/Button'

function LpuCopyLinkInfo({newApprovedEntries, bestTimes}) {

    const entriesText = newApprovedEntries.length > 1
        ? 'these entries'
        : 'this entry'

    const {width} = useWindowSize()
    const breakSize = width <= 500
    const divFlexStyle = !breakSize ? {display: 'flex'} : {}

    return (
        <Card style={{
            width:'100%',
            maxWidth: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: 26,
            marginBottom: 16,
            padding:'20px', border:'1px solid #ddd'
        }}>
            <CardHeader title={'Your entries were approved!'} action={<HighlightOffIcon/>} style={{paddingBottom: 0}}/>
            <CardContent>
                <div style={divFlexStyle}>
                    <div style={{fontSize: '0.9rem', lineHeight: '1.3rem', width:'100%'}}>
                        Mods have approved {entriesText} since your last visit:<br/><br/>

                        {newApprovedEntries.map((entry) =>
                            <NewApprovedEntry entry={entry} key={entry.id} bestTimes={bestTimes}/>
                        )}

                    </div>
                </div>

                <div style={{width:'100%', textAlign:'center', marginTop:'30px'}}>
                <Button variant="contained">Thanks!</Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default LpuCopyLinkInfo