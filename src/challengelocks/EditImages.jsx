import React, {useCallback, useContext, useEffect, useMemo, useState} from 'react'
import Button from '@mui/material/Button'
import useWindowSize from '../util/useWindowSize.jsx'
import Dialog from '@mui/material/Dialog'
import {useLocation, useNavigate} from 'react-router-dom'
import DataContext from '../context/DataContext.jsx'
import FilterContext from '../context/FilterContext.jsx'
import LoadingDisplay from '../misc/LoadingDisplay.jsx'
import Dropzone from '../formUtils/Dropzone.jsx'
import TextField from '@mui/material/TextField'
import {filterProfanity} from '../util/sanitizeValues.js'
import {postData} from '../formUtils/postData.jsx'
import {enqueueSnackbar} from 'notistack'
import AuthContext from '../app/AuthContext.jsx'
import DBContext from '../app/DBContext.jsx'
import Link from '@mui/material/Link'
import SignInButton from '../auth/SignInButton.jsx'
import SubNav from '../nav/SubNav.jsx'
import {nodeServerUrl} from '../data/dataUrls.js'
import queryString from 'query-string'
import {isDeepEqual} from '../util/isDeepEqual.js'
import {MultipleContainers} from './dnd/MultipleContainers.jsx'
import {optionsCL} from '../data/subNavOptions.js'

