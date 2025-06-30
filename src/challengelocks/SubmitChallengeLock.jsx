import React, {useCallback, useContext, useEffect, useMemo, useState} from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dropzone from '../formUtils/Dropzone.jsx'
import useWindowSize from '../util/useWindowSize.jsx'
import Dialog from '@mui/material/Dialog'
import LoadingDisplay from '../misc/LoadingDisplay.jsx'
import SelectBox from '../formUtils/SelectBox.jsx'
import {uniqueBelts} from '../data/belts'
import Link from '@mui/material/Link'
import SubNav from '../nav/SubNav.jsx'
import {useLocation, useNavigate} from 'react-router-dom'
import AuthContext from '../app/AuthContext.jsx'
import {postData} from '../formUtils/postData.jsx'
import {enqueueSnackbar} from 'notistack'
import countries from '../data/countries.json'
import lockFormats from '../data/lockFormats.json'
import lockingMechanisms from '../data/lockingMechanisms.json'
import AutoCompleteBox from '../formUtils/AutoCompleteBox.jsx'
import {DatePicker} from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs'
import {FormControlLabel, Radio, RadioGroup} from '@mui/material'
import {optionsCL} from '../data/subNavOptions.js'
import sanitizeValues from '../util/sanitizeValues.js'
import DBContext from '../app/DBContext.jsx'
import DataContext from '../context/DataContext.jsx'
import FreeSoloAutoCompleteBox from '../formUtils/FreeSoloAutoCompleteBox.jsx'
import statesProvinces from '../data/statesProvinces.json'
import SignInButton from '../auth/SignInButton.jsx'
import {nodeServerUrl} from '../data/dataUrls.js'
import queryString from 'query-string'
import Fuse from 'fuse.js'
import Popover from '@mui/material/Popover'

/**
 * @prop acReset
 * @prop allMakes
 */

