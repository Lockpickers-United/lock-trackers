import React, {useContext, useState, useCallback, useMemo} from 'react'
import Backdrop from '@mui/material/Backdrop'
import ListItemText from '@mui/material/ListItemText'
import {DatePicker} from '@mui/x-date-pickers/DatePicker'
import {DesktopTimePicker} from '@mui/x-date-pickers'
import {enqueueSnackbar} from 'notistack'
import AuthContext from '../app/AuthContext'
import belts from '../data/belts'
import Button from '@mui/material/Button'
import DataContext from '../app/DataContext.jsx'
import dayjs from 'dayjs'
import DBContext from '../app/DBContext'
import entryName from '../util/entryName'
import formatTime from '../util/formatTime.jsx'
import InfoIcon from '@mui/icons-material/Info'
import InputAdornment from '@mui/material/InputAdornment'
import LaunchIcon from '@mui/icons-material/Launch'
import LoadingContext from '../context/LoadingContext.jsx'
import LockIcon from '@mui/icons-material/Lock'
import LpuCopyLinkInfo from './LpuCopyLinkInfo.jsx'
import TextField from '@mui/material/TextField'
import VideocamIcon from '@mui/icons-material/Videocam'
import EntryCommentAdd from './EntryCommentAdd.jsx'
import DBContextSP from './DBContextSP.jsx'

