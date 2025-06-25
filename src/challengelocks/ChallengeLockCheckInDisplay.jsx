import React, {useCallback, useContext, useState} from 'react'
import Link from '@mui/material/Link'
import useWindowSize from '../util/useWindowSize.jsx'
import RatingTable from './RatingTable.jsx'
import validator from 'validator'
import DataContext from '../context/DataContext.jsx'
import Menu from '@mui/material/Menu'
import Button from '@mui/material/Button'
import DBContextCL from './DBProviderCL.jsx'
import LoadingDisplayWhite from '../misc/LoadingDisplayWhite.jsx'
import {useNavigate} from 'react-router-dom'
import FieldValue from '../util/FieldValue.jsx'
import dayjs from 'dayjs'
import countries from '../data/countries.json'
import {internationalDate} from '../util/formatTime.js'
import {nodeServerUrl} from '../data/dataUrls.js'
import {postData} from '../formUtils/postData.jsx'
import {enqueueSnackbar} from 'notistack'
import AuthContext from '../app/AuthContext.jsx'
import Dialog from '@mui/material/Dialog'

export default function ChallengeLockCheckInDisplay({checkIn, latest = false, viewRoute = false}) {
    const {user} = useContext(AuthContext)
    const {adminEnabled} = useContext(DataContext)
    const {allEntries, updateVersion} = useContext(DBContextCL)
    const navigate = useNavigate()

    const [checkInDeleted, setCheckInDeleted] = useState(false)
    const urlError = checkIn.videoUrl?.length > 0 && !validator.isURL(checkIn.videoUrl)
    const urlDisplay = checkIn.videoUrl && !urlError
        ? <Link onClick={() => openInNewTab(checkIn.videoUrl)} style={{color: '#cfcff1'}}>{checkIn.videoUrl}</Link>
        : '(invalid video URL)'
    const checkInDate = latest
        ? dayjs(checkIn.pickDate).format('MMM DD, YYYY')
        : internationalDate(checkIn.pickDate)
    const displayCountry = countries.find(country => country.country_area === checkIn.country)?.short_name || checkIn.country || undefined

    const ratings = checkIn
        ? Object.keys(checkIn)
            .filter(key => (key.startsWith('rating') && !key.startsWith('rating-')))
            .reduce((acc, key) => {
                acc[key.replace('rating', '')] = parseInt(checkIn[key])
                return acc
            }, {})
        : {}

    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const handleOpen = useCallback(event => setAnchorEl(event.currentTarget), [])
    const handleClose = useCallback(() => setAnchorEl(null), [])
    const handleReload = useCallback(() => location.reload(), [])
    const [deleting, setDeleting] = useState(false)

    const handleDelete = useCallback(async () => {
        console.log('user', user)
        setDeleting(true)
        checkIn.delete = true
        const formData = new FormData()
        Object.keys(checkIn).forEach(key => {
            formData.append(key, checkIn[key])
        })

        const url = `${nodeServerUrl}/check-in-challenge-lock`

        try {
            await postData({user, url, formData, snackBars: false})
            await updateVersion()
        } catch (error) {
            enqueueSnackbar(`Error creating request: ${error}`, {variant: 'error', autoHideDuration: 3000})
        }
        setDeleting(false)
        handleClose()
        setCheckInDeleted(true)
    }, [checkIn, handleClose, user, updateVersion])

    const handleEdit = useCallback(async () => {
        navigate(`/challengelocks/edit?id=${checkIn.id}`)
    }, [checkIn.id, navigate])

    const {flexStyle, isMobile} = useWindowSize()
    const openInNewTab = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }

    const sidePadding = (isMobile || viewRoute) ? 0 : 15
    const sideMargin = isMobile ? 0 : 20

    const style = latest
        ? {
            padding: '0px 0px 15px 0px',
            margin: `0px ${sideMargin}px`,
            borderBottom: '0px',
            fontSize: '1.0rem',
            lineHeight: '1.3rem'
        }
        : {
            padding: `5px ${sidePadding}px 5px ${sidePadding}px`,
            margin: `0px ${sideMargin}px`,
            fontSize: '1.0rem',
            lineHeight: '1.3rem'
        }

    const viewCheckInStyle = {
        padding: `5px ${sidePadding}px 0px ${sidePadding}px`,
        margin: `0px ${sideMargin}px`,
        fontSize: '1.0rem',
        lineHeight: '1.3rem'
    }

    const lockEntry = allEntries?.find(entry => entry?.id === checkIn?.lockId)
    const lockLink = lockEntry
        ? <Link onClick={() => navigate(`/challengelocks?id=${checkIn.lockId}`)}
                style={{color: '#cfcff1', cursor: 'pointer'}}>{checkIn.lockName}</Link>
        : checkIn.lockName

    return (
        <React.Fragment>
            {viewRoute &&
                <div style={{display: 'flex', flexWrap: 'wrap', ...viewCheckInStyle, marginTop: 15}}>
                    <FieldValue name='Pick Date' value={internationalDate(checkIn.pickDate)}
                                textStyle={{fontSize: '1.1rem', lineHeight: '1.3rem', fontWeight: 600}}
                                headerStyle={{color: '#999'}} style={{marginRight: 25, whiteSpace: 'nowrap'}}/>
                    <FieldValue name='CL Name' value={lockLink}
                                headerStyle={{color: '#999'}}
                                textStyle={{fontSize: '1.1rem', lineHeight: '1.3rem', fontWeight: 600}}
                                style={{marginRight: 25, whiteSpace: 'nowrap'}}/>
                    <FieldValue name='Maker' value={checkIn.lock?.maker}
                                headerStyle={{color: '#999'}}
                                textStyle={{fontSize: '1.1rem', lineHeight: '1.3rem', fontWeight: 600}}
                                style={{marginRight: 25, whiteSpace: 'nowrap'}}/>
                    <FieldValue name='Picked?' value={checkIn.successfulPick}
                                headerStyle={{color: '#999'}}
                                textStyle={{fontSize: '1.1rem', lineHeight: '1.3rem', fontWeight: 600}}
                                style={{marginRight: 25, whiteSpace: 'nowrap'}}/>
                    <FieldValue name='Format' value={checkIn.lock?.lockFormat}
                                headerStyle={{color: '#999'}}
                                textStyle={{fontSize: '1.1rem', lineHeight: '1.3rem', fontWeight: 400}}
                                style={{marginRight: 25, whiteSpace: 'nowrap'}}/>
                    <FieldValue name='Mechanism' value={checkIn.lock?.lockingMechanism}
                                headerStyle={{color: '#999'}}
                                textStyle={{fontSize: '1.1rem', lineHeight: '1.3rem', fontWeight: 400}}
                                style={{marginRight: 0, whiteSpace: 'nowrap'}}/>
                </div>
            }

            <div style={{display: flexStyle, ...style}}>
                <div style={{
                    fontSize: '0.95rem',
                    lineHeight: '1.5rem',
                    fontWeight: 400,
                    marginRight: 15,
                    width: 300
                }}>
                    {!viewRoute &&
                        <div style={{
                            fontSize: '0.96rem',
                            lineHeight: '1.3rem',
                            fontWeight: 600,
                            width: 300,
                            margin: '15px 0px 5px 0px'
                        }}>
                            {checkInDate} <span
                            style={{fontWeight: 400, color: '#ddd'}}>by</span> {checkIn.username}
                        </div>
                    }

                    <ul style={{paddingLeft: 20, margin: 0}}>
                        {checkIn.videoUrl && <li>{urlDisplay}</li>}
                        {!viewRoute && checkIn.successfulPick && <li>Succesful pick? {checkIn.successfulPick}</li>}
                        {displayCountry && <li>{displayCountry}</li>}
                        {checkIn.stateProvince && <li>{checkIn.stateProvince}</li>}
                    </ul>

                    {adminEnabled &&
                        <div style={{
                            textAlign: 'left',
                            fontSize: '0.9rem',
                            lineHeight: '1.1rem',
                            fontWeight: 400,
                            marginTop: 20
                        }}>
                            <Link onClick={handleOpen}
                                  style={{color: '#f00', textDecoration: 'none'}}>DELETE</Link>
                            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                                <div style={{padding: 20, textAlign: 'center'}}>
                                    You cannot undo delete.<br/>
                                    Are you sure?
                                </div>
                                <div style={{display: 'flex', justifyContent: 'center'}}>
                                    {deleting
                                        ? <LoadingDisplayWhite color={'#fda21b'}/>
                                        : <Button style={{marginBottom: 10, color: '#000'}}
                                                  variant='contained'
                                                  onClick={handleDelete}
                                                  edge='start'
                                                  color='error'
                                        >
                                            Delete
                                        </Button>
                                    }
                                </div>
                            </Menu>

                            &nbsp;•&nbsp;
                            <Link
                                onClick={() => console.log('checkIn', checkIn)}
                                style={{color: '#666', textDecoration: 'none'}}>LOG</Link>
                            &nbsp;•&nbsp;
                            <Link
                                onClick={handleEdit}
                                style={{color: '#fda21b', textDecoration: 'none'}}>EDIT</Link>
                        </div>
                    }

                </div>

                {Object.keys(ratings).length > 0 &&
                    <RatingTable ratings={ratings}
                                 readonly={true}
                                 size={16}
                                 fontSize={'0.9rem'}
                                 fontWeight={400}
                                 paddingData={0}
                                 backgroundColor={'#333'}
                                 emptyColor={'#555'}
                                 fillColor={'#ddd'}
                    />
                }
            </div>

            {checkIn.notes &&
                <FieldValue name='Notes' headerStyle={{color: '#999'}}
                            style={{
                                ...style,
                                fontSize: '0.95rem',
                                lineHeight: '1.2rem',
                                fontWeight: 400,
                                marginBottom: 10
                            }}
                            value={
                                <span>{checkIn.notes}</span>
                            }/>

            }

            <div style={{display: 'flex', flexWrap: 'wrap', borderBottom: '1px solid #bbb'}}>
                {viewRoute && (checkIn.receivedDate || checkIn.sentDate || checkIn.receivedFrom || checkIn.sentTo) &&
                    <div style={{display: 'flex', flexWrap: 'wrap', margin: '0px 15px 15px 15px'}}>
                        <div style={{display: 'flex', flexWrap: 'wrap'}}>
                            {checkIn.receivedDate &&
                                <FieldValue name='Received' value={internationalDate(checkIn.receivedDate)}
                                            textStyle={{fontSize: '1.0rem', lineHeight: '1.3rem', fontWeight: 600}}
                                            headerStyle={{color: '#999'}}
                                            style={{marginRight: 15, whiteSpace: 'nowrap'}}/>
                            }
                            {checkIn.receivedFrom &&
                                <FieldValue name='Received From' value={checkIn.receivedFrom}
                                            textStyle={{fontSize: '1.0rem', lineHeight: '1.3rem', fontWeight: 600}}
                                            headerStyle={{color: '#999'}}
                                            style={{marginRight: 25, whiteSpace: 'nowrap'}}/>
                            }
                        </div>
                        <div style={{display: 'flex', flexWrap: 'wrap'}}>
                            {checkIn.sentDate &&
                                <FieldValue name='Sent' value={internationalDate(checkIn.sentDate)}
                                            textStyle={{fontSize: '1.0rem', lineHeight: '1.3rem', fontWeight: 600}}
                                            headerStyle={{color: '#999'}}
                                            style={{marginRight: 15, whiteSpace: 'nowrap'}}/>
                            }
                            {checkIn.sentTo &&
                                <FieldValue name='Sent To' value={checkIn.sentTo}
                                            textStyle={{fontSize: '1.0rem', lineHeight: '1.3rem', fontWeight: 600}}
                                            headerStyle={{color: '#999'}}
                                            style={{marginRight: 5, whiteSpace: 'nowrap'}}/>
                            }
                        </div>
                    </div>
                }
            </div>

            <Dialog open={checkInDeleted} componentsProps={{
                backdrop: {style: {backgroundColor: '#000', opacity: 0.7}}
            }}>
                <div style={{display: 'flex'}}>
                    <div style={{backgroundColor: '#444', marginLeft: 'auto', marginRight: 'auto', padding: 40}}>
                        <div style={{
                            fontSize: '1.7rem',
                            fontWeight: 500,
                            marginBottom: 60,
                            textAlign: 'center'
                        }}>Check-in updated.
                        </div>

                        <div style={{width: '100%', textAlign: 'center'}}>
                            <Button onClick={handleReload} variant='contained'
                                    color='info'
                                    style={{marginLeft: 'auto', marginRight: 'auto'}}>
                                RELOAD
                            </Button>
                        </div>
                    </div>
                </div>
            </Dialog>

        </React.Fragment>
    )
}
