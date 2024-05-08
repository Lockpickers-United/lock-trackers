import React, {useContext, useState, useCallback, useMemo} from 'react'
import Backdrop from '@mui/material/Backdrop'
import Button from '@mui/material/Button'
import InfoIcon from '@mui/icons-material/Info'
import InputAdornment from '@mui/material/InputAdornment'
import LaunchIcon from '@mui/icons-material/Launch'
import LockIcon from '@mui/icons-material/Lock'
import WatchlistLpuCopyLinkInfo from './WatchlistLpuCopyLinkInfo.jsx'
import TextField from '@mui/material/TextField'
import LoadingContextLB from '../lockbazaarContext/LoadingContextLB.jsx'
import WatchlistAddLockEntry from './WatchlistAddLockEntry.jsx'

const WatchlistAddLPUbelts = () => {
    const {getLockFromId} = useContext(LoadingContextLB)

    const [lockURL, setLockURL] = useState('')
    const [lockId, setLockId] = useState('')
    const [lock, setLock] = useState(null)
    const lockRegex = useMemo(() => /id=(\w{8})/, [])

    const processURL = useCallback(event => {
        const {value} = event.target
        setLockURL(value)
        const thisId = lockRegex.test(value)
            ? value.match(lockRegex)[1]
            : ''
        const thisLock = getLockFromId(thisId)
        setLock(thisLock ? thisLock : null)
        setLockId(thisId)
    }, [getLockFromId, lockRegex])

    const lpuURL = lockId ? `https://lpubelts.com/#/locks?id=${lockId}` : ''

    const lockURLError = !!lockURL && (!lockRegex.test(lockURL) || !lock)
    const lockURLHelperText = lockURLError ? 'Unable to find valid lock ID in URL' : 'Paste lpubelts.com URL here to choose a lock'
    const lockURLValid = isValidHttpUrl(lockURL) && lock
    const lockLaunchColor = lockURLValid ? '#fff' : '#666'

    const buttonStyle = {border: 0, padding: 0, marginRight: 0, minWidth: 33}


    const [overlayIsOpen, setOverlayIsOpen] = useState(false)
    const handleOverlayClose = useCallback(() => {
        setOverlayIsOpen(false)
    }, [])
    const handleOverlayOpen = useCallback(() => {
        setOverlayIsOpen(true)
    }, [])


    return (

        <div style={{margin: 0, width: '100%', textAlign: 'left'}}>

            <div style={{display: 'flex', placeItems: 'center'}}>
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
                        <a href={lpuURL} target='_blank' rel='noreferrer'>
                            <LaunchIcon style={{fontSize: 'large', color: lockLaunchColor}}/></a>
                    </Button>
                </div>
            </div>
            <br/>

            {lock &&
                <WatchlistAddLockEntry lock={lock}/>
            }

            <Backdrop
                sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={overlayIsOpen} onClick={handleOverlayClose}
            >
                <WatchlistLpuCopyLinkInfo/>
            </Backdrop>

        </div>
    )
}

export default WatchlistAddLPUbelts


function isValidHttpUrl(string) {
    let url
    try {
        url = new URL(string)
    } catch (_) {
        return false
    }
    return url.protocol === 'http:' || url.protocol === 'https:'
}