export default function SubmitChallengeLock({entry, profile, user}) {
    const location = useLocation()
    const searchParams = queryString.parse(location.search)
    delete searchParams.id

    const {authLoaded} = useContext(AuthContext)
    const {refreshEntries, updateVersion, updateEntry, updateProfile} = useContext(DBContext)
    const navigate = useNavigate()
    const {makerData, lockNames, getEntryFromName} = useContext(DataContext)
    const [mainPhoto, setMainPhoto] = useState([])
    const [files, setFiles] = useState([])
    const [response, setResponse] = useState(undefined)
    const [uploading, setUploading] = useState(false)
    const [uploadError, setUploadError] = useState(undefined)
    const [form, setForm] = useState({})
    const [entryId, setEntryId] = useState(undefined)
    const [checkIn, setCheckIn] = useState(false)
    const [contentChanged, setContentChanged] = useState(false)
    const [nameMatches, setNameMatches] = useState([])

    // why are these here? needed for setting auto-complete??
    const [acReset, setAcReset] = useState(false) // eslint-disable-line
    const [inputValue, setInputValue] = useState(undefined) // eslint-disable-line
    const [country, setCountry] = useState(null) // eslint-disable-line
    const [stateProvince, setStateProvince] = useState(null) // eslint-disable-line

    const subNavItem = entry ? optionsCL[0] : optionsCL[1]

    useEffect(() => {
        if (entry) {
            setForm(entry)
            setCountry(entry.country || null)
            setStateProvince(entry.stateProvince || null)
            setEntryId(entry.id)
        } else {
            const newForm = {
                id: 'cl_' + genHexString(8),
                submittedByUsername: profile?.discordUsername || undefined,
                submittedByUsernamePlatform: 'Discord',
                country: profile?.country || undefined,
                stateProvince: profile?.stateProvince || undefined,
                submittedByDisplayName: profile?.username || undefined,
                submittedByUserBelt: profile?.belt || undefined,
                submittedByUserId: user?.uid || undefined
            }
            setForm(newForm)
            setCountry(profile?.country || null)
            setStateProvince(profile?.stateProvince || null)
        }
    }, [entry, profile, user?.uid])

    const textFieldMax = 40
    const makerOptions = Object.keys(makerData).sort((a, b) => {
        return a.localeCompare(b)
    })
    const makerOptionsLC = makerOptions.map(maker => maker.toLowerCase())

    const handleFormChange = useCallback((event) => {
        let {name, value} = event.target
        let formCopy = {...form}
        if (name === 'country') {
            setCountry(value)
        }
        if (name === 'country' && !statesProvinces[value]) {
            delete formCopy.stateProvince
        } else if (name === 'name' && value) {
            const fuse = new Fuse(lockNames, {ignoreDiacritics: true, includeScore: true, threshold: 0.1}) // lower = stricter
            setNameMatches(fuse.search(form.name || ''))
            console.log('result', form.name, nameMatches[0]?.item, nameMatches[0]?.score, nameMatches.length)
            value = sanitizeValues(value, {profanityOK: true})
        } else if (name === 'maker' && value) {
            const makerIndex = makerOptionsLC.indexOf(value?.toLowerCase())
            if (makerIndex >= 0) {
                value = makerOptions[makerIndex]
            }
        } else {
            value = sanitizeValues(value)
        }

        let updates = {[name]: value}
        setForm({...formCopy, ...updates})
        setContentChanged(true)
    }, [form, lockNames, makerOptions, makerOptionsLC, nameMatches])

    const handleDateChange = useCallback((dateValue) => {
        setForm({...form, ...dateValue})
        setContentChanged(true)
    }, [form])

    const handleUpdateProfile = useCallback(async () => {
        let localProfile = {...profile}
        let needUpdate = false
        try {
            if (form.submittedByUsername && form.submittedByUsernamePlatform === 'Discord' && form.submittedByUsername !== profile.discordUsername) {
                localProfile = {...localProfile, discordUsername: form.submittedByUsername}
                needUpdate = true
            } else if (form.submittedByUsername && form.submittedByUsernamePlatform === 'Reddit' && form.submittedByUsername !== profile.redditUsername) {
                localProfile = {...localProfile, redditUsername: form.submittedByUsername}
                needUpdate = true
            }
            if (form.country && form.country !== profile.country) {
                localProfile = {...localProfile, country: form.country}
                needUpdate = true
            }
            if (form.stateProvince && form.stateProvince !== profile.stateProvince) {
                localProfile = {...localProfile, stateProvince: form.stateProvince}
                needUpdate = true
            }
            if (form.submittedByUserBelt && form.submittedByUserBelt !== profile.belt) {
                localProfile = {...localProfile, belt: form.submittedByUserBelt}
                needUpdate = true
            }
            if (needUpdate && !entry) {
                await updateProfile(localProfile)
            }
        } catch (error) {
            console.error('Couldn\'t set username on profile', error)
        }
    }, [entry, form, profile, updateProfile])

    const requiredFields = useMemo(() => {
        return entry
            ? ['name', 'maker', 'lockFormat', 'submittedByUsername', 'submittedByUsernamePlatform']
            : ['name', 'maker', 'lockFormat', 'submittedByUsername', 'submittedByUsernamePlatform']
    }, [entry])

    const uploadable = requiredFields.every(field => form[field] && form[field].length > 0) &&
        (mainPhoto.length > 0 || entry)

    const getHighlightColor = useCallback(field => {
        return (requiredFields.includes(field) && !form[field]) || (field === 'mainPhoto' && mainPhoto.length === 0)
            ? '#d00'
            : requiredFields.includes(field) || field === 'mainPhoto'
                ? '#090'
                : 'inherit'
    }, [form, mainPhoto.length, requiredFields])

    const handleDroppedFiles = useCallback((allFiles, zoneId = 'dropzone') => {
        if (zoneId === 'mainPhoto') {
            setMainPhoto(allFiles)
            setForm({...form, mainPhoto: allFiles.length > 0})
        } else {
            setFiles(allFiles)
        }
        setContentChanged(true)
    }, [form])


    const handleSubmit = async ({doCheckIn = false}) => {
        setUploading(true)
        setCheckIn(doCheckIn)
        const formCopy = {
            ...form,
            displayName: sanitizeValues(profile?.username) || 'no display name',
            source: 'site'
        }

        Object.keys(formCopy).forEach(key => (formCopy[key] === undefined || formCopy[key] === '') ? delete formCopy[key] : {})
        const formData = new FormData()
        Object.keys(formCopy).forEach(key => {
            formData.append(key, formCopy[key])
        })

        if (!entry) {
            const prefix = formCopy?.name?.replace('/', '+')
            const suffix = formCopy?.submittedByUsername?.replace('/', '+')
            const uploadsDir = `${prefix}-${suffix}-${form.id}`.toLowerCase()
            mainPhoto.forEach((file) => {
                const {base, ext} = separateBasename(file.name)
                formData.append('files', file, `${uploadsDir}/${prefix}_${base}_${suffix}${ext}`.toLowerCase())
            })
            files.forEach((file) => {
                const {base, ext} = separateBasename(file.name)
                formData.append('files', file, `${uploadsDir}/${prefix}_${base}_${suffix}${ext}`.toLowerCase())
            })
        }

        if (entry) {
            try {
                await updateEntry(formCopy)
            } catch (error) {
                setUploadError(`${error}`.replace('Error: ', ''))
                enqueueSnackbar(`Error creating request: ${error}`, {variant: 'error', autoHideDuration: 3000})
                throw error
            } finally {
                await refreshEntries()
                setUploading(false)
                navigate(`/challengelocks?id=${formCopy.id}&${queryString.stringify(searchParams)}`)
            }
        } else {
            const url = `${nodeServerUrl}/submit-challenge-lock`
            try {
                const results = await postData({user, url, formData, snackBars: false, timeoutDuration: 25000})
                setResponse(results)
                await refreshEntries()
                await updateVersion()
            } catch (error) {
                setUploadError(`${error}`.replace('Error: ', ''))
                enqueueSnackbar(`Error creating request: ${error}`, {variant: 'error', autoHideDuration: 3000})
                throw error
            } finally {
                setEntryId(form.id)
                files.forEach(file => URL.revokeObjectURL(file.preview))
                mainPhoto.forEach(file => URL.revokeObjectURL(file.preview))
                setFiles([])
                setUploading(false)
                setForm(formCopy)
                await handleUpdateProfile()
            }
        }
    }

    const handleChange = useCallback(newValue => {
        navigate(newValue.page)
    }, [navigate])

    const handleReload = useCallback(async () => {
        files.forEach(file => URL.revokeObjectURL(file.preview))
        setFiles([])
        mainPhoto.forEach(file => URL.revokeObjectURL(file.preview))
        setMainPhoto([])
        if (checkIn) {
            navigate(`/challengelocks/checkin?id=${entryId}&${queryString.stringify(searchParams)}`)
        } else {
            navigate(`/challengelocks?id=${form.id}&${queryString.stringify(searchParams)}`)
        }
    }, [checkIn, entryId, files, form.id, mainPhoto, navigate, searchParams])

    //TODO: clear form on error OK?
    const handleClose = useCallback(() => {
        setResponse(undefined)
        setUploading(false)
        setUploadError(undefined)
    }, [])

    const handleLockClick = useCallback(() => {
        navigate(`/challengelocks?id=${entry?.id}&${queryString.stringify(searchParams)}`)
    }, [entry?.id, navigate, searchParams])

    const [foundLock, setFoundLock] = useState(undefined)
    const handleFoundLock = useCallback(() => {
        navigate(`/challengelocks?id=${foundLock?.id}&${queryString.stringify(searchParams)}`)
    }, [foundLock?.id, navigate, searchParams])

    const [popper, setPopper] = useState(false)
    const [anchorEl, setAnchorEl] = useState(document.getElementById('lockName'))

    const handleLockBlur = useCallback(() => {
        setAnchorEl(document.getElementById('lockName'))
        if (nameMatches.length === 1 && !entry) {
            setFoundLock(getEntryFromName(nameMatches[0]?.item))
            setPopper(true)
        }
    }, [entry, getEntryFromName, nameMatches])

    const handlePopperClose = useCallback(() => {
        setPopper(false)
    }, [])

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            setPopper(false)
        }
    })

    const countryList = useMemo(() => {
        return countries.map(country => country.country_area)
    }, [])

    const {isMobile, flexStyle} = useWindowSize()
    const paddingLeft = !isMobile ? 16 : 8

    const headerStyle = {fontSize: '1.0rem', fontWeight: 600, marginBottom: 5, paddingLeft: 2, width: '100%'}
    const optionalHeaderStyle = {fontSize: '1.0rem', fontWeight: 400, marginBottom: 5, paddingLeft: 2, color: '#ccc'}
    const reqStyle = {height: 4, borderRadius: 2}

    const nameTextStyle = {
        fontSize: '1.5rem', lineHeight: '1.7rem', color: '#fff', fontWeight: 600,
        wordBreak: 'break-word', inlineSize: '100%', marginRight: 20
    }
    const makerTextStyle = {
        fontSize: '1.2rem', lineHeight: '1.4rem', color: '#fff',
        wordBreak: 'break-word', inlineSize: '100%', marginRight: 20, marginTop: 5
    }

    return (

        <React.Fragment>
            <SubNav options={optionsCL} onChange={handleChange} defaultValue={subNavItem.label}/><br/>

            <div style={{
                maxWidth: 720, padding: 8, backgroundColor: '#222',
                marginLeft: 'auto', marginRight: 'auto', marginTop: 16, marginBottom: 46, paddingLeft: 8
            }}>

                <div style={{margin: `10px 20px 10px ${paddingLeft}px`, lineHeight: '1.5rem'}}>
                    <div style={{
                        fontSize: '1.4rem',
                        fontWeight: 700
                    }}>{entry ? 'Edit' : 'Submit a'} Challenge Lock
                    </div>
                    {!entry &&
                        <div>
                            Use this page to submit a new Challenge Lock that you have either created or received.
                            Please be sure to <Link onClick={() => navigate('/challengelocks')}
                                                    style={{color: '#bbb', cursor: 'pointer', fontWeight: 700}}>check
                            the existing locks</Link> for a match before submitting.
                        </div>
                    }
                </div>
                {entry &&
                    <div style={{margin: `10px 20px 20px ${paddingLeft}px`, lineHeight: '1.5rem'}}>
                        <div style={{display: flexStyle, paddingBottom: 10, borderBottom: '1px solid #ccc'}}>
                            <div style={{display: 'flex', alignItems: 'center', flexGrow: 1}}>
                                <div>
                                    <div style={nameTextStyle}>
                                        <Link onClick={handleLockClick} style={{cursor: 'pointer'}}>{entry?.name}</Link>
                                    </div>
                                    <div style={makerTextStyle}>By: {entry?.maker}</div>
                                </div>
                            </div>
                            {entry?.media?.length > 0 && entry?.media[0].thumbnailSquareUrl &&
                                <div style={{marginTop: 0}}>
                                    <img src={entry.media[0].thumbnailSquareUrl} alt={entry?.name}
                                         style={{width: 100, height: 100, marginRight: 10}}/>
                                </div>
                            }
                        </div>
                    </div>
                }

                <form action={null} encType='multipart/form-data' method='post'>
                    <div style={{paddingLeft: paddingLeft}}>

                        <div style={{display: flexStyle, marginBottom: 0}}>
                            <div style={{marginRight: 20, width: 315}}>
                                <div style={{...headerStyle}}>
                                    Challenge Lock Name
                                </div>
                                <TextField type='text' name='name' id='lockName' style={{width: 315}}
                                           onChange={handleFormChange} onBlur={handleLockBlur}
                                           value={form.name || ''} color='info'
                                           inputProps={{maxLength: textFieldMax}}/>
                                <Popover
                                    id={'foo'}
                                    open={popper}
                                    anchorEl={anchorEl}
                                    onClose={handlePopperClose}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left'
                                    }}
                                >
                                    <div style={{padding: 30, width: 320, backgroundColor: '#777'}}>
                                        There&#39;s a lock named <span style={{fontWeight: 600}}>
                                        {foundLock?.name}</span> by {foundLock?.maker}.
                                        Is that the one you&#39;re looking for?<br/>
                                        <Button onClick={() => handleFoundLock()} style={{marginTop:10}}>Yes, take me to that
                                            one</Button><br/>
                                        <Button onClick={() => setPopper(false)}>Nope, continue</Button>
                                    </div>
                                </Popover>
                                <div style={{...reqStyle, backgroundColor: getHighlightColor('name')}}/>
                            </div>
                            <div style={{width: 315}}>
                                <div style={{...headerStyle}}>
                                    CL Maker
                                </div>
                                <FreeSoloAutoCompleteBox changeHandler={handleFormChange}
                                                         options={makerOptions} value={form.maker || ''}
                                                         name={'maker'} style={{width: 315}} maxLength={textFieldMax}
                                                         reset={acReset} inputValueHandler={setInputValue}
                                />
                                <div style={{...reqStyle, backgroundColor: getHighlightColor('maker')}}/>
                            </div>
                        </div>

                        <div style={{display: flexStyle}}>

                            <div style={{marginRight: 20, marginTop: 20, width: 170}}>
                                <div style={{...headerStyle}}>Lock
                                    Format
                                </div>
                                <SelectBox changeHandler={handleFormChange}
                                           name='lockFormat' form={form}
                                           optionsList={lockFormats} size={'large'}
                                           width={170} multiple={false} defaultValue={''}/>
                                <div style={{...reqStyle, backgroundColor: getHighlightColor('lockFormat')}}/>
                            </div>

                            <div style={{marginRight: 20, marginTop: 20, width: 200}}>
                                <div style={{...headerStyle}}>
                                    Created
                                </div>
                                <DatePicker
                                    value={form.lockCreated ? dayjs(form.lockCreated) : null}
                                    onChange={(newValue) => handleDateChange({lockCreated: newValue.toISOString()})}
                                    disableFuture
                                    minDate={dayjs('2015-01-01')}
                                    maxDate={dayjs('2026-12-31')}
                                />
                                <div style={{...reqStyle, backgroundColor: getHighlightColor('lockCreated')}}/>
                            </div>

                            <div style={{marginTop: 20, width: 250}}>
                                <div style={{...headerStyle}}>Origin
                                </div>
                                <AutoCompleteBox changeHandler={handleFormChange}
                                                 options={countryList} value={form.country}
                                                 name={'country'} style={{width: 250}}
                                                 reset={acReset}
                                                 inputValueHandler={setInputValue}
                                />
                                {statesProvinces[form.country] &&
                                    <div style={{marginRight: 20, marginTop: 10}}>
                                        <div style={optionalHeaderStyle}>
                                            State/Province <span style={{color: '#aaa'}}>(optional)</span>
                                        </div>
                                        <AutoCompleteBox changeHandler={handleFormChange}
                                                         options={statesProvinces[form.country].sort()}
                                                         value={form.stateProvince || null} style={{width: 250}}
                                                         name={'stateProvince'}
                                                         reset={acReset}
                                                         inputValueHandler={setStateProvince}
                                        />
                                    </div>
                                }
                            </div>
                        </div>

                        {!entry &&
                            <React.Fragment>
                                <div style={{
                                    fontSize: '1.2rem',
                                    lineHeight: '1.5rem',
                                    fontWeight: 700,
                                    color: '#fff',
                                    borderBottom: '1px solid #ccc',
                                    marginTop: 40,
                                    marginRight: 20
                                }}>
                                    Lock Photos (at least one required)
                                </div>

                                <div style={{display: flexStyle, marginTop: 20}}>
                                    <div style={{marginRight: 20, width: 250}}>
                                        <div style={{...headerStyle}}>
                                            Main Lock Photo (no spoilers!)<br/>
                                        </div>
                                        <Dropzone files={mainPhoto} handleDroppedFiles={handleDroppedFiles} maxFiles={1}
                                                  zoneId={'mainPhoto'}/>
                                        <div style={{...reqStyle, backgroundColor: getHighlightColor('mainPhoto')}}/>
                                    </div>
                                    <div style={{marginRight: 0, flexGrow: 1, maxWidth: 390}}>
                                        <div style={{...optionalHeaderStyle, color: '#fff'}}>
                                            Other Lock Photos <span
                                            style={{...optionalHeaderStyle, fontWeight: 400, color: '#aaa'}}>(optional, spoilers OK, max 5)</span>
                                        </div>
                                        <Dropzone files={files} handleDroppedFiles={handleDroppedFiles} maxFiles={5}/>
                                    </div>
                                </div>
                            </React.Fragment>

                        }

                        <div style={{
                            fontSize: '1.2rem',
                            lineHeight: '1.5rem',
                            fontWeight: 400,
                            color: '#ccc',
                            borderBottom: '1px solid #ccc',
                            marginTop: 40,
                            marginRight: 20
                        }}>
                            Other Optional Information
                        </div>

                        <div style={{display: flexStyle}}>
                            <div style={{flexGrow: 1, maxWidth: 660, marginRight: 20}}>
                                <div style={{marginTop: 20, display: 'flex'}}>
                                    <div style={{...optionalHeaderStyle, flexGrow: 1}}>
                                        Description <span
                                        style={{...optionalHeaderStyle, color: '#aaa'}}>(optional)</span>
                                    </div>
                                    <div style={{...optionalHeaderStyle}}>
                                        <span style={{
                                            ...optionalHeaderStyle,
                                            color: '#aaa', fontSize: '0.85rem'
                                        }}>{form.description?.length || 0}/1200</span>
                                    </div>

                                </div>
                                <TextField type='text' name='description' multiline fullWidth rows={3}
                                           color='info' style={{}} value={form.description || ''}
                                           id='description' onChange={handleFormChange}
                                           inputProps={{maxLength: 1200}}/>
                            </div>
                        </div>

                        <div style={{display: flexStyle}}>
                            <div style={{marginRight: 20, marginTop: 20}}>
                                <div style={optionalHeaderStyle}>Mechanism <span
                                    style={{...optionalHeaderStyle, fontWeight: 400, color: '#aaa'}}>(optional)</span>
                                </div>
                                <SelectBox changeHandler={handleFormChange}
                                           name='lockingMechanism' form={form}
                                           optionsList={lockingMechanisms} size={'large'}
                                           width={180} multiple={false} defaultValue={''}/>
                            </div>
                            <div style={{marginRight: 20, marginTop: 20}}>
                                <div style={optionalHeaderStyle}>Original Lock <span
                                    style={{...optionalHeaderStyle, fontWeight: 400, color: '#aaa'}}>(optional)</span>
                                </div>
                                <TextField type='text' name='originalLock' style={{width: 300}}
                                           onChange={handleFormChange} value={form.originalLock || ''} color='info'
                                           inputProps={{maxLength: textFieldMax}}/>
                            </div>
                        </div>

                        <div style={{marginTop: 30}}>
                            <div style={{display: flexStyle}}>
                                <div style={{display: 'flex'}}>
                                    <div style={{marginRight: 15}}>
                                        <div style={{...headerStyle}}>
                                            {entry ? 'Original' : 'Your'} Username (required)
                                        </div>
                                        <TextField type='text' name='submittedByUsername' style={{width: 240}}
                                                   onChange={handleFormChange} value={form.submittedByUsername || ''}
                                                   color='info'
                                                   inputProps={{maxLength: textFieldMax}}/>
                                        <div style={{
                                            ...reqStyle,
                                            backgroundColor: getHighlightColor('submittedByUsername')
                                        }}/>
                                    </div>
                                    <div style={{marginTop: 25, marginRight: 30}}>
                                        <RadioGroup
                                            name='submittedByUsernamePlatform'
                                            onChange={handleFormChange}
                                            size='small'
                                            value={form.submittedByUsernamePlatform || 'discord'}
                                            sx={{
                                                '& .MuiRadio-root': {
                                                    padding: '7px'
                                                }
                                            }}
                                        >
                                            <FormControlLabel value='Discord' control={<Radio size='small'/>}
                                                              label='Discord'/>
                                            <FormControlLabel value='Reddit' control={<Radio size='small'/>}
                                                              label='Reddit'/>
                                        </RadioGroup>
                                    </div>
                                </div>

                                <div style={{marginTop: 0}}>
                                    <div style={optionalHeaderStyle}>
                                        {entry ? 'Original' : 'Your'} current belt <span
                                        style={{color: '#aaa'}}>(optional)</span>
                                    </div>
                                    <SelectBox changeHandler={handleFormChange}
                                               name='submittedByUserBelt' form={form}
                                               optionsList={['Unranked', ...uniqueBelts]}
                                               multiple={false} defaultValue={''}
                                               size={'large'} width={200}/>
                                </div>
                            </div>
                        </div>

                        <div style={{margin: '30px 0px', width: '100%', textAlign: 'center'}}>
                            {entry &&
                                <Button
                                    onClick={() => navigate(`/challengelocks?id=${entry.id}&${queryString.stringify(searchParams)}`)}
                                    variant='contained'
                                    color='error' style={{marginRight: 20}}>
                                    Cancel
                                </Button>
                            }
                            <Button onClick={() => handleSubmit({doCheckIn: false})} variant='contained' color='info'
                                    disabled={!uploadable || uploading || !contentChanged}
                                    style={{marginRight: 20}}>
                                {entry ? 'Save Changes' : 'Submit'}
                            </Button>
                            {!entry &&
                                <Button onClick={() => handleSubmit({doCheckIn: true})} variant='contained' color='info'
                                        disabled={!uploadable || uploading}>
                                    Submit & Check In
                                </Button>
                            }
                        </div>
                    </div>
                </form>

                <Dialog open={uploading} componentsProps={{backdrop: {style: {backgroundColor: '#000', opacity: 0.7}}}}>
                    <div style={{width: 320, textAlign: 'center', padding: 30}}>
                        <LoadingDisplay/>
                    </div>
                </Dialog>

                <Dialog open={authLoaded && !user}
                        componentsProps={{backdrop: {style: {backgroundColor: '#000', opacity: 0.6}}}}>
                    <div style={{
                        width: '350px', textAlign: 'center',
                        padding: 50, marginTop: 0, backgroundColor: '#292929',
                        marginLeft: 'auto', marginRight: 'auto',
                        fontSize: '1.4rem', fontWeight: 700
                    }}>
                        You must be logged in to submit Challenge Locks.<br/><br/>
                        <div style={{width: 210, marginLeft: 'auto', marginRight: 'auto'}}>
                            <SignInButton/>
                        </div>
                        <div style={{marginTop: 30, fontSize: '1.0rem'}}>
                            <Button variant='text' size='small'
                                    onClick={() => navigate('/challengelocks')}>
                                Browse Challenge Locks
                            </Button>
                        </div>
                    </div>
                </Dialog>

                <Dialog open={!!response && !uploadError} componentsProps={{
                    backdrop: {style: {backgroundColor: '#000', opacity: 0.7}}
                }}>
                    <div style={{display: 'flex'}}>
                        <div style={{backgroundColor: '#444', marginLeft: 'auto', marginRight: 'auto', padding: 40}}>
                            <div style={{
                                fontSize: '1.7rem',
                                fontWeight: 500,
                                marginBottom: 60,
                                textAlign: 'center'
                            }}>Challenge Lock submitted!
                            </div>

                            <div style={{width: '100%', textAlign: 'center'}}>
                                <Button onClick={handleReload} variant='contained' color='info'
                                        style={{marginLeft: 'auto', marginRight: 'auto'}}>
                                    OK
                                </Button>
                            </div>
                        </div>
                    </div>
                </Dialog>


                <Dialog open={!!uploadError} componentsProps={{
                    backdrop: {style: {backgroundColor: '#000', opacity: 0.7}}
                }}>
                    <div style={{display: 'flex'}}>
                        <div style={{backgroundColor: '#444', marginLeft: 'auto', marginRight: 'auto', padding: 40}}>
                            <div style={{fontSize: '1.7rem', fontWeight: 500, marginBottom: 20, textAlign: 'center'}}>
                                Something went wrong.<br/>
                                Please try again later.<br/>
                            </div>
                            <div style={{fontSize: '0.85rem', fontWeight: 400, marginBottom: 20, textAlign: 'center'}}>
                                Error message: {uploadError?.response?.data?.message
                                ?
                                <span>{uploadError?.response?.data?.message} ({uploadError?.response?.data?.status})</span>
                                : <span>{'' + uploadError}</span>
                            }
                            </div>
                            <div style={{width: '100%', textAlign: 'center'}}>
                                <Button onClick={handleClose} variant='contained' color='error'
                                        style={{marginLeft: 'auto', marginRight: 'auto'}}>
                                    OK
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

function genHexString(len) {
    const hex = '0123456789ABCDEF'
    let output = ''
    for (let i = 0; i < len; ++i) {
        output += hex.charAt(Math.floor(Math.random() * hex.length))
    }
    return output.toLowerCase()
}
