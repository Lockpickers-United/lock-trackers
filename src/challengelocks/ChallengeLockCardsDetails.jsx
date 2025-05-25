import React, {useCallback, useState} from 'react'
import ChallengeLockImageGallery from './ChallengeLockImageGallery.jsx'
import dayjs from 'dayjs'

export default function ChallengeLockCardsDetails({entry}) {

    const [blurred, setBlurred] = useState(true)
    const [showWarning, setShowWarning] = useState(true)
    const handleBlur = useCallback(() => {
        setBlurred(!blurred)
        setShowWarning(!blurred)
    }, [blurred])

    if (!entry) return null

    return (
        <React.Fragment>

            <div style={{fontSize: '1.3rem', fontWeight: 600}}>
                {entry.title}
            </div>
            <div style={{fontSize: '0.95rem', fontWeight: 500, marginBottom: 10}}>
                By: {entry.maker} &nbsp; &nbsp; &nbsp; Created: {dayjs(entry.createdAt).format('MM/DD/YY')}
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
            <div style={{marginTop: 10, fontWeight:700}}>Details</div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse nulla erat, pharetra aliquet
            laoreet at, ullamcorper in mauris. Vivamus id lectus elit. Quisque et mauris neque. Maecenas id urna
            erat.
        </React.Fragment>
    )
}