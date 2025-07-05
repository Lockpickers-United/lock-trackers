import React, {useCallback, useContext, useEffect, useState} from 'react'
import Button from '@mui/material/Button'
import useWindowSize from '../util/useWindowSize.jsx'
import Dialog from '@mui/material/Dialog'
import {useLocation, useNavigate} from 'react-router-dom'
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
import {nodeServerUrl} from '../data/dataUrls.js'
import queryString from 'query-string'

import SubNav from '../nav/SubNav.jsx'
import {optionsCL} from '../data/subNavOptions.js'

import {Pages} from './dnd/Pages.jsx'
import {Layout} from './dnd/Page.jsx'
import {MultipleContainers} from './dnd/MultipleContainers.jsx'


export default function EditImages({profile, user, isSubmit = false}) {

    const {authLoaded} = useContext(AuthContext)
    const {refreshEntries, updateVersion, updateProfile} = useContext(DBContext)
    const {allEntries, getEntryFromId, isMod} = useContext(DataContext)

    const location = useLocation()
    const searchParams = queryString.parse(location.search)
    delete searchParams.id

    const {filters} = useContext(FilterContext)
    const lockId = filters.id
    const lock = getEntryFromId(lockId) || {}
    const notValidLock = (Object.keys(allEntries).length > 0 && Object.keys(lock).length === 0)
    const lockHasMedia = lock?.media && lock?.media?.length > 0
    const lockNavigate = `/challengelocks?id=${lockId}&${queryString.stringify(searchParams)}`

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
    const currentPhotoCredit = lockHasMedia > 0 && lock.media[0].title && lock.media[0].title !== 'By: Unknown'
        ? lock.media[0].title?.replace('By: ', '')
        : undefined

    useEffect(() => {
        setForm({
            photoCredit: profile?.lastPhotoCredit || currentPhotoCredit || profile?.username || undefined,
            isSubmit,
            id: lockId
        })
        setMediaArrays({
            currentMainPhoto: lockHasMedia ? [[...lock.media].shift()] : [],
            currentMedia: lockHasMedia ? [...lock.media].slice(1, lock.media.length) : [],
            newMainPhoto: [],
            newMedia: []
        })
    }, [currentPhotoCredit, isSubmit, lock.media, lockHasMedia, lockId, profile])

    const [uploading, setUploading] = useState(false)
    const needPhotoCredit = (mediaArrays?.newMainPhoto?.length > 0 || mediaArrays?.newMedia?.length > 0) && !form.photoCredit
    const uploadable = (mediaArrays?.currentMainPhoto?.length > 0 || mediaArrays?.newMainPhoto?.length > 0)
        && !needPhotoCredit
        && !uploading
        && contentChanged

    const needMainPhoto = mediaArrays?.currentMainPhoto?.length === 0 && mediaArrays?.newMainPhoto?.length === 0

    const getHighlightColor = useCallback(field => {
        return !form[field]
            ? '#d00'
            : '#090'
    }, [form])

    const handleFormChange = useCallback((event) => {
        let {name, value} = event.target
        setForm({...form, [name]: filterProfanity(value)})
    }, [form])

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

        const formCopy = {
            ...form,
            replaceMainPhoto: mediaArrays.newMainPhoto.length > 0 ? 'true' : 'false'
        }

        if (mediaArrays?.currentMainPhoto?.length > 0)
            formCopy.updatedMainPhotoId = mediaArrays?.currentMainPhoto[0].sequenceId

        if (mediaArrays?.currentMedia?.length > 0)
            formCopy.updatedMediaIds = mediaArrays?.currentMedia.map((image) => image.sequenceId)

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
        navigate(`/challengelocks?id=${lockId}&${queryString.stringify(searchParams)}`)
    }, [lockId, navigate, searchParams])

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
    const reqStyle = {height: 4, borderRadius: 2}

    const smallWindow = width <= 560

    const cardWidth = smallWindow ? 115 : 145
    const imageHeight = smallWindow ? 120 : 150

    // <Pages layout={Layout.Horizontal} media={lock.media}/>

    return (

        <React.Fragment>
            <SubNav options={optionsCL} defaultValue={'Challenge Locks'}/>

            <div style={{
                maxWidth: 720, padding: 8, backgroundColor: '#222',
                marginLeft: 'auto', marginRight: 'auto', marginTop: 16, marginBottom: 46, paddingLeft: 8
            }}>


                <MultipleContainers lock={lock} containerList={{A: 'Current Media', B: 'Pending Media'}} />

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



