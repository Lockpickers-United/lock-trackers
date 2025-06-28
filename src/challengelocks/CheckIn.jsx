import React, {useCallback, useContext, useEffect, useMemo, useState} from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import useWindowSize from '../util/useWindowSize.jsx'
import Dialog from '@mui/material/Dialog'
import LoadingDisplay from '../misc/LoadingDisplay.jsx'
import SelectBox from '../formUtils/SelectBox.jsx'
import {uniqueBelts} from '../data/belts'
import Link from '@mui/material/Link'
import SubNav from '../nav/SubNav.jsx'
import {useLocation, useNavigate} from 'react-router-dom'
import {enqueueSnackbar} from 'notistack'
import countries from '../data/countries.json'
import statesProvinces from '../data/statesProvinces.json'
import AutoCompleteBox from '../formUtils/AutoCompleteBox.jsx'
import {DatePicker} from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs'
import {FormControlLabel, Radio, RadioGroup} from '@mui/material'
import FilterContext from '../context/FilterContext.jsx'
import RatingTable from './RatingTable.jsx'
import ratingDimensions from '../data/clRatingDimensions.json'
import {optionsCL} from '../data/subNavOptions.js'
import validator from 'validator'
import sanitizeValues from '../util/sanitizeValues.js'
import usePageTitle from '../util/usePageTitle.jsx'
import {postData} from '../formUtils/postData.jsx'
import DataContext from '../context/DataContext.jsx'
import DBContext from '../app/DBContext.jsx'
import DBContextCL from './DBProviderCL.jsx'
import {nodeServerUrl} from '../data/dataUrls.js'
import SignInButton from '../auth/SignInButton.jsx'
import AuthContext from '../app/AuthContext.jsx'
import Collapse from '@mui/material/Collapse'
import {useLocalStorage} from 'usehooks-ts'
import queryString from 'query-string'

/**
 * @prop inputValue
 * @prop country_area
 */

