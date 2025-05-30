import React, {useCallback, useContext, useState} from 'react'
import ChallengeLockImageGallery from './ChallengeLockImageGallery.jsx'
import dayjs from 'dayjs'
import FieldValue from '../util/FieldValue.jsx'
import useWindowSize from '../util/useWindowSize.jsx'
import Button from '@mui/material/Button'
import DataContext from '../context/DataContext.jsx'
import {useNavigate} from 'react-router-dom'
import RatingTable from './RatingTable.jsx'
import Link from '@mui/material/Link'
import ratingDimensions from '../data/clRatingDimensions.json'

export default function ChallengeLockEntryDetails({entry, onExpand}) {
    if (!entry) return null
    
    const {latestUpdate} = entry

    const ratings = latestUpdate
        ? Object.keys(latestUpdate)
            .filter(key => key.startsWith('rating'))
            .reduce((acc, key) => {
                acc[key.replace('rating','')] = parseInt(latestUpdate[key])
                return acc
            }, {})
        : {}

    const handleChange = useCallback((_, isExpanded) => {
        onExpand && onExpand(isExpanded ? entry.id : false)
    }, [entry.id, onExpand])

    const {makerData} = useContext(DataContext)
    const makerLockCount = makerData?.[entry.maker]
    const navigate = useNavigate()
    const handleMakerClick = useCallback(() => {
        handleChange()
        window.scrollTo({top: 0, behavior: 'smooth'})
        navigate(`/challengelocks?maker=${entry.maker}`)
    }, [entry.maker, handleChange, navigate])

    const openInNewTab = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }

    const [blurred, setBlurred] = useState(entry.media.length > 1)
    const [showWarning, setShowWarning] = useState(entry.media.length > 1)
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

            {latestUpdate &&

                <FieldValue name='Latest Check-in' headerStyle={{color: '#999'}} style={{marginTop: 15}} value={
                    <div style={{display: flexStyle}}>
                        <div style={{
                            fontSize: '0.95rem',
                            lineHeight: '1.5rem',
                            fontWeight: 400,
                            marginRight: 15
                        }}>
                            <div style={{marginRight: 20}}>
                                {dayjs(latestUpdate.pickdate).format('MMM DD, YYYY')} by {latestUpdate.username}
                            </div>
                            <ul style={{paddingLeft: 15, margin: 0}}>
                                {latestUpdate.country && <li>{latestUpdate.country}</li>}
                                <li>Succesful pick? {latestUpdate.successfulPick}</li>
                                {latestUpdate.videoUrl && <li>
                                    <Link onClick={() => openInNewTab(latestUpdate.videoUrl)}
                                          style={{color: '#cfcff1'}}>
                                        {latestUpdate.videoUrl}
                                    </Link>
                                </li>}
                                {latestUpdate.notes && <li>Notes: {latestUpdate.notes}</li>}
                            </ul>


                        </div>
                        {Object.keys(ratings).length > 0 &&
                            <RatingTable ratingDimensions={ratingDimensions}
                                         ratings={ratings}
                                         readonly={true}
                                         size={16}
                                         fontSize={'0.9rem'}
                                         paddingData={1}
                                         backgroundColor={'#222'}
                            />
                        }
                    </div>


                }
                />
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