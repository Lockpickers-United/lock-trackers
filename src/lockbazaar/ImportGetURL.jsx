import React, {useState, useCallback, useMemo, useContext, useDeferredValue} from 'react'
import Backdrop from '@mui/material/Backdrop'
import Button from '@mui/material/Button'
import InfoIcon from '@mui/icons-material/Info'
import InputAdornment from '@mui/material/InputAdornment'
import LaunchIcon from '@mui/icons-material/Launch'
import LockIcon from '@mui/icons-material/Lock'
import WatchlistLpuCopyLinkInfo from './WatchlistLpuCopyLinkInfo.jsx'
import TextField from '@mui/material/TextField'
import WatchlistAddLockEntry from './WatchlistAddLockEntry.jsx'
import {useDebounce} from 'use-debounce'
import useData from '../util/useData.jsx'
import LoadingContextLB from '../lockbazaarContext/LoadingContextLB.jsx'
import DBContext from '../app/DBContext.jsx'
import {enqueueSnackbar} from 'notistack'
import LoadingDisplay from '../util/LoadingDisplay.jsx'
import AuthContext from '../app/AuthContext.jsx'
import ListContext from '../context/ListContext.jsx'

const ImportGetURL = () => {
    const {updateProfile, profile = {}} = useContext(DBContext)
    const {getLockFromId} = useContext(LoadingContextLB)
    const {authLoaded, isLoggedIn} = useContext(AuthContext)

    const {expanded, setExpanded} = useContext(ListContext)
    const defExpanded = useDeferredValue(expanded)

    const idRegex = useMemo(() => /profile\/(\w{28})\W*/, [])

    const [profileURL, setProfileURL] = useState('')
    const [profileId, setProfileId] = useState('')

    const processURL = useCallback(url => {
        setProfileURL(url)
        const thisId = idRegex.test(url)
            ? url.match(idRegex)[1]
            : null
        setProfileId(thisId)
    }, [idRegex])

    const handleChange = useCallback(event => {
        const {value} = event.target
        processURL(value)
    }, [processURL])

    const handleSave = useCallback(async () => {
        const localProfile = {...profile}
        localProfile.LPUBeltsProfile = profileURL
        try {
            updateProfile(localProfile)
            enqueueSnackbar('Profile updated')
        } catch (ex) {
            console.error('Error while updating profile', ex)
            enqueueSnackbar('Error while updating profile', ex)
        }
    }, [profile, profileURL, updateProfile])

    const handleLinkClick = (event) => {
        event.preventDefault()
        window.open('https://lpubelts.com/#/profile/view', '_blank', 'noopener,noreferrer')
    }

    const [debouncedValue] = useDebounce(profileId, 250)

    const token = '81750a99'
    const url = (authLoaded && isLoggedIn) ? `https://explore.lpubelts.com/wishlist/?token=${token}&id=${debouncedValue}` : ''
    const {data, loading, error} = useData(debouncedValue ? {url} : {})
    const jsonLoaded = (!loading && !error && !!data)
    const lpuWishlist = (authLoaded && isLoggedIn && jsonLoaded) ? data[1].wishlist : []
    const lpuWishlistStatus = jsonLoaded ? data[1].status : ''

    const profileSuccess = lpuWishlistStatus === '200 OK'
    const profileNoUser = lpuWishlistStatus === '418 No Such User'
    const profileAuthError = lpuWishlistStatus === '401 Unauthorized'

    const wishlistLocks = lpuWishlist
        ? lpuWishlist.map((id) => {
            return getLockFromId(id)
        })
        : []

    /*
    if(lpuWishlistStatus) console.log(lpuWishlistStatus)
    if (profile) console.log('LPUlocks username', profile.username)
    if (debouncedValue) console.log('LPUbelts id', debouncedValue)
    if (wishlistLocks) console.log('wishlistLocks', wishlistLocks)
    */

    const lpuUrl = debouncedValue ? `https://lpubelts.com/#/profile/${profileId}` : ''

    const profileURLError = !!profileURL && (!idRegex.test(profileURL) || profileNoUser || profileAuthError)
    const profileURLHelperText = profileURLError ? 'Unable to find valid Profile ID in URL' : 'Paste lpubelts.com Profile URL here to find your wishlist'
    const profileURLValid = isValidHttpUrl(profileURL) && profileId
    const lockLaunchColor = profileURLValid ? '#fff' : '#666'

    const buttonStyle = {border: 0, padding: 0, marginRight: 0, minWidth: 33}

    const [overlayIsOpen, setOverlayIsOpen] = useState(false)
    const handleOverlayClose = useCallback(() => {
        setOverlayIsOpen(false)
    }, [])
    const handleOverlayOpen = useCallback(() => {
        setOverlayIsOpen(true)
    }, [])

    return (
        <React.Fragment>
            {isLoggedIn &&
                <div style={{margin: 0, width: '100%', textAlign: 'left'}}>
                    <div style={{display: 'flex', placeItems: 'center', marginBottom: 0}}>
                        <TextField variant='outlined'
                                   color='secondary'
                                   label='Profile URL'
                                   value={profileURL}
                                   onChange={handleChange}
                                   InputProps={{
                                       startAdornment: (
                                           <InputAdornment position='start'>
                                               <LockIcon style={{fontSize: 'medium'}}/>
                                           </InputAdornment>
                                       )
                                   }}
                                   style={{width: '90%'}}
                                   size='small'
                                   error={profileURLError}
                                   helperText={profileURLHelperText}
                        />
                        <div>
                            <Button type='text' style={buttonStyle}
                                    sx={{color: '#fff', marginBottom: '10px'}}
                                    onClick={handleOverlayOpen}>
                                <InfoIcon style={{fontSize: 'large'}}/>
                            </Button>
                            <Button type='text'
                                    style={buttonStyle}
                                    disabled={!profileURLValid}>
                                <a href={lpuUrl} target='_blank' rel='noreferrer'>
                                    <LaunchIcon style={{fontSize: 'large', color: lockLaunchColor}}/></a>
                            </Button>
                        </div>
                    </div>

                    <div style={{width: '100%', textAlign: 'right'}}>

                        {(authLoaded && isLoggedIn && !profile?.LPUBeltsProfile && !profileURL) &&
                            <Button variant='text' onClick={handleLinkClick}>
                                View Profile on LPUbelts.com
                            </Button>
                        }

                        {(profile?.LPUBeltsProfile && !profileURL) &&
                            <Button variant='text' disabled={!profile?.LPUBeltsProfile} onClick={() => {
                                processURL(profile?.LPUBeltsProfile)
                            }}>
                                Get Link from Profile
                            </Button>
                        }

                        {!profileURLError && profileURL && (profileURL !== profile?.LPUBeltsProfile) &&
                            <Button variant='text' disabled={!profileSuccess} onClick={() => {
                                handleSave()
                            }}>
                                Save Link to Profile
                            </Button>
                        }

                    </div>

                    {(profileSuccess && !lpuWishlist) &&
                        <div style={{
                            fontSize: '1.1rem',
                            lineHeight: '1.4rem',
                            textAlign: 'center',
                            padding: '30px 70px'
                        }}>
                            There are no items in your LPUbelts wishlist.
                        </div>
                    }

                    {(lpuWishlistStatus && profileAuthError) &&
                        <div>Something went wrong. Please try again later. {lpuWishlistStatus}</div>
                    }

                    {(loading) &&
                        <LoadingDisplay/>
                    }

                    <div style={{height:30}}/>
                    {jsonLoaded && wishlistLocks.map((entry) =>
                        <WatchlistAddLockEntry
                            key={entry.id}
                            lock={entry}
                            expanded={entry.id === defExpanded}
                            onExpand={setExpanded}
                        />
                    )}


                    <Backdrop
                        sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                        open={overlayIsOpen} onClick={handleOverlayClose}
                    >
                        <WatchlistLpuCopyLinkInfo/>
                    </Backdrop>

                </div>
            }
        </React.Fragment>
    )
}

export default ImportGetURL

function isValidHttpUrl(string) {
    let url
    try {
        url = new URL(string)
    } catch (_) {
        return false
    }
    return url.protocol === 'http:' || url.protocol === 'https:'
}