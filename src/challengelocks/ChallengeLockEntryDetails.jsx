import React, {useCallback, useContext, useState} from 'react'
import ChallengeLockImageGallery from './ChallengeLockImageGallery.jsx'
import dayjs from 'dayjs'
import FieldValue from '../util/FieldValue.jsx'
import useWindowSize from '../util/useWindowSize.jsx'
import Button from '@mui/material/Button'
import DataContext from '../context/DataContext.jsx'
import {useNavigate} from 'react-router-dom'

export default function ChallengeLockEntryDetails({entry}) {
    if (!entry) return null

    const {makerData} = useContext(DataContext)
    const makerLockCount = makerData?.[entry.maker]
    const navigate = useNavigate()
    const handleMakerClick = useCallback(() => {
        navigate(`/challengelocks?maker=${entry.maker}`)
    }, [entry.maker, navigate])

    const [blurred, setBlurred] = useState(true)
    const [showWarning, setShowWarning] = useState(true)
    const handleBlur = useCallback(() => {
        setBlurred(!blurred)
        setShowWarning(!blurred)
    }, [blurred])

    const dateCreated = entry.lockCreated || entry.createdAt

    const {flexStyle, isMobile} = useWindowSize()


    return (
        <div>
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
                        fontSize: '1.1rem',
                        lineHeight: '1.5rem',
                        fontWeight: 600,
                        filter: 'none',
                        color: '#20397c',
                        backgroundColor: '#fff',
                        padding: 20,
                        border: '1px solid #20397c',
                        borderRadius: 5,
                        textAlign: 'center'
                    }}>
                        May contain spoilers!<br/>
                        Click to view images
                    </div>
                </div>
            </div>

            {isMobile &&
                <div style={{
                    display: 'flex',
                    fontSize: '0.95rem',
                    lineHeight: '1.2rem',
                    fontWeight: 400,
                    marginTop: 40
                }}>
                    {entry.lockFormat &&
                        <FieldValue name='Format' value={entry.lockFormat}
                                    headerStyle={{color: '#999'}} style={{marginRight: 20}}/>
                    }
                    {entry.lockingMechanism &&
                        <FieldValue name='Locking Mechanism' value={entry.lockingMechanism}
                                    headerStyle={{color: '#999'}} style={{marginRight: 20}}/>
                    }
                </div>
            }

            <div style={{
                display: flexStyle,
                fontSize: '0.95rem',
                lineHeight: '1.2rem',
                fontWeight: 400,
                marginTop: 25
            }}>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <FieldValue name='Created' value={dayjs(dateCreated).format('MMM DD, YYYY')}
                                headerStyle={{color: '#999'}} style={{marginRight: 20}}/>
                    <FieldValue name='Submitted' value={dayjs(entry.dateSubmitted).format('MMM DD, YYYY')}
                                headerStyle={{color: '#999'}} style={{marginRight: 20}}/>
                </div>
                {entry.country &&
                    <FieldValue name='Country' value={entry.country}
                                headerStyle={{color: '#999'}} style={{marginRight: 20}}/>
                }
                {entry.originalMake &&
                    <FieldValue name='Original Make' value={entry.originalMake}
                                headerStyle={{color: '#999'}} style={{}}/>
                }
            </div>

            {entry.description &&
                <div style={{fontSize: '0.95rem', lineHeight: '1.5rem', fontWeight: 400, marginTop: 10}}>
                    <FieldValue name='Description' value={entry.description}
                                headerStyle={{color: '#999'}} style={{}}/>
                </div>
            }

            {makerLockCount > 1 &&
                <div style={{
                    fontSize: '0.95rem',
                    lineHeight: '1.2rem',
                    fontWeight: 400,
                    marginTop: 10,
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                    <Button onClick={handleMakerClick} style={{lineHeight: '1.2rem'}}>All locks
                        from {entry.maker} ({makerLockCount})</Button>
                </div>
            }
        </div>
    )
}