import React, {useContext, useState, useCallback, useMemo} from 'react'
import Backdrop from '@mui/material/Backdrop'
import belts from '../data/belts'
import Button from '@mui/material/Button'
import entryName from '../util/entryName'
import InfoIcon from '@mui/icons-material/Info'
import InputAdornment from '@mui/material/InputAdornment'
import LaunchIcon from '@mui/icons-material/Launch'
import LockIcon from '@mui/icons-material/Lock'
import WatchlistLpuCopyLinkInfo from './WatchlistLpuCopyLinkInfo.jsx'
import TextField from '@mui/material/TextField'
import ListItemText from '@mui/material/ListItemText'
import WatchlistButton from './WatchlistButton.jsx'
import LoadingContextLB from '../lockbazaarContext/LoadingContextLB.jsx'
import WatchlistAddAllButton from './WatchlistAddAllButton.jsx'
const WatchlistAddLPUbelts = () => {
    const {getLockFromId, getLockLinesInfoFromId} = useContext(LoadingContextLB)

    const [lockURL, setLockURL] = useState('')
    const [lockId, setLockId] = useState('')
    const [lock, setLock] = useState(null)
    const lockName = lock ? entryName(lock, 'short') : ''
    const lockVersion = lock ? lock.version : ''
    const lockBelt = lock ? lock.belt : ''
    const lockRegex = useMemo(() => /id=(\w{8})/, [])
    const samelines = getLockLinesInfoFromId(lockId)

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


    const {color: backgroundColor} = belts[lockBelt] || {}
    const beltStyle = {
        width: 8,
        height: 35,
        backgroundColor
    }

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
                        <a href={lockURL} target='_blank' rel='noreferrer'>
                            <LaunchIcon style={{fontSize: 'large', color: lockLaunchColor}}/></a>
                    </Button>
                </div>
            </div>
            <br/>

            <div style={{display: 'flex', placeItems: 'center'}}>
                {lockName &&
                    <div style={{display: 'flex', placeItems: 'center', width: '100%'}}>
                        {lock.makeModels.length === 1 &&
                            <table style={{}}>
                                <tbody>
                                <tr>
                                    <td style={beltStyle}/>
                                    <td>
                                        <ListItemText
                                            primary={lockName}
                                            primaryTypographyProps={{fontWeight: 600}}
                                            secondary={lockVersion}
                                            secondaryTypographyProps={{}}
                                            style={{padding: '0px 0px 0px 10px'}}
                                        />
                                    </td>
                                    <td style={{paddingLeft:10}}>
                                        <WatchlistButton id={lockId} dense={true}/>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        }
                        {samelines.length > 1 &&
                            <table style={{width: '100%'}}>
                                <tbody>
                                <tr>
                                    <td style={beltStyle} rowSpan={samelines.length + 1}/>
                                    <td>
                                        <ListItemText
                                            primary={lockName}
                                            primaryTypographyProps={{fontWeight: 600}}
                                            secondary={lockVersion}
                                            secondaryTypographyProps={{}}
                                            style={{padding: '0px 0px 0px 10px'}}
                                        />
                                        <table style={{}}>
                                            <tbody>
                                            {samelines.map((sameline, index) =>
                                                <tr key={index} style={{}}>
                                                    <td style={{paddingLeft:20}}>
                                                        <ListItemText
                                                            primary={sameline.name}
                                                            primaryTypographyProps={{fontWeight: 600}}
                                                            style={{padding: '0px 0px 0px 10px'}}
                                                        />
                                                    </td>
                                                    <td style={{paddingLeft:10}}>
                                                        <WatchlistButton id={sameline.id} dense={true}/>
                                                    </td>
                                                </tr>
                                            )}
                                            </tbody>
                                        </table>

                                    </td>
                                    <td style={{verticalAlign:'top'}}>
                                        <WatchlistAddAllButton entry={lock} fontSize={'small'}/>
                                    </td>
                                </tr>


                                </tbody>
                            </table>
                        }

                    </div>
                }
            </div>


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