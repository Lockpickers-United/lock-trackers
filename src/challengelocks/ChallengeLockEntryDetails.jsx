import React, {useCallback, useState} from 'react'
import ChallengeLockImageGallery from './ChallengeLockImageGallery.jsx'
import dayjs from 'dayjs'
import FieldValue from '../util/FieldValue.jsx'
import Typography from '@mui/material/Typography'

export default function ChallengeLockEntryDetails({entry}) {

    const [blurred, setBlurred] = useState(true)
    const [showWarning, setShowWarning] = useState(true)
    const handleBlur = useCallback(() => {
        setBlurred(!blurred)
        setShowWarning(!blurred)
    }, [blurred])

    if (!entry) return null

    return (
        <div>

            <div style={{fontSize: '1.3rem', fontWeight: 600}}>
                {entry.title}
            </div>

            <div style={{display: 'flex', marginBottom: 30}}>
            <FieldValue
                name='Last Seen'
                value={<Typography
                    style={{fontSize: '0.95rem', marginRight: 20}}>
                    {dayjs(entry.createdAt).format('MM/DD/YY')}
                </Typography>}
            />
            <FieldValue
                name='Latest Picker'
                value={<Typography
                    style={{fontSize: '0.95rem', marginRight: 20}}>
                    Loose Shirt
                </Typography>}
            />
            </div>

            <div style={{position: 'relative', zIndex: 1}}>
                <ChallengeLockImageGallery entry={entry} blurred={blurred}/>
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'rgba(0,0,0,0.0)',
                    alignContent: 'center',
                    justifyItems: 'center',
                    display: showWarning ? 'block' : 'none',
                    cursor: 'pointer'
                }}
                     onClick={handleBlur}
                >
                    <div style={{
                        fontSize: '1.2rem',
                        fontWeight: 600,
                        filter: 'none',
                        color: '#20397c',
                        backgroundColor: '#fff',
                        padding: 20,
                        border: '1px solid #20397c',
                        borderRadius: 5,
                        textAlign: 'center',
                    }}>
                        May contain spoilers!<br/>
                        Click to view images
                    </div>
                </div>
            </div>

            <div style={{margin: '20px 0px 10px 0px', fontWeight: 700}}>Details</div>
            <div style={{fontSize: '0.95rem', lineHeight:'1.5rem', fontWeight: 500, marginBottom: 10}}>
                Name: {entry.name}<br/>
                Maker: {entry.maker}<br/>
                Created: {dayjs(entry.createdAt).format('MMM DD, YYYY')}<br/>
                Submitted: {dayjs(entry.dateSubmitted).format('MMM DD, YYYY')}<br/>
                Country: {entry.country}<br/>
                State/Province: {entry.stateProvince}<br/>
                Format: {entry.lockFormat}<br/>
                Locking Mechanism: {entry.lockingMechanism}<br/>
                Original Make: {entry.originalMake}<br/>
            </div>

            <div style={{margin: '30px 0px 10px 0px', fontWeight: 700}}>Description</div>
            <div style={{fontSize: '0.95rem', lineHeight:'1.3rem', fontWeight: 400, marginBottom: 10}}>
                {entry.description}
            </div>


        </div>
    )
}