export default function CheckIn({checkIn, profile, user}) {

    const {authLoaded} = useContext(AuthContext)
    const {getEntryFromId} = useContext(DataContext)
    const {updateProfile} = useContext(DBContext)
    const {refreshEntries, updateVersion} = useContext(DBContextCL)
    const [response, setResponse] = useState(undefined)
    const [uploading, setUploading] = useState(false)
    const [uploadError, setUploadError] = useState(undefined)
    const [scrolled, setScrolled] = useState(false)
    const navigate = useNavigate()

    const location = useLocation()
    const searchParams = queryString.parse(location.search)
    delete searchParams.id

    const [lock, setLock] = useState(undefined)
    const [dataLoaded, setDataLoaded] = useState(false)
    const [addTracking, setAddTracking] = useLocalStorage('addCheckInTracking', false)
    const [showTracking, setShowTracking] = useState(!!checkIn || addTracking)
    const [contentChanged, setContentChanged] = useState(false)

    const [acReset, setAcReset] = useState(false) // eslint-disable-line
    const [inputValue, setInputValue] = useState(undefined) // eslint-disable-line
    const [country, setCountry] = useState(null) // eslint-disable-line
    const [stateProvince, setStateProvince] = useState(null) // eslint-disable-line

    usePageTitle(checkIn ? 'Edit Check In' : 'Submit Check In')

    //  Not needed for edit, but needed for new check-in??
    const {filters} = useContext(FilterContext)
    const id = filters.id

    const lockId = checkIn ? checkIn.lockId : id

    const getEntities = useCallback(async () => {
        setLock(await getEntryFromId(lockId) || {})
        setDataLoaded(true)
    }, [getEntryFromId, lockId])

    useEffect(() => {
        getEntities().then()
    }, [getEntities, lockId])

    const notValidLock = (dataLoaded && !lock)

    const defaultFormData = useMemo(() => {
        return {
            id: 'clci_' + genHexString(8),
            username: profile?.discordUsername || undefined,
            usernamePlatform: 'discord',
            lockId: lockId,
            country: profile?.country,
            stateProvince: profile?.stateProvince,
            userBelt: profile?.belt
        }
    }, [lockId, profile])
    const [form, setForm] = useState(defaultFormData)

    useEffect(() => {
        if (checkIn) {
            const ratings = checkIn
                ? Object.keys(checkIn)
                    .filter(key => (key.startsWith('rating') && !key.startsWith('rating-')))
                    .reduce((acc, key) => {
                        acc[key.replace('rating', '')] = parseInt(checkIn[key])
                        return acc
                    }, {})
                : {}
            setForm({...checkIn, ratings, edit: true})
            setCountry(checkIn.country || null)
            setStateProvince(checkIn.stateProvince || null)
        } else {
            setForm(defaultFormData)
            setCountry(profile?.country || null)
            setStateProvince(profile?.stateProvince || null)
        }
    }, [checkIn, defaultFormData, profile])

    const getHighlightColor = useCallback(field => {
        return !form[field]
            ? '#d00'
            : '#090'
    }, [form])

    if (notValidLock) {
        console.log('** No lock found for id: ' + lockId)
    }

    useEffect(() => {
        if (!scrolled) window.scrollTo({left: 0, top: 0, behavior: 'smooth'})
        setScrolled(true)
    }, [scrolled])

    const countryList = useMemo(() => {
        return countries.map(country => country.country_area)
    }, [])

    const handleFormChange = useCallback((event) => {
        let {name, value} = event.target
        let formCopy = {...form}

        if (name === 'country') {
            setCountry(value)
        }
        if (name === 'country' && !value) {
            setAcReset(!acReset)
        }
        if (name === 'country' && !statesProvinces[value]) {
            delete formCopy.stateProvince
        }
        if (name === 'videoUrl' && value) {
            value = sanitizeValues(value, {urlsOK: true})
        } else {
            value = sanitizeValues(value)
        }

        let updates = {[name]: value}
        setForm({...formCopy, ...updates})
        setContentChanged(true)
    }, [acReset, form])

    const handleDateChange = useCallback((dateValue) => {
        setForm({...form, ...dateValue})
        setContentChanged(true)
    }, [form])

    const urlError = form.videoUrl?.length > 0 && !validator.isURL(form.videoUrl, {require_protocol: true})
    const urlHelperText = urlError ? 'Video link is not a valid URL' : ' '

    const requiredFields = ['lockId', 'pickDate', 'username', 'usernamePlatform', 'successfulPick']
    const uploadable = requiredFields.every(field => form[field] && form[field].length > 0)

    const onRatingChange = useCallback(({dimension, rating}) => {
        setForm({...form, ratings: {...form.ratings, [dimension]: rating}})
        setContentChanged(true)
    }, [form])

    const handleUpdateProfile = useCallback(async () => {
        let localProfile = {...profile}
        let needUpdate = false
        try {
            if (form.username && form.usernamePlatform === 'discord' && form.username !== profile?.discordUsername) {
                localProfile = {...localProfile, discordUsername: form.username}
                needUpdate = true
            } else if (form.username && form.usernamePlatform === 'reddit' && form.username !== profile?.redditUsername) {
                localProfile = {...localProfile, redditUsername: form.username}
                needUpdate = true
            }
            if (form.country && form.country !== profile?.country) {
                localProfile = {...localProfile, country: form.country}
                needUpdate = true
            }
            if (form.stateProvince && form.stateProvince !== profile?.stateProvince) {
                localProfile = {...localProfile, stateProvince: form.stateProvince}
                needUpdate = true
            }
            if (form.userBelt && form.userBelt !== profile.belt) {
                localProfile = {...localProfile, belt: form.userBelt}
                needUpdate = true
            }
            if (needUpdate) await updateProfile(localProfile)
        } catch (error) {
            console.error('Couldn\'t set username on profile', error)
        }
    }, [form, profile, updateProfile])

    const handleSubmit = async (event) => {
        event.preventDefault()
        setUploading(true)
        const formCopy = {
            ...form,
            lockId: lockId,
            submittedAt: dayjs().toISOString(), // TODO should this be set here on in DBcontext?

            displayName: checkIn ? form.username : profile?.username || 'unknown',
            userId: checkIn ? form.userId : user.uid
        }

        if (form.ratings) {
            Object.keys(form.ratings).forEach(rating => {
                formCopy[`rating${rating}`] = form.ratings[rating]
            })
        }

        delete formCopy.ratings

        Object.keys(formCopy).forEach(key => (formCopy[key] === undefined || formCopy[key] === '') ? delete formCopy[key] : {})

        const formData = new FormData()
        Object.keys(formCopy).forEach(key => {
            formData.append(key, formCopy[key])
        })

        const url = `${nodeServerUrl}/check-in-challenge-lock`

        try {
            const results = await postData({user, url, formData, snackBars: false, timeoutDuration: 25000})
            setResponse(results)
            await updateVersion()
        } catch (error) {
            setUploadError(`${error}`.replace('Error: ', ''))
            enqueueSnackbar(`Error creating request: ${error}`, {variant: 'error', autoHideDuration: 3000})
        } finally {
            setUploading(false)
            if (!checkIn) {
                setAddTracking(showTracking)
                await handleUpdateProfile()
            }
        }
    }

    //TODO: clear form on error OK?
    const handleClose = useCallback(() => {
        setResponse(undefined)
        setUploading(false)
        setUploadError(undefined)
    }, [])

    const safeName = lock?.name?.replace(/[\s/]/g, '_').replace(/\W/g, '')

    const handleSubmitOK = useCallback(async () => {
        await refreshEntries()
        navigate(`/challengelocks?id=${lockId}&name=${safeName}&${queryString.stringify(searchParams)}`)
    }, [lockId, navigate, refreshEntries, safeName, searchParams])

    const handleLockClick = useCallback(() => {
        navigate(`/challengelocks?id=${lockId}&name=${safeName}&${queryString.stringify(searchParams)}`)
    }, [lockId, navigate, safeName, searchParams])

    const handleChange = useCallback(newValue => {
        navigate(newValue.page)
    }, [navigate])

    const {isMobile, flexStyle} = useWindowSize()
    const paddingLeft = !isMobile ? 16 : 8

    const headerStyle = {fontSize: '1.1rem', fontWeight: 600, margin: '5px 0px'}
    const optionalHeaderStyle = {fontSize: '1.1rem', fontWeight: 400, margin: '5px 0px', color: '#ccc'}
    const reqStyle = {height: 4, borderRadius: 2}
    const textFieldMax = 40

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
            <SubNav options={optionsCL} onChange={handleChange} defaultValue={optionsCL[0].label}/><br/>

            <div style={{
                maxWidth: 720, padding: 8, backgroundColor: '#222',
                marginLeft: 'auto', marginRight: 'auto', marginTop: 16, marginBottom: 46, paddingLeft: 8
            }}>

                <div style={{margin: `10px 20px 10px ${paddingLeft}px`, lineHeight: '1.5rem'}}>
                    <div style={{
                        fontSize: '1.4rem',
                        fontWeight: 700
                    }}>{checkIn ? 'Edit Check-in' : 'Check In'}
                    </div>
                    {!checkIn &&
                        <div style={{lineHeight: '1.5rem', marginTop: 5}}>
                            Use this page to submit a Check-in for a challenge lock you have picked or
                            attempted.<br/>
                            Please do not include any personal information for yourself or other recipients.<br/>
                        </div>
                    }
                </div>
                <div style={{margin: `10px 20px 20px ${paddingLeft}px`, lineHeight: '1.5rem'}}>
                    <div style={{display: flexStyle, paddingBottom: 10, borderBottom: '1px solid #ccc'}}>
                        <div style={{display: 'flex', alignItems: 'center', flexGrow: 1}}>
                            <div>
                                <div style={nameTextStyle}>
                                    <Link onClick={handleLockClick} style={{cursor: 'pointer'}}>{lock?.name}</Link>
                                </div>
                                <div style={makerTextStyle}>By: {lock?.maker}</div>
                            </div>
                        </div>
                        {lock?.thumbnail &&
                            <div style={{marginTop: 0}}>
                                <img src={lock?.thumbnail} alt={lock?.name}
                                     style={{width: 100, height: 100, marginRight: 10}}/>
                            </div>
                        }
                    </div>
                </div>

                <form action={null} encType='multipart/form-data' method='post'>
                    <div style={{paddingLeft: paddingLeft}}>
                        <div style={{marginTop: 10}}>
                            <div style={{display: flexStyle}}>
                                <div style={{display: 'flex'}}>
                                    <div style={{marginRight: 15}}>
                                        <div style={{...headerStyle}}>
                                            Discord/Reddit Username
                                        </div>
                                        <TextField type='text' name='username' style={{width: 240}}
                                                   onChange={handleFormChange}
                                                   value={form.username || profile?.discordUsername || ''}
                                                   color='info'/>
                                        <div style={{...reqStyle, backgroundColor: getHighlightColor('username')}}/>
                                    </div>
                                    <div style={{marginTop: 30, marginRight: 35}}>
                                        <RadioGroup
                                            name='usernamePlatform'
                                            onChange={handleFormChange}
                                            size='small'
                                            defaultValue='discord'
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
                                <div style={{marginRight: 20, width: 190, marginTop: 0}}>
                                    <div style={{...headerStyle}}>
                                        Pick Date
                                    </div>
                                    <DatePicker
                                        value={form.pickDate ? dayjs(form.pickDate) : null}
                                        disableFuture
                                        minDate={dayjs('2015-01-01')}
                                        maxDate={dayjs('2026-12-31')}
                                        onChange={(newValue) => handleDateChange({pickDate: newValue.toISOString()})}
                                    />
                                    <div style={{...reqStyle, backgroundColor: getHighlightColor('pickDate')}}/>
                                </div>

                            </div>
                        </div>

                        <div style={{display: flexStyle}}>
                            <div style={{marginRight: 20, width: 170, marginTop: 10}}>
                                <div style={{...headerStyle}}>
                                    Successful Pick?
                                </div>
                                <SelectBox changeHandler={handleFormChange}
                                           name='successfulPick' form={form}
                                           optionsList={['Yes', 'No']} size={'large'}
                                           width={170} multiple={false} defaultValue={''}/>
                                <div style={{...reqStyle, backgroundColor: getHighlightColor('successfulPick')}}/>
                            </div>

                            <div style={{marginRight: 20, flexGrow: 1, marginTop: 10}}>
                                <div style={optionalHeaderStyle}>Pick Video URL <span
                                    style={{...optionalHeaderStyle, fontWeight: 400, color: '#aaa'}}>(optional)</span>
                                </div>
                                <TextField type='text' name='videoUrl' fullWidth size='large'
                                           error={urlError} helperText={urlHelperText}
                                           onChange={handleFormChange} value={form.videoUrl || ''} color='info'/>
                            </div>
                        </div>

                        <div style={{
                            fontSize: '1.3rem', color: '#ccc', borderBottom: '1px solid #ccc',
                            marginTop: 20, marginRight: 20
                        }}>
                            Other Optional Information
                        </div>

                        <div style={{display: flexStyle}}>
                            <div style={{marginRight: 25, marginTop: 10}}>
                                <div style={{...optionalHeaderStyle}}>
                                    Your Ratings <span
                                    style={{...optionalHeaderStyle, fontWeight: 400, color: '#aaa'}}>(optional)</span>
                                </div>
                                <RatingTable ratingDimensions={ratingDimensions} onRatingChange={onRatingChange}
                                             ratings={form.ratings}/>
                            </div>

                            <div style={{flexGrow: 1, marginRight: 20, marginTop: 4}}>
                                <div style={{...optionalHeaderStyle, marginTop: 10}}>
                                    Notes <span
                                    style={{...optionalHeaderStyle, color: '#aaa'}}>(optional)</span>
                                </div>
                                <TextField type='text' name='notes' multiline fullWidth rows={6} size='small'
                                           color='info' style={{}} value={form.notes || ''}
                                           maxLength={1200} id='notes' onChange={handleFormChange}/>
                            </div>
                        </div>

                        <div style={{display: flexStyle, width: '100%', marginTop: 0, justifyContent: 'center'}}>
                            <div style={{marginRight: 20, marginTop: 10}}>
                                <div style={optionalHeaderStyle}>
                                    Your Location<br/><span style={{color: '#aaa'}}>(optional)</span>
                                </div>
                                <AutoCompleteBox changeHandler={handleFormChange}
                                                 options={countryList} value={form.country || null}
                                                 name={'country'} style={{width: 300}}
                                                 reset={acReset}
                                                 inputValueHandler={setInputValue}
                                />
                            </div>

                            {statesProvinces[form.country] &&
                                <div style={{marginRight: 20, marginTop: 10}}>
                                    <div style={optionalHeaderStyle}>
                                        State/Province<br/><span style={{color: '#aaa'}}>(optional)</span>
                                    </div>
                                    <AutoCompleteBox changeHandler={handleFormChange}
                                                     options={statesProvinces[form.country].sort()}
                                                     value={form.stateProvince || null}
                                                     name={'stateProvince'} style={{width: 200}}
                                                     reset={acReset}
                                                     inputValueHandler={setStateProvince}
                                    />
                                </div>
                            }
                            <div style={{marginTop: 10}}>
                                <div style={optionalHeaderStyle}>
                                    Current Belt<br/><span style={{color: '#aaa'}}>(optional)</span>
                                </div>
                                <SelectBox changeHandler={handleFormChange}
                                           name='userBelt' form={form}
                                           optionsList={['Unranked', ...uniqueBelts]}
                                           multiple={false} defaultValue={''}
                                           size={'large'} width={130}/>
                            </div>
                        </div>

                        <div style={{marginTop: 40, width: '100%', textAlign: 'center'}}>
                            <Button variant='outlined' onClick={() => setShowTracking(!showTracking)}>
                                {showTracking ? 'Hide' : 'Add '} Personal Tracking Info</Button>
                        </div>

                        <Collapse in={showTracking} timeout={500} style={{width: '100%'}}>
                            <div style={{display: flexStyle, justifyContent: 'center'}}>

                                <div style={{marginRight: 20, marginTop: 10}}>
                                    <div style={{...optionalHeaderStyle}}>
                                        Received From
                                    </div>
                                    <TextField type='text' name='receivedFrom' style={{width: 240}}
                                               onChange={handleFormChange}
                                               value={form.receivedFrom || ''} color='info'
                                               inputProps={{maxLength: textFieldMax}}/>
                                </div>

                                <div style={{marginRight: 20, width: 200, marginTop: 10}}>
                                    <div style={{...optionalHeaderStyle}}>
                                        Date Received
                                    </div>
                                    <DatePicker
                                        value={form.sentDate ? dayjs(form.receivedDate) : null}
                                        disableFuture
                                        minDate={dayjs('2015-01-01')}
                                        maxDate={dayjs('2026-12-31')}
                                        onChange={(newValue) => handleDateChange({receivedDate: newValue.toISOString()})}
                                    />
                                </div>

                            </div>
                            <div style={{display: flexStyle, justifyContent: 'center'}}>

                                <div style={{marginRight: 20, marginTop: 10}}>
                                    <div style={{...optionalHeaderStyle}}>
                                        Sent To
                                    </div>
                                    <TextField type='text' name='sentTo' style={{width: 240}}
                                               onChange={handleFormChange}
                                               value={form.sentTo || ''} color='info'
                                               inputProps={{maxLength: textFieldMax}}/>
                                </div>

                                <div style={{marginRight: 20, width: 200, marginTop: 10}}>
                                    <div style={{...optionalHeaderStyle}}>
                                        Date Sent
                                    </div>
                                    <DatePicker
                                        value={form.sentDate ? dayjs(form.sentDate) : null}
                                        disableFuture
                                        minDate={dayjs('2015-01-01')}
                                        maxDate={dayjs('2026-12-31')}
                                        onChange={(newValue) => handleDateChange({sentDate: newValue.toISOString()})}
                                    />
                                </div>
                            </div>
                        </Collapse>

                        <div style={{margin: '30px 0px', width: '100%', textAlign: 'center'}}>
                            {checkIn &&
                                <Button
                                    onClick={() => navigate(`/challengelocks?id=${checkIn.lockId}&${queryString.stringify(searchParams)}`)}
                                    variant='contained'
                                    color='error' style={{marginRight: 20}}>
                                    Cancel
                                </Button>
                            }
                            <Button onClick={handleSubmit} variant='contained' color='info'
                                    disabled={!uploadable || uploading || !contentChanged}>
                                {checkIn ? 'Save Changes' : 'Submit'}
                            </Button>
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
                        You must be logged in to submit Check-ins.<br/><br/>
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


                <Dialog open={notValidLock} componentsProps={{
                    backdrop: {style: {backgroundColor: '#000', opacity: 0.7}}
                }}>
                    <div style={{display: 'flex'}}>
                        <div style={{backgroundColor: '#444', marginLeft: 'auto', marginRight: 'auto', padding: 40}}>
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
                            }}>Click below to browse the challenge locks page and select a lock to check in.
                            </div>

                            <div style={{width: '100%', textAlign: 'center'}}>
                                <Button onClick={() => navigate('/challengelocks')} variant='contained' color='info'
                                        style={{marginLeft: 'auto', marginRight: 'auto'}}>
                                    Browse Challenge Locks
                                </Button>
                            </div>
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
                            }}>{checkIn ? 'Check-in updated.' : 'You\'re checked in!'}
                            </div>

                            <div style={{width: '100%', textAlign: 'center'}}>
                                <Button onClick={handleSubmitOK} variant='contained'
                                        color='info'
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

function genHexString(len) {
    const hex = '0123456789ABCDEF'
    let output = ''
    for (let i = 0; i < len; ++i) {
        output += hex.charAt(Math.floor(Math.random() * hex.length))
    }
    return output.toLowerCase()
}
