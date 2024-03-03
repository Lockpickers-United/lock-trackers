import React, {useContext, useState, useCallback, useMemo} from 'react'
import TextField from '@mui/material/TextField'
import {ListItemText} from '@mui/material'
import {DatePicker} from '@mui/x-date-pickers/DatePicker'
import {TimePicker} from '@mui/x-date-pickers/TimePicker'
import dayjs from 'dayjs'
import formatTime from '../util/formatTime.jsx'
import DataContext from '../context/DataContext'
import VideocamIcon from '@mui/icons-material/Videocam'
import LaunchIcon from '@mui/icons-material/Launch'
import InputAdornment from '@mui/material/InputAdornment'
import LockIcon from '@mui/icons-material/Lock'
import entryName from '../util/entryName'
import belts from '../data/belts'
import AuthContext from '../app/AuthContext'
import DBContext from '../app/DBContext'
import Button from '@mui/material/Button'

const EditEntry = ({entry, toggleOpen, entriesUpdate, endEdit}) => {
    const {bestTimes, getLockFromId = []} = useContext(DataContext)
    const {user, isLoggedIn} = useContext(AuthContext)
    const {profile, updateEntry} = useContext(DBContext)
    const {DCUpdate, isMod = []} = useContext(DataContext)

    const isNew = !entry
    const [entryId] = useState(entry && entry.id ? entry.id : genHexString(8))
    const [status] = useState(entry ? entry.status : 'pending')
    const [pickerId] = useState(entry ? entry?.pickerId : user?.uid)

    console.log('pickerId', pickerId)

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
    const processURL = useCallback(event => {
        const {value} = event.target
        setLockURL(value)
        const thisId = lockRegex.test(value)
            ? value.match(lockRegex)[1]
            : ''
        setLock(getLockFromId(thisId))
        setLockId(thisId)

    }, [getLockFromId, lockRegex])
    const {color: backgroundColor} = belts[lockBelt] || {}
    const beltStyle = {
        width: 8,
        height: 35,
        backgroundColor
    }

    const [videoUrl, setvideoUrl] = useState(entry ? entry.videoUrl : '')

    const bestTime = entry ? bestTimes.get(lockId) : 0

    const [date, setDate] = useState(entry && entry.date ? dayjs(entry.date) : dayjs())
    const [startTime, setStartTime] = useState(entry && entry.startTime ? dayjs(entry.startTime) : dayjs('1970-01-01'))
    const [openTime, setOpenTime] = useState(entry && entry.openTime ? dayjs(entry.openTime) : dayjs('1970-01-01'))
    const timeError = (openTime - startTime) < 0
    const timeHelperText = timeError ? 'Total time must be positive' : ''

    const lockURLError = !!lockURL && !lockRegex.test(lockURL)
    const lockURLHelperText = lockURLError ? 'Unable to find lock ID in URL' : 'paste lpubelts.com URL here to set lock'
    const lockURLValid = isValidHttpUrl(lockURL)
    const lockLaunchColor = lockURLValid ? '#fff' : '#666'

    const videoUrlError = !!videoUrl && !isValidHttpUrl(videoUrl)
    const videoURLHelperText = videoUrlError ? 'Video URL is not valid' : ''
    const videoUrlValid = isValidHttpUrl(videoUrl)
    const videoLaunchColor = videoUrlValid ? '#fff' : '#666'
    const buttonStyle = {border: 0, padding: 0, marginRight: 0, minWidth: 33}

    const validEntry = lockURLValid && videoUrlValid && (openTime - startTime) > 0 && !timeError
    const saveEntryColor = validEntry ? '#0a0' : '#666'

    function saveEntry() {
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
            thisEntry.reviewer = ''
            thisEntry.created = dayjs().format()
            updateEntry(thisEntry)
            toggleOpen()
        } else {
            entry.status = isMod ? status : 'pending'
            entry.pickerId = pickerId
            entry.lockId = lockId
            entry.date = date.format()
            entry.startTime = startTime.format()
            entry.openTime = openTime.format()
            entry.videoUrl = videoUrl
            updateEntry(entry)
            toggleOpen()
            endEdit()
        }
        DCUpdate()
        entriesUpdate()
    }

    function cancelEdit() {
        //entriesUpdate()
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
    }

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
                <Button type='text' style={buttonStyle} sx={{color: lockLaunchColor}}><LaunchIcon
                    style={{fontSize: 'large'}}/></Button>
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
                        sx={{color: videoLaunchColor}}
                        target={'_blank'}
                        link={videoUrl}
                        disabled={!videoUrlValid}>
                    <LaunchIcon style={{fontSize: 'large'}}/>
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
                        <TimePicker views={['minutes', 'seconds']}
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
                        <TimePicker views={['minutes', 'seconds']}
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
                           value={formatTime((openTime - startTime) / 1000)}
                           style={{width: 120, marginRight: 10}}
                           error={timeError}
                           helperText={timeHelperText}
                />
                <TextField variant='outlined'
                           color='secondary'
                           label='(Best Time)'
                           value={formatTime(bestTime)}
                           style={{width: 120, alignItems: 'center'}}
                           disabled
                />
            </div>

            <div style={{width: '100%', textAlign: 'right'}}>
                {!isMod &&
                    <div style={{fontSize: '1rem', lineHeight: '1.4rem', marginBottom: 8}}>
                        Note: changed entries must<br/> be re-approved by mods
                    </div>
                }
                <Button variant='text' style={{color: '#999'}} onClick={cancelEdit}>
                    Cancel
                </Button>
                <Button variant='text'
                        style={{color: saveEntryColor}}
                        disabled={!validEntry}
                        onClick={saveEntry}>
                    Save
                </Button>
            </div>
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

