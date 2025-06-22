import React, {useCallback, useContext, useEffect, useState} from 'react'
import Button from '@mui/material/Button'
import useWindowSize from '../util/useWindowSize.jsx'
import Dialog from '@mui/material/Dialog'
import {useNavigate} from 'react-router-dom'
import DataContext from '../context/DataContext.jsx'
import FilterContext from '../context/FilterContext.jsx'
import LoadingDisplay from '../misc/LoadingDisplay.jsx'
import ImageCard from './ImageCard.jsx'
import Dropzone from '../formUtils/Dropzone.jsx'
import TextField from '@mui/material/TextField'
import {filterProfanity} from '../util/sanitizeValues.js'
import ForwardIcon from '@mui/icons-material/Forward'
import {postData} from '../formUtils/postData.jsx'
import {enqueueSnackbar} from 'notistack'
import AuthContext from '../app/AuthContext.jsx'
import DBContext from '../app/DBContext.jsx'
import Link from '@mui/material/Link'
import SignInButton from '../auth/SignInButton.jsx'

export default function EditImages({profile, user}) {

    const serverUrl = 'https://lpulocks.com:7443'

    const {authLoaded} = useContext(AuthContext)
    const {refreshEntries, updateVersion, updateProfile} = useContext(DBContext)
    const {allEntries, getEntryFromId, isMod} = useContext(DataContext)

    const {filters} = useContext(FilterContext)
    const lockId = filters.id
    const lock = getEntryFromId(lockId) || {}
    const notValidLock = (Object.keys(allEntries).length > 0 && Object.keys(lock).length === 0)

    const safeName = lock?.name?.replace(/[\s/]/g, '_').replace(/\W/g, '')
    const lockNavigate = `/challengelocks?id=${lockId}&name=${safeName}`

    const [response, setResponse] = useState(undefined)
    const [uploadError, setUploadError] = useState(undefined)
    const [mediaArrays, setMediaArrays] = useState({
        currentMainPhoto: [],
        currentMedia: [],
        newMainPhoto: [],
        newMedia: []
    })
    const [form, setForm] = useState({})
    const [contentChanged, setContentChanged] = useState(false)

    useEffect(() => {
        setForm({
            photoCredit: profile?.lastPhotoCredit || undefined,
            id: lockId
        })
        setMediaArrays({
            currentMainPhoto: lock?.media?.length > 0 ? [[...lock.media].shift()] : [],
            currentMedia: lock?.media?.length > 0 ? [...lock.media].slice(1, lock.media.length) : [],
            newMainPhoto: [],
            newMedia: []
        })
    }, [lock.media, lockId, profile])

    const [uploading, setUploading] = useState(false)
    const uploadable = (mediaArrays?.currentMainPhoto?.length > 0 || mediaArrays?.newMainPhoto?.length > 0) && form.photoCredit && !uploading && contentChanged
    const needMainPhoto = mediaArrays?.currentMainPhoto?.length === 0 && mediaArrays?.newMainPhoto?.length === 0

    const handleFormChange = useCallback((event) => {
        let {name, value} = event.target
        setForm({...form, [name]: filterProfanity(value)})
    }, [form])

    const handlePhotoCredit = useCallback(async () => {
        console.log('handlePhotoCredit')
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

        const formCopy = {
            ...form,
            replaceMainPhoto: mediaArrays.newMainPhoto.length > 0 ? 'true' : 'false'
        }

        if (mediaArrays?.currentMainPhoto?.length > 0)
            formCopy.updatedMainPhotoId = mediaArrays?.currentMainPhoto[0].sequenceId

        if (mediaArrays?.currentMedia?.length > 0)
            formCopy.updatedMediaIds = mediaArrays?.currentMedia.map((image) => image.sequenceId)

        //setUploading(false)
        //return

        const formData = new FormData()
        Object.keys(formCopy).forEach(key => {
            formData.append(key, formCopy[key])
        })

        if (mediaArrays?.newMainPhoto?.length > 0 || mediaArrays?.newMedia?.length > 0) {
            const prefix = lock.name?.replace('/', '+')
            const suffix = formCopy.photoCredit?.replace('/', '+')
            const uploadsDir = `${prefix}-${suffix}-${lockId}`.toLowerCase()

            mediaArrays?.newMainPhoto?.forEach((file) => {
                const {base, ext} = separateBasename(file.name)
                formData.append('files', file, `${uploadsDir}/${prefix}_${base}_${suffix}--main${ext}`.toLowerCase())
            })
            mediaArrays?.newMedia?.forEach((file) => {
                const {base, ext} = separateBasename(file.name)
                formData.append('files', file, `${uploadsDir}/${prefix}_${base}_${suffix}${ext}`.toLowerCase())
            })
        }

        const url = `${serverUrl}/update-lock-media`

        //formData.forEach((value, key) => console.log(key, value) )

        try {
            const results = await postData({user, url, formData, snackBars: false})
            setResponse(results)
            await refreshEntries()
            await updateVersion()
        } catch (error) {
            setUploadError(`${error}`.replace('Error: ', ''))
            enqueueSnackbar(`Error creating request: ${error}`, {variant: 'error', autoHideDuration: 3000})
            throw error
        } finally {
            mediaArrays.newMedia?.forEach(file => URL.revokeObjectURL(file.preview))
            mediaArrays.newMainPhoto?.forEach(file => URL.revokeObjectURL(file.preview))
            setUploading(false)
            setForm(formCopy)
            await handlePhotoCredit()
        }

        setUploading(false)
    }

    const handleImageMove = useCallback((mediaArrayName, imageSequenceId, targetArrayName) => {
        let tempArray = mediaArrays[mediaArrayName] || []
        const imageToMove = tempArray.find((image) => image.sequenceId === imageSequenceId)
        if (!imageToMove) return
        tempArray = tempArray.filter((image) => image.sequenceId !== imageSequenceId)
        setMediaArrays({
            ...mediaArrays,
            [mediaArrayName]: tempArray,
            [targetArrayName]: [imageToMove, ...mediaArrays[targetArrayName]]
        })
        setContentChanged(true)
    }, [mediaArrays])

    const handleRemove = useCallback((mediaArrayName, imageSequenceId) => {
        let tempArray = mediaArrays[mediaArrayName] || []
        tempArray = tempArray.filter((image) => image.sequenceId !== imageSequenceId)
        setMediaArrays({...mediaArrays, [mediaArrayName]: tempArray})
        setContentChanged(true)
    }, [mediaArrays])

    const handleDroppedFiles = useCallback((allFiles, zoneId = 'dropzone') => {
        if (zoneId === 'mainPhoto') {
            setMediaArrays({...mediaArrays, newMainPhoto: allFiles})
        } else {
            setMediaArrays({...mediaArrays, newMedia: allFiles})
        }
        setContentChanged(true)
    }, [mediaArrays])

    const navigate = useNavigate()
    const handleLockClick = useCallback(() => {
        navigate(`/challengelocks?id=${lockId}&name=${safeName}`)
    }, [lockId, navigate, safeName])

    const {width, isMobile} = useWindowSize()
    const paddingLeft = !isMobile ? 16 : 8

    const flexStyle = width < 500 ? 'block' : 'flex'
    const moveRotation = width < 500 ? 'rotate(90deg)' : 'rotate(0deg)'
    const moveBackRotation = width < 500 ? 'rotate(-90deg)' : 'rotate(180deg)'

    const nameTextStyle = {fontSize: '1.5rem', lineHeight: '1.7rem', fontWeight: 600, marginLeft: 0}
    const makerTextStyle = {fontSize: '1.2rem', lineHeight: '1.4rem', marginLeft: 0, marginTop: 10}

    const headerStyle = {fontSize: '1.2rem', fontWeight: 600, marginBottom: 5, paddingLeft: 2, width: '100%'}
    const optionalHeaderStyle = {fontSize: '1.1rem', fontWeight: 400, marginBottom: 5, paddingLeft: 2, color: '#fff'}

    const requiredHeaderStyle = {backgroundColor: needMainPhoto ? '#c00' : 'inherit'}

    const smallWindow = width <= 560

    const cardWidth = smallWindow ? 115 : 145
    const imageHeight = smallWindow ? 120 : 150

    return (

        <React.Fragment>

            <div style={{
                maxWidth: 720, padding: 8, backgroundColor: '#222',
                marginLeft: 'auto', marginRight: 'auto', marginTop: 16, marginBottom: 46, paddingLeft: 8
            }}>

                <div style={{}}>

                    <div style={{margin: `10px 20px 30px ${paddingLeft}px`, lineHeight: '1.5rem'}}>
                        <div style={{
                            fontSize: '1.2rem',
                            fontWeight: 700,
                            marginBottom: 10
                        }}>Edit Challenge Lock Images
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

                        <div style={{display: 'flex', marginBottom: 15, justifyContent: 'right'}}>
                            <div style={{
                                ...headerStyle, padding: '0px 10px 0px 0px', margin: 0, alignContent: 'center',
                                textAlign: 'right', fontSize: '1.1rem',
                                backgroundColor: !form.photoCredit ? '#c00' : 'inherit'
                            }}>
                                New Image Photo Credit
                            </div>
                            <TextField type='text' name='photoCredit' style={{width: 240}}
                                       onChange={handleFormChange} value={form.photoCredit || ''} color='info'
                                       inputProps={{maxLength: 40}} size='small'/>
                        </div>

                        <div style={{...headerStyle, flexGrow: 1}}>
                            Current Images
                        </div>

                        <div style={{display: flexStyle, marginTop: 10}}>
                            <div style={{width: 150, marginRight: 20, flexShrink: 0}}>
                                <div style={{...optionalHeaderStyle, ...requiredHeaderStyle}}>
                                    Main Photo
                                </div>
                                {mediaArrays?.currentMainPhoto && mediaArrays.currentMainPhoto.length > 0 &&
                                    <div>
                                        <div style={{}}><ImageCard
                                            image={mediaArrays.currentMainPhoto ? mediaArrays.currentMainPhoto[0] : []}
                                            handleRemove={handleRemove}
                                            mediaArrayName={'currentMainPhoto'}
                                            height={imageHeight + 30} maxWidth={150}
                                            style={{marginTop: 10}}
                                        />
                                        </div>
                                        <Button endIcon={<ForwardIcon style={{transform: moveRotation}}/>}
                                                onClick={() => handleImageMove('currentMainPhoto', mediaArrays.currentMainPhoto[0].sequenceId, 'currentMedia')}
                                                variant='contained' color='info'
                                                style={{width: 145}}>
                                            MOVE
                                        </Button>
                                    </div>
                                }

                                {mediaArrays?.currentMainPhoto && mediaArrays?.currentMainPhoto.length === 0 &&
                                    <Dropzone files={mediaArrays.newMainPhoto} handleDroppedFiles={handleDroppedFiles}
                                              maxFiles={1}
                                              zoneId={'mainPhoto'} backgroundColor={'#444'}/>
                                }
                            </div>

                            <div style={{flexGrow: 1}}>
                                <div style={{...optionalHeaderStyle, flexGrow: 1}}>
                                    Other Photos
                                </div>

                                {mediaArrays?.currentMedia && mediaArrays?.currentMedia.length > 0 &&
                                    <div style={{
                                        display: 'grid',
                                        width: '100%',
                                        gridTemplateColumns: `repeat(auto-fill, minmax(${cardWidth}px, 1fr))`,
                                        gap: 10,
                                        marginTop: 10,
                                        border: '1px solid #999',
                                        padding: 10,
                                        justifyItems: 'center'

                                    }}>
                                        {mediaArrays?.currentMedia && mediaArrays?.currentMedia?.map((image, index) => (
                                            <div key={index} style={{justifyItems: 'center'}}>
                                                <ImageCard image={image} key={index} index={index}
                                                           mediaArrayName={'currentMedia'}
                                                           height={imageHeight}
                                                           handleRemove={handleRemove}/>
                                                {mediaArrays.currentMainPhoto?.length === 0 &&
                                                    <Button
                                                        startIcon={<ForwardIcon style={{transform: moveBackRotation}}/>}
                                                        onClick={() => handleImageMove('currentMedia', image.sequenceId, 'currentMainPhoto')}
                                                        variant='contained' color='info'
                                                        style={{
                                                            width: cardWidth,
                                                            backgroundColor: '#333',
                                                            color: '#888'
                                                        }}>
                                                        MOVE
                                                    </Button>
                                                }
                                            </div>
                                        ))}

                                    </div>
                                }

                                {mediaArrays?.currentMedia && mediaArrays?.currentMedia.length === 0 &&
                                    <div style={{
                                        width: '100%', backgroundColor: '#333', color: '#888', border: '1px solid #444',
                                        height: 40, textAlign: 'center', marginTop: 10, alignContent: 'center'
                                    }}>
                                        None{lock?.media?.length > 1 && ' Remaining'}
                                    </div>
                                }

                                <div style={{marginTop: 30}}>
                                    <div style={{...headerStyle, flexGrow: 1, marginBottom: 10}}>
                                        Add More Images <span
                                        style={{...optionalHeaderStyle, fontWeight: 400, color: '#aaa'}}>
                                    (optional, spoilers OK, max 5)</span>
                                    </div>
                                    <Dropzone files={mediaArrays.newMedia || []} handleDroppedFiles={handleDroppedFiles}
                                              maxFiles={5}
                                              backgroundColor={'#444'}/>
                                </div>

                            </div>
                        </div>


                        <div style={{margin: '30px 0px', width: '100%', textAlign: 'center'}}>
                            <Button onClick={() => navigate(`/challengelocks?id=${lockId}`)} variant='contained'
                                    color='error' style={{marginRight: 20}}>
                                Cancel
                            </Button>
                            <Button onClick={handleSubmit} variant='contained' color='info'
                                    disabled={!uploadable || uploading}
                                    style={{marginRight: 20}}>
                                Save Changes
                            </Button>
                        </div>

                        <Dialog open={!!response && !uploadError} componentsProps={{
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
                                        marginBottom: 60,
                                        textAlign: 'center'
                                    }}>Images Updated!
                                    </div>

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
                                componentsProps={{backdrop: {style: {backgroundColor: '#000', opacity: 0.7}}}}>
                            <div style={{width: 320, textAlign: 'center', padding: 30}}>
                                <LoadingDisplay/>
                            </div>
                        </Dialog>


                        <Dialog open={(authLoaded && !user) || !isMod}
                                componentsProps={{backdrop: {style: {backgroundColor: '#000', opacity: 0.6}}}}>
                            <div style={{
                                width: '350px', textAlign: 'center',
                                padding: 50, marginTop: 0, backgroundColor: '#292929',
                                marginLeft: 'auto', marginRight: 'auto',
                                fontSize: '1.4rem', fontWeight: 700
                            }}>
                                You are not authorized to edit images.<br/><br/>
                                <div style={{width: 210, marginLeft: 'auto', marginRight: 'auto'}}>
                                    <SignInButton/>
                                </div>
                            </div>
                        </Dialog>


                        <Dialog open={notValidLock} componentsProps={{
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
                </div>
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