export default function EditImages({profile, user, isSubmit = false}) {

    const {authLoaded} = useContext(AuthContext)
    const {adminEnabled, allEntries, getEntryFromId, isMod} = useContext(DataContext)

    const {refreshEntries, updateVersion, updateProfile} = useContext(DBContext)

    const location = useLocation()
    const searchParams = queryString.parse(location.search)
    delete searchParams.id

    const {filters} = useContext(FilterContext)
    const lockId = filters.id
    const lock = useMemo(() => getEntryFromId(lockId) || {}, [getEntryFromId, lockId])

    if (!lock || !lockId) return null
    const notValidLock = (Object.keys(allEntries).length > 0 && Object.keys(lock).length === 0)
    const lockHasMedia = lock.media && lock.media.length > 0
    const lockNavigate = `/challengelocks?id=${lockId}&${queryString.stringify(searchParams)}`

    const showMediaContainers = useMemo(() => {
        return (lock.media && lock.media.length > 0) || (adminEnabled && lock.pendingMedia && lock.pendingMedia.length > 0)
    }, [adminEnabled, lock])

    const containerList = useMemo(() => isMod ? {
        A: 'Current Media',
        B: 'Pending Media'
    } : {A: 'Current Media'}, [isMod])
    const [containerItems, setContainerItems] = useState({A: [], B: []})
    const [originalItems, setOriginalItems] = useState(
        {A: [], B: []}
    )
    useEffect(() => {
        if (lock?.media?.length > 0 || lock?.pendingMedia?.length > 0) {
            setOriginalItems({
                A: lock?.media?.map(m => m.thumbnailUrl) || [],
                B: lock?.pendingMedia?.map(m => m.thumbnailUrl) || []
            })
        }
    }, [lock])

    const [newMedia, setNewMedia] = useState([])
    const [newMainPhoto, setNewMainPhoto] = useState([])
    const [form, setForm] = useState({})
    const [uploading, setUploading] = useState(false)
    const [contentChanged, setContentChanged] = useState(false)
    const [response, setResponse] = useState(undefined)
    const [uploadError, setUploadError] = useState(undefined)
    const currentPhotoCredit = lockHasMedia > 0 && lock.media[0].title && lock.media[0].title !== 'By: Unknown'
        ? lock.media[0].title?.replace('By: ', '')
        : undefined
    const needMainPhoto = containerItems.A?.length === 0 && newMainPhoto?.length === 0
    const needPhotoCredit = newMedia.length > 0 && !form.photoCredit
    const existingMediaChanged = !isDeepEqual(originalItems, containerItems)
    const uploadable = (existingMediaChanged || contentChanged)
        && (!needMainPhoto || isMod)
        && !needPhotoCredit
        && !uploading

    useEffect(() => {
        console.log('originalItems', originalItems)
        console.log('containerItems', containerItems)
    }, [originalItems, containerItems])

    useEffect(() => {
        setForm({
            photoCredit: profile?.lastPhotoCredit || currentPhotoCredit || profile?.username || undefined,
            existingMediaChanged,
            isSubmit,
            id: lockId
        })
    }, [currentPhotoCredit, existingMediaChanged, isSubmit, lock, lockHasMedia, lockId, profile])

    const getHighlightColor = useCallback(field => {
        return !form[field]
            ? '#d00'
            : '#090'
    }, [form])

    const handleFormChange = useCallback((event) => {
        let {name, value} = event.target
        setForm({...form, [name]: filterProfanity(value)})
    }, [form])

    const handleDroppedFiles = useCallback((allFiles, zoneId = 'dropzone') => {
        if (zoneId === 'mainPhoto') {
            setNewMainPhoto(allFiles)
        } else {
            setNewMedia(allFiles)
        }
        setContentChanged(true)
    }, [])

    const handlePhotoCredit = useCallback(async () => {
        try {
            if (form.photoCredit && form.photoCredit !== profile?.lastPhotoCredit) {
                const localProfile = {...profile, lastPhotoCredit: form.photoCredit}
                await updateProfile(localProfile)
            }
        } catch (error) {
            console.error('Couldn\'t set lastPhotoCredit on profile', error)
        }
    }, [form, profile, updateProfile])

    const handleSubmit = async () => {
        setUploading(true)

        const addedMedia = [...newMainPhoto, ...newMedia]
        const formCopy = {
            ...form,
            newPendingMedia: addedMedia.length > 0 && isSubmit && !isMod,
            currentMedia: containerItems.A,
            pendingMedia: containerItems.B
        }

        console.log('handleSubmit formCopy', formCopy)

        const formData = new FormData()
        Object.keys(formCopy).forEach(key => {
            formData.append(key, formCopy[key])
        })

        if (addedMedia?.length > 0) {
            const prefix = lock.name?.replace('/', '+')
            const suffix = formCopy.photoCredit?.replace('/', '+')
            const uploadsDir = `${prefix}-${suffix}-${lockId}`.toLowerCase()

            addedMedia?.forEach((file) => {
                const {base, ext} = separateBasename(file.name)
                formData.append('files', file, `${uploadsDir}/${prefix}_${base}_${suffix}${ext}`.toLowerCase())
            })
        }

        const url = `${nodeServerUrl}/update-lock-media`

        try {
            try {
                await postData({user, url, formData, snackBars: true, timeoutDuration: 25000}).then(response => {
                    setResponse(response)
                })
            } catch (error) {
                console.log('Error creating request', error)
            }
            await refreshEntries()
            await updateVersion()
        } catch (error) {
            setUploadError(`${error}`.replace('Error: ', ''))
            enqueueSnackbar(`Error creating request: ${error}`, {variant: 'error', autoHideDuration: 3000})
            throw error
        } finally {
            newMedia?.forEach(file => URL.revokeObjectURL(file.preview))
            setUploading(false)
            setForm(formCopy)
            await handlePhotoCredit()
        }
        setUploading(false)
    }

    const pendingMediaAuthors = lock.pendingMedia?.reduce((acc, media) => {
        if (media.title && !acc.includes(media.title.replace(/By: /, ''))) {
            acc.push(media.title.replace(/By: /, ''))
        }
        return acc
    }, [])

    console.log('pendingMediaAuthors', pendingMediaAuthors)

    const navigate = useNavigate()
    const handleLockClick = useCallback(() => {
        navigate(`/challengelocks?id=${lockId}&${queryString.stringify(searchParams)}`)
    }, [lockId, navigate, searchParams])

    const {width, isMobile} = useWindowSize()
    const flexStyle = width < 500 ? 'block' : 'flex'
    const paddingLeft = !isMobile ? 20 : 8


    const nameTextStyle = {fontSize: '1.5rem', lineHeight: '1.7rem', fontWeight: 600, marginLeft: 0}
    const makerTextStyle = {fontSize: '1.2rem', lineHeight: '1.4rem', marginLeft: 0, marginTop: 10}

    const headerStyle = {fontSize: '1.2rem', fontWeight: 600, marginBottom: 5, paddingLeft: 2, width: '100%'}
    const optionalHeaderStyle = {fontSize: '1.1rem', fontWeight: 400, marginBottom: 5, paddingLeft: 2, color: '#fff'}

    const requiredHeaderStyle = {backgroundColor: needMainPhoto ? '#c00' : 'inherit'}

    const reqStyle = {height: 4, borderRadius: 2}

    return (

        <React.Fragment>
            <SubNav options={optionsCL} defaultValue={'Challenge Locks'}/>

            <div style={{
                maxWidth: 720, backgroundColor: '#222',
                marginLeft: 'auto', marginRight: 'auto', marginTop: 16, marginBottom: 46,
                padding: `16px ${paddingLeft}px 30px ${paddingLeft}px`, lineHeight: '1.5rem'
            }}>

                <div style={{
                    fontSize: '1.2rem',
                    fontWeight: 700,
                    marginBottom: 10
                }}>{isSubmit ? 'Submit' : 'Edit'} Challenge Lock Images
                </div>

                <div style={{margin: '10px 0px 20px 0px', lineHeight: '1.5rem'}}>
                    <div style={{display: flexStyle, paddingBottom: 15, borderBottom: '1px solid #ccc'}}>
                        <div style={{display: 'flex', alignItems: 'center', flexGrow: 1, marginRight: 10}}>
                            <div>
                                <Link onClick={handleLockClick} style={{...nameTextStyle, cursor: 'pointer'}}>
                                    {lock?.name}
                                </Link>
                                <div style={makerTextStyle}>By: {lock.maker}</div>
                            </div>
                        </div>
                    </div>
                </div>

                {showMediaContainers &&
                    <div style={{marginTop: 10}}>
                        <MultipleContainers lock={lock}
                                            setContainerItems={setContainerItems}
                                            containerList={containerList}
                                            disabled={isSubmit && !isMod}
                        />
                    </div>
                }

                {pendingMediaAuthors?.length > 0 && !adminEnabled &&
                    <div style={{fontSize: '1.1rem', marginTop: lock.media ? 5 : 20, color: '#ccc'}}>
                        (
                        {lock.media ? 'Additional images' : 'Images'}&nbsp;
                        {pendingMediaAuthors.length === 1 ? `by ${pendingMediaAuthors[0]}` : `by ${pendingMediaAuthors.length} users`} pending
                        review)
                    </div>
                }

                <div style={{display: flexStyle, marginTop: 20}}>
                    {(needMainPhoto || newMainPhoto.length > 0) &&
                        <div style={{marginTop: 0, marginRight: 20}}>
                            <div style={{...optionalHeaderStyle, ...requiredHeaderStyle, marginBottom: 10}}>
                                Main Photo
                            </div>
                            <Dropzone files={newMainPhoto} handleDroppedFiles={handleDroppedFiles}
                                      maxFiles={1}
                                      zoneId={'mainPhoto'} backgroundColor={'#444'}/>
                        </div>
                    }
                    <div style={{marginTop: 0, flexGrow: 1}}>
                        <div style={{...headerStyle, flexGrow: 1, marginBottom: 10}}>
                            {isSubmit ? 'Submit' : 'Add'} {lockHasMedia ? 'More' : ''} Images <span
                            style={{...optionalHeaderStyle, fontWeight: 400, color: '#aaa'}}>
                                    (optional, spoilers OK, max 5)</span>
                        </div>
                        <Dropzone files={newMedia || []}
                                  handleDroppedFiles={handleDroppedFiles}
                                  maxFiles={5}
                                  backgroundColor={'#444'}/>
                    </div>
                </div>

                {(newMedia?.length > 0 || isSubmit) &&
                    <React.Fragment>
                        <div style={{
                            margin: '30px auto 10px auto',
                            display: 'flex',
                            justifyContent: 'center',
                            width: '100%'
                        }}>
                            <div>
                                <div style={{
                                    ...headerStyle,
                                    padding: '0px 0px 5px 0px',
                                    width: 'auto',
                                    margin: 0,
                                    fontSize: '1.1rem',
                                    backgroundColor: !form.photoCredit ? '#c00' : 'inherit',
                                    alignContent: 'center'
                                }}>
                                    Photo Credit for New Images
                                </div>
                                <TextField type='text' name='photoCredit' style={{width: 240}}
                                           onChange={handleFormChange} value={form.photoCredit || ''}
                                           color='info'
                                           slotProps={{
                                               htmlInput: {maxLength: 40}
                                           }} size='small'/>
                                <div style={{...reqStyle, backgroundColor: getHighlightColor('photoCredit')}}/>
                            </div>
                        </div>

                        <div style={{
                            fontSize: '0.9rem', fontWeight: 400, marginBottom: 5, color: '#fff',
                            textAlign: 'center'
                        }}>
                            {profile?.lastPhotoCredit &&
                                <span><Link
                                    onClick={() => handleFormChange({
                                        target: {
                                            name: 'photoCredit',
                                            value: profile?.lastPhotoCredit
                                        }
                                    })}
                                    style={{
                                        cursor: 'pointer',
                                        textDecoration: 'none',
                                        fontWeight: form.photoCredit === profile?.lastPhotoCredit ? '600' : '400'
                                    }}>Last Used</Link> • </span>
                            }
                            {currentPhotoCredit &&
                                <span><Link
                                    onClick={() => handleFormChange({
                                        target: {
                                            name: 'photoCredit',
                                            value: currentPhotoCredit
                                        }
                                    })}
                                    style={{
                                        cursor: 'pointer',
                                        textDecoration: 'none',
                                        fontWeight: form.photoCredit === currentPhotoCredit ? '600' : '400'
                                    }}>Match Existing Photos</Link> • </span>
                            }
                            {profile?.username &&
                                <span><Link
                                    onClick={() => handleFormChange({
                                        target: {
                                            name: 'photoCredit',
                                            value: profile?.username
                                        }
                                    })}
                                    style={{
                                        cursor: 'pointer',
                                        textDecoration: 'none',
                                        fontWeight: form.photoCredit === profile?.username ? '600' : '400'
                                    }}>Your Userame</Link></span>
                            }
                        </div>
                    </React.Fragment>
                }

                {(newMedia?.length > 0 || isSubmit) && !isMod &&
                    <div style={{width: '100%', textAlign: 'center', justifyItems: 'center', marginTop: 30}}>
                        <div style={{maxWidth: 450, fontSize: '1.1rem'}}>
                            <strong>Please note</strong>: submitted images will not appear on the site until they are
                            reviewed by the mod team.
                        </div>
                    </div>
                }
                <div style={{margin: '30px 0px', width: '100%', textAlign: 'center'}}>
                    <Button
                        onClick={() => navigate(`/challengelocks?id=${lockId}&${queryString.stringify(searchParams)}`)}
                        variant='contained'
                        color='error' style={{marginRight: 20}}>
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} variant='contained' color='info'
                            disabled={!uploadable || uploading}>
                        {isSubmit ? 'Submit Images' : 'Save Changes'}
                    </Button>
                </div>

                <Dialog open={!!response && !uploadError} slotProps={{
                    backdrop: {style: {backgroundColor: '#000', opacity: 0.7}}
                }}>
                    <div style={{display: 'flex'}}>
                        <div style={{
                            backgroundColor: '#444',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            padding: 40
                        }}>
                            <div style={{
                                fontSize: '1.7rem',
                                fontWeight: 500,
                                marginBottom: 30,
                                textAlign: 'center'
                            }}>Images {isSubmit ? 'Submitted' : 'Updated'}!
                            </div>

                            {isSubmit && !isMod &&
                                <div style={{
                                    width: '100%',
                                    fontSize: '1.1rem',
                                    textAlign: 'center',
                                    justifyItems: 'center',
                                    marginBottom: 30
                                }}>
                                    <strong>Please note</strong>: submitted images will not appear on the site until
                                    they are
                                    reviewed by the mod team.
                                </div>
                            }

                            <div style={{width: '100%', textAlign: 'center'}}>
                                <Button onClick={() => navigate(lockNavigate)} variant='contained' color='info'
                                        style={{marginLeft: 'auto', marginRight: 'auto'}}>
                                    OK
                                </Button>
                            </div>
                        </div>
                    </div>
                </Dialog>


                <Dialog open={uploading}
                        slotProps={{backdrop: {style: {backgroundColor: '#000', opacity: 0.7}}}}>
                    <div style={{width: 320, textAlign: 'center', padding: 30}}>
                        <LoadingDisplay/>
                    </div>
                </Dialog>

                <Dialog open={(authLoaded && !user) || (!isMod && !isSubmit)}
                        slotProps={{backdrop: {style: {backgroundColor: '#000', opacity: 0.6}}}}>
                    <div style={{
                        width: '350px', textAlign: 'center',
                        padding: 50, marginTop: 0, backgroundColor: '#292929',
                        marginLeft: 'auto', marginRight: 'auto',
                        fontSize: '1.4rem', fontWeight: 700
                    }}>
                        You are not authorized to {isSubmit ? 'submit' : 'edit'} images.<br/><br/>
                        <div style={{width: 210, marginLeft: 'auto', marginRight: 'auto'}}>
                            <SignInButton/>
                        </div>
                    </div>
                </Dialog>

                <Dialog open={notValidLock} slotProps={{
                    backdrop: {style: {backgroundColor: '#000', opacity: 0.7}}
                }}>
                    <div style={{display: 'flex'}}>
                        <div
                            style={{
                                backgroundColor: '#444',
                                marginLeft: 'auto',
                                marginRight: 'auto',
                                padding: 40
                            }}>
                            <div style={{
                                fontSize: '1.6rem',
                                lineHeight: '1.9rem',
                                fontWeight: 500,
                                marginBottom: 10,
                                textAlign: 'center'
                            }}>Not an active challenge lock
                            </div>

                            <div style={{
                                fontSize: '1.1rem',
                                lineHeight: '1.4rem',
                                fontWeight: 500,
                                marginBottom: 30,
                                textAlign: 'center'
                            }}>Click below to browse the challenge locks page and select a lock to edit.
                            </div>

                            <div style={{width: '100%', textAlign: 'center'}}>
                                <Button onClick={() => navigate('/challengelocks')} variant='contained'
                                        color='info'
                                        style={{marginLeft: 'auto', marginRight: 'auto'}}>
                                    Browse Challenge Locks
                                </Button>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </div>
        </React.Fragment>
    )
}

function separateBasename(file) {
    const lastDotIndex = file.lastIndexOf('.')
    if (lastDotIndex === -1) {
        return {base: file, ext: ''}
    }
    return {base: file.substring(0, lastDotIndex), ext: file.substring(lastDotIndex)}
}