const EditEntry = ({entry, toggleOpen, entriesUpdate, endEdit}) => {
    const {bestTimes, getLockFromId, getEntryFromId = []} = useContext(DataContext)
    const {user, isLoggedIn} = useContext(AuthContext)
    const {profile} = useContext(DBContext)
    const {updateEntry} = useContext(DBContextSP)
    const {isMod = []} = useContext(DataContext)
    const {refreshData} = useContext(LoadingContext)

    const isNew = !entry
    const [entryId, setEntryId] = useState(entry && entry.id ? entry.id : 'sp_' + genHexString(8))

    if (isNew && getEntryFromId(entryId)) setEntryId('sp_' + genHexString(8))

    const [status] = useState(entry ? entry.status : 'pending')
    const [pickerId] = useState(entry ? entry?.pickerId : user?.uid)
    const [reviewerId] = useState(user?.uid)

    const pickerName = isLoggedIn ? profile?.username : '(please log in)'
    const [lockURL, setLockURL] = useState(entry && entry.lockId
        ? `https://lpubelts.com/#/locks?id=${entry.lockId}` : ''
    )
    const [lockId, setLockId] = useState(entry && entry.lockId ? entry.lockId : '')
    const [lock, setLock] = useState(entry && entry.lockId ? getLockFromId(entry.lockId) : null)
    const lockName = lock ? entryName(lock, 'short') : ''
    const lockVersion = lock ? lock.version : ''
    const lockBelt = lock ? lock.belt : ''
    const lockRegex = useMemo(() => /id=(\w{8})/, [])
    const [bestTime, setBestTime] = useState(entry ? bestTimes.lockId : 0)

    const processURL = useCallback(event => {
        const {value} = event.target
        setLockURL(value)
        const thisId = lockRegex.test(value)
            ? value.match(lockRegex)[1]
            : ''
        const thisLock = getLockFromId(thisId)
        setLock(thisLock ? thisLock : null)
        setLockId(thisId)
        setBestTime(thisLock && bestTimes.get(thisId) ? bestTimes.get(thisId) : 0)
    }, [bestTimes, getLockFromId, lockRegex])

    const {color: backgroundColor} = belts[lockBelt] || {}
    const beltStyle = {
        width: 8,
        height: 35,
        backgroundColor
    }

    const [videoUrl, setvideoUrl] = useState(entry ? entry.videoUrl : '')
    const [date, setDate] = useState(entry && entry.date ? dayjs(entry.date) : dayjs())
    const [startTime, setStartTime] = useState(entry && entry.startTime ? dayjs(entry.startTime) : dayjs('1970-01-01'))
    const [openTime, setOpenTime] = useState(entry && entry.openTime ? dayjs(entry.openTime) : dayjs('1970-01-01'))
    const timeError = (openTime - startTime) < 0
    const timeHelperText = timeError ? 'Total time must be positive' : ''

    const lockURLError = !!lockURL && (!lockRegex.test(lockURL) || !lock)
    const lockURLHelperText = lockURLError ? 'Unable to find valid lock ID in URL' : 'paste lpubelts.com URL here to set lock'
    const lockURLValid = isValidHttpUrl(lockURL) && lock
    const lockLaunchColor = lockURLValid ? '#fff' : '#666'

    const videoUrlError = !!videoUrl && !isValidHttpUrl(videoUrl)
    const videoURLHelperText = videoUrlError ? 'Video URL is not valid' : ''
    const videoUrlValid = isValidHttpUrl(videoUrl)
    const videoLaunchColor = videoUrlValid ? '#fff' : '#666'
    const buttonStyle = {border: 0, padding: 0, marginRight: 0, minWidth: 33}

    const validEntry = lockURLValid && videoUrlValid && (openTime - startTime) > 0 && !timeError
    const saveEntryColor = validEntry ? '#0a0' : '#666'

    async function saveEntry() {
        if (isNew) {
            const thisEntry = new Map()
            thisEntry.id = entryId
            thisEntry.status = 'pending'
            thisEntry.pickerId = pickerId
            thisEntry.lockId = lockId
            thisEntry.date = date.format()
            thisEntry.startTime = startTime.format()
            thisEntry.openTime = openTime.format()
            thisEntry.videoUrl = videoUrl
            thisEntry.reviewerId = ''
            thisEntry.created = dayjs().format()
            await updateEntry(thisEntry)
            enqueueSnackbar('New entry created. Requires mod approval.')
            refreshData()
            cancelEdit()
            toggleOpen()
        } else {
            entry.status = isMod ? status : 'pending'
            entry.reviewerId = isMod ? reviewerId : ''
            entry.pickerId = pickerId
            entry.lockId = lockId
            entry.date = date.format()
            entry.startTime = startTime.format()
            entry.openTime = openTime.format()
            entry.videoUrl = videoUrl
            await updateEntry(entry)
            enqueueSnackbar('Entry updated.')
            refreshData()
            toggleOpen()
            endEdit()
        }
        entriesUpdate()
    }

    const cancelEdit = useCallback(() => {
        if (isNew) {
            setLock(null)
            setLockURL('')
            setvideoUrl('')
            setDate(dayjs())
            setStartTime(dayjs('1970-01-01'))
            setOpenTime(dayjs('1970-01-01'))
            toggleOpen()
        }
        endEdit()
    }, [endEdit, isNew, toggleOpen])

    const [overlayIsOpen, setOverlayIsOpen] = useState(false)
    const handleOverlayClose = useCallback(() => {
        setOverlayIsOpen(false)
    }, [])
    const handleOverlayOpen = useCallback(() => {
        setOverlayIsOpen(true)
    }, [])

    const [commentOpen, setCommentOpen] = useState(false)
    const handleOpenComment = useCallback(() => setCommentOpen(true), [])
    const handleCloseComment = useCallback(() => setCommentOpen(false), [])
    const targetStatus = 'pending'

    const addCommentAction = useCallback(async (commentText, status) => {
        entry.status = status
        if (entry.comments) {
            entry.comments?.push(commentText)
        } else {
            entry.comments = [commentText]
        }
        await updateEntry(entry)
        enqueueSnackbar('Entry updated')
        refreshData()
        cancelEdit()
    }, [cancelEdit, entry, refreshData, updateEntry])

    return (

        <div style={{margin: 20}}>
            <div style={{display: 'flex', placeItems: 'center', width: '90%'}}>
                <TextField variant='outlined' color='secondary' label='Picker'
                           value={pickerName}
                />
                {lockName &&
                    <div style={{display: 'flex', placeItems: 'center', marginLeft: 20, width: '100%'}}>
                        <div style={beltStyle}/>
                        <div style={{width: '90%', display: 'flex', fontSize: '1.1rem'}}>
                            <ListItemText
                                primary={lockName}
                                primaryTypographyProps={{fontWeight: 600}}
                                secondary={lockVersion}
                                secondaryTypographyProps={{}}
                                style={{padding: '0px 0px 0px 10px'}}
                            />
                        </div>
                    </div>
                }
            </div>

            <div style={{display: 'flex', placeItems: 'center', marginTop: 25}}>
                <TextField variant='outlined'
                           color='secondary'
                           label='Lock URL'
                           value={lockURL}
                           onChange={processURL}
                           InputProps={{
                               startAdornment: (
                                   <InputAdornment position='start'>
                                       <LockIcon style={{fontSize: 'medium'}}/>
                                   </InputAdornment>
                               )
                           }}
                           style={{width: '90%'}}
                           size='small'
                           error={lockURLError}
                           helperText={lockURLHelperText}
                />
                <div>
                    <Button type='text' style={buttonStyle}
                            sx={{color: '#fff', marginBottom: '10px'}}
                            onClick={handleOverlayOpen}>
                        <InfoIcon style={{fontSize: 'large'}}/>
                    </Button>
                    <Button type='text'
                            style={buttonStyle}
                            disabled={!lockURLValid}>
                        <a href={lockURL} target='_blank' rel='noreferrer'>
                            <LaunchIcon style={{fontSize: 'large', color: lockLaunchColor}}/></a>
                    </Button>
                </div>
            </div>
            <div style={{display: 'flex', placeItems: 'center', marginTop: 25}}>
                <TextField variant='outlined'
                           color='secondary'
                           label='Video URL'
                           value={videoUrl}
                           onChange={(newValue) => setvideoUrl(newValue.target.value)}
                           InputProps={{
                               startAdornment: (
                                   <InputAdornment position='start'>
                                       <VideocamIcon style={{fontSize: 'large'}}/>
                                   </InputAdornment>
                               )
                           }}
                           size='small'
                           style={{width: '90%'}}
                           error={videoUrlError}
                           helperText={videoURLHelperText}

                />
                <Button type='text'
                        style={buttonStyle}
                        disabled={!videoUrlValid}>
                    <a href={videoUrl} target='_blank' rel='noreferrer'><LaunchIcon
                        style={{fontSize: 'large', color: videoLaunchColor}}/></a>
                </Button>
            </div>
            <br/>

            <div style={{marginTop: 30}}>
                <DatePicker
                    label='Pick date'
                    value={date}
                    onChange={(newValue) => setDate(newValue)}
                    sx={{width: 250}}
                    disableFuture
                />

                <div style={{display: 'flex'}}>
                    <div style={{margin: '10px 1px 0px 0px', fontSize: '0.9rem', lineHeight: '1.4rem'}}>
                        Picking starts<br/>
                        <DesktopTimePicker views={['minutes', 'seconds']}
                                           view='seconds'
                                           format='mm:ss'
                                           timeSteps={{minutes: 1, seconds: 1}}
                                           sx={{width: 120, marginRight: '10px'}}
                                           value={startTime}
                                           onChange={(newValue) => setStartTime(newValue)}
                        />
                    </div>
                    <div style={{margin: '10px 1px 0px 0px', fontSize: '0.9rem', lineHeight: '1.4rem'}}>
                        Lock open<br/>
                        <DesktopTimePicker views={['minutes', 'seconds']}
                                           view='seconds'
                                           format='mm:ss'
                                           timeSteps={{minutes: 1, seconds: 1}}
                                           sx={{width: 120}}
                                           value={openTime}
                                           onChange={(newValue) => setOpenTime(newValue)}
                        />

                    </div>
                </div>

                <div style={{height: 15, display: 'flex'}}/>
                <TextField variant='outlined'
                           color='secondary'
                           label='Total Time'
                           value={openTime - startTime > 0
                               ? formatTime((openTime - startTime) / 1000)
                               : formatTime(0)
                           }
                           style={{width: 120, marginRight: 10}}
                           error={timeError}
                           helperText={timeHelperText}
                />
                <TextField variant='outlined'
                           color='secondary'
                           label='(Best Time)'
                           value={formatTime(bestTime ? bestTime : 0)}
                           style={{width: 120, alignItems: 'center'}}
                           disabled
                />
            </div>

            <div style={{width: '100%', textAlign: 'right', marginTop: 14}}>
                {(!isMod && !isNew) &&
                    <div style={{fontSize: '1rem', lineHeight: '1.4rem', marginBottom: 8}}>
                        Note: changed entries must<br/> be re-approved by mods
                    </div>
                }
                {(isNew) &&
                    <div style={{fontSize: '1rem', lineHeight: '1.4rem', marginBottom: 8}}>
                        Note: new entries must be approved<br/> by mods before they become visible
                    </div>
                }
                <Button variant='text' style={{color: '#999'}} onClick={cancelEdit}>
                    Cancel
                </Button>

                {entry?.status !== 'rejected' &&
                    <Button variant='text'
                            style={{color: saveEntryColor}}
                            disabled={!validEntry}
                            onClick={saveEntry}>
                        Save
                    </Button>
                }
                {entry?.status === 'rejected' &&
                    <Button variant='text'
                            style={{color: saveEntryColor}}
                            disabled={!validEntry}
                            onClick={handleOpenComment}>
                        Resubmit
                    </Button>
                }
            </div>

            <Backdrop
                sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={overlayIsOpen} onClick={handleOverlayClose}
            >
                <LpuCopyLinkInfo/>
            </Backdrop>
            <Backdrop sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                      open={commentOpen} onClick={null}>
                <EntryCommentAdd handleCloseComment={handleCloseComment}
                                 addCommentAction={addCommentAction}
                                 targetStatus={targetStatus}
                                 commenter={profile?.username}
                />
            </Backdrop>

        </div>
    )
}

export default EditEntry

function genHexString(len) {
    const hex = '0123456789ABCDEF'
    let output = ''
    for (let i = 0; i < len; ++i) {
        output += hex.charAt(Math.floor(Math.random() * hex.length))
    }
    return output.toLowerCase()
}

function isValidHttpUrl(string) {
    let url
    try {
        url = new URL(string)
    } catch (_) {
        return false
    }
    return url.protocol === 'http:' || url.protocol === 'https:'
}

