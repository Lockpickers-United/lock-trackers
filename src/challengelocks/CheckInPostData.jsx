import React, {useCallback, useContext, useEffect, useMemo, useState} from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import useWindowSize from '../util/useWindowSize.jsx'
import Dialog from '@mui/material/Dialog'
import LoadingDisplay from '../misc/LoadingDisplay.jsx'
import Tracker from '../app/Tracker.jsx'
import SelectBox from '../formUtils/SelectBox.jsx'
import {uniqueBelts} from '../data/belts'
import Link from '@mui/material/Link'
import ChoiceButtonGroup from '../util/ChoiceButtonGroup.jsx'
import {useNavigate} from 'react-router-dom'
import AuthContext from '../app/AuthContext.jsx'
import {postData} from '../formUtils/postData.jsx'
import {enqueueSnackbar} from 'notistack'
import countries from '../data/countries.json'
import AutoCompleteBox from '../formUtils/AutoCompleteBox.jsx'
import {DatePicker} from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs'
import {FormControlLabel, Radio, RadioGroup} from '@mui/material'
import DBContext from './DBProviderCL.jsx'
import DataContext from '../context/DataContext.jsx'
import {jsonIt} from '../util/jsonIt.js' // eslint-disable-line
import checkInTestData from './checkInTestData.json'
import FilterContext from '../context/FilterContext.jsx'
import RatingTable from './RatingTable.jsx'
import ratingDimensions from '../data/clRatingDimensions.json'
import {optionsCL} from '../data/subNavOptions.js'
import validator from 'validator'
import filterProfanity from '../util/filterProfanity.js'

/**
 * @prop inputValue
 * @prop country_area
 */

export default function CheckIn() {

    const serverUrl = 'https://lpulocks.com:7443'

    const {allEntries, getEntryFromId} = useContext(DataContext)
    const {user} = useContext(AuthContext)
    const {profile, refreshEntries, updateVersion} = useContext(DBContext)
    const [response, setResponse] = useState(undefined)
    const [uploading, setUploading] = useState(false)
    const [uploadError, setUploadError] = useState(undefined)
    const [acReset, setAcReset] = useState(false)
    const [inputValue, setInputValue] = useState(undefined) // eslint-disable-line
    const [location, setLocation] = useState(null)
    const [ratings, setRatings] = useState({})
    const [scrolled, setScrolled] = useState(false)
    const [highlightRequired, setHighlightRequired] = useState(false)

    //     const lockId = 'cl_69dfddd5'
    const {filters} = useContext(FilterContext)
    const lockId = filters.id
    const lock = getEntryFromId(lockId) || {}
    const notValidLock = (Object.keys(allEntries).length > 0 && Object.keys(lock).length === 0)
    const navigate = useNavigate()

    const defaultFormData = useMemo(() => {
        return {
            id: 'clci_' + genHexString(8),
            username: profile.discordUsername || '',
            usernamePlatform: 'discord',
            lockId: lockId
        }
    }, [lockId, profile.discordUsername])
    const [form, setForm] = useState(defaultFormData)

    const getHighlightColor = useCallback(field => {
        return highlightRequired
            ? !form[field]
                ? '#d00'
                : '#090'
            : 'inherit'
    }, [form, highlightRequired])
    const showRequired = useCallback(() => {
        setHighlightRequired(!highlightRequired)
        console.log('form', form)
    }, [form, highlightRequired])

    if (notValidLock) {
        console.log('** No lock found for id: ' + lockId)
    }

    useEffect(() => {
        if (!scrolled) window.scrollTo({left: 0, top: 0, behavior: 'smooth'})
        setScrolled(true)
    }, [scrolled])

    const handleTestData = useCallback(() => {
        setForm({...form, ...checkInTestData})
        setLocation(checkInTestData.country)
    }, [form])

    const handleFormChange = useCallback((event) => {
        let {name, value} = event.target
        if (name !== 'videoUrl') value = value.replace(/https?:\/\/[^\s]+/g, '[link removed]')
        if (name === 'country') setLocation(value)
        setForm({...form, [name]: filterProfanity(value)})
    }, [form])

    const urlError = form.videoUrl?.length > 0 && !validator.isURL(form.videoUrl, {require_protocol: true})
    const urlHelperText = urlError ? 'Video link is not a valid URL' : ' '

    const handleDateChange = useCallback((dateValue) => {
        setForm({...form, ...dateValue})
    }, [form])

    const requiredFields = ['lockId', 'username', 'usernamePlatform', 'successfulPick']
    const uploadable = requiredFields.every(field => form[field] && form[field].length > 0)

    const handleSubmit = async (event) => {
        event.preventDefault()
        setUploading(true)
        const formCopy = {
            ...form,
            lockId: lockId,
            submittedAt: dayjs().toISOString(),
            displayName: profile?.username || 'no display name',
            userId: user.uid
        }

        //jsonIt('formCopy', formCopy)

        if (form.ratings) {
            Object.keys(form.ratings).forEach(rating => {
                formCopy[`rating${rating}`] = form.ratings[rating]
            })
        }

        delete formCopy.ratings

        const formData = new FormData()
        Object.keys(formCopy).forEach(key => {
            formData.append(key, formCopy[key])
        })

        const url = `${serverUrl}/check-in-challenge-lock`

        try {
            const results = await postData({user, url, formData, snackBars: false})
            setResponse(results)
            await updateVersion()
        } catch (error) {
            setUploadError(`${error}`.replace('Error: ', ''))
            enqueueSnackbar(`Error creating request: ${error}`, {variant: 'error', autoHideDuration: 3000})
            throw error
        } finally {
            setUploading(false)
            setForm(formCopy)
        }
    }

    const handleReload = useCallback(() => { // eslint-disable-line
        setAcReset(!acReset)
        setForm(defaultFormData)
        setResponse(undefined)
        setLocation(null)
        setUploading(false)
        setUploadError(undefined)
        setRatings({})
        setTimeout(() => {
            window.scrollTo({
                left: 0,
                top: 0,
                behavior: 'smooth'
            })
        }, 100)
    }, [acReset, defaultFormData])

    //TODO: clear form on error OK?
    const handleClose = useCallback(() => {
        setResponse(undefined)
        setUploading(false)
        setUploadError(undefined)
    }, [])

    const handleSubmitOK = useCallback(async () => {
        await refreshEntries()
        navigate(`/challengelocks?id=${lockId}`)
    }, [lockId, navigate, refreshEntries])

    const countryList = useMemo(() => {
        return countries.map(country => country.country_area)
    }, [])

    const safeName = lock?.name?.replace(/[\s/]/g, '_').replace(/\W/g, '')
    const handleLockClick = useCallback(() => {
        navigate(`/challengelocks?id=${lockId}&name=${safeName}`)
    }, [lockId, navigate, safeName])


    const handleChange = useCallback(newValue => {
        navigate(newValue.page)
    }, [navigate])

    const onRatingChange = useCallback(({dimension, rating}) => {
        //console.log('ratings', {...ratings, [dimension]: rating})
        setRatings({...ratings, [dimension]: rating})
        setForm({...form, ratings: {...ratings, [dimension]: rating}})
    }, [form, ratings])

    const {isMobile, flexStyle} = useWindowSize()
    const paddingLeft = !isMobile ? 16 : 8

    const headerStyle = {fontSize: '1.1rem', fontWeight: 600, margin: '5px 0px'}
    const optionalHeaderStyle = {fontSize: '1.1rem', fontWeight: 400, margin: '5px 0px', color: '#ccc'}

    const nameTextStyle = {fontSize: '1.5rem', lineHeight: '1.7rem', color: '#fff', fontWeight: 600, wordBreak: 'break-word', inlineSize: '100%', marginRight:20}
    const makerTextStyle = {fontSize: '1.2rem', lineHeight: '1.4rem', color: '#fff', wordBreak: 'break-word', inlineSize: '100%', marginRight:20, marginTop: 5}

    return (

        <React.Fragment>
            <ChoiceButtonGroup options={optionsCL} onChange={handleChange} defaultValue={optionsCL[2].label}/><br/>
            <Link onClick={handleTestData}>Fill test data</Link>

            <div style={{
                maxWidth: 720, padding: 8, backgroundColor: '#222',
                marginLeft: 'auto', marginRight: 'auto', marginTop: 16, marginBottom: 46, paddingLeft: 8
            }}>

                <div style={{margin: `10px 20px 20px ${paddingLeft}px`, lineHeight: '1.5rem'}}>
                    <div style={{display: flexStyle, paddingBottom: 15, borderBottom: '1px solid #ccc'}}>
                        <div style={{display: 'flex', alignItems: 'center', flexGrow: 1}}>
                            <div>
                                <div style={{marginBottom: 10, fontSize: '0.9rem'}}>Challenge Lock Check In</div>
                                <div style={nameTextStyle}>
                                    <Link onClick={handleLockClick} style={{cursor: 'pointer'}}>{lock.name}</Link>
                                </div>
                                <div style={makerTextStyle}>By: {lock.maker}</div>
                            </div>
                        </div>
                        {lock.thumbnail &&
                            <div style={{marginTop: 5}}>
                                <img src={lock.thumbnail} alt={lock.name}
                                     style={{width: 120, height: 120, marginRight: 10}}/>
                            </div>
                        }
                    </div>
                </div>

                <form action={null} encType='multipart/form-data' method='post'
                      onSubmit={handleSubmit}>
                    <div style={{paddingLeft: paddingLeft}}>
                        <div style={{marginTop: 10}}>
                            <div style={{display: flexStyle}}>
                                <div style={{display: 'flex'}}>
                                    <div style={{marginRight: 15}}>
                                        <div style={{...headerStyle, backgroundColor: getHighlightColor('username')}}>
                                            Discord/Reddit Username
                                        </div>
                                        <TextField type='text' name='username' style={{width: 240}}
                                                   onChange={handleFormChange}
                                                   value={form.username || profile.discordUsername || ''}
                                                   color='info'/>
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
                                    <div style={{...headerStyle, backgroundColor: getHighlightColor('pickDate')}}>
                                        Pick Date
                                    </div>
                                    <DatePicker label='Pick Date'
                                                value={form.pickDate ? dayjs(form.pickDate) : null}
                                                disableFuture
                                                minDate={dayjs('2015-01-01')}
                                                maxDate={dayjs('2026-12-31')}
                                                onChange={(newValue) => handleDateChange({pickDate: newValue.toISOString()})}
                                    />
                                </div>

                            </div>
                        </div>

                        <div style={{display: flexStyle}}>
                            <div style={{marginRight: 20, width: 170, marginTop: 10}}>
                                <div style={{...headerStyle, backgroundColor: getHighlightColor('successfulPick')}}>
                                    Successful Pick?
                                </div>
                                <SelectBox changeHandler={handleFormChange}
                                           name='successfulPick' form={form}
                                           optionsList={['Yes', 'No']} size={'large'}
                                           width={170} multiple={false} defaultValue={''}/>
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
                            fontSize: '1.3rem',
                            color: '#ccc',
                            borderBottom: '1px solid #ccc',
                            marginTop: 20,
                            marginRight: 20
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
                                             ratings={ratings}/>
                            </div>

                            <div style={{flexGrow: 1, marginRight: 20}}>
                                <div style={{...optionalHeaderStyle, marginTop: 10}}>
                                    Notes <span
                                    style={{...optionalHeaderStyle, color: '#aaa'}}>(optional)</span>
                                </div>
                                <TextField type='text' name='notes' multiline fullWidth rows={3} size='small'
                                           color='info' style={{}} value={form.notes || ''}
                                           maxLength={1200} id='notes' onChange={handleFormChange}/>

                                <div style={{display: flexStyle, marginTop: 10}}>
                                    <div style={{marginRight: 0}}>
                                        <div style={optionalHeaderStyle}>
                                            Approx. Belt <span
                                            style={{...optionalHeaderStyle, color: '#aaa'}}>(optional)</span>
                                        </div>
                                        <SelectBox changeHandler={handleFormChange}
                                                   name='approxBelt' form={form} optionsList={uniqueBelts}
                                                   multiple={false} defaultValue={''}
                                                   size={'small'} width={180}/>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div style={{display: flexStyle, width: '100%', marginTop: 0, justifyContent: 'center'}}>
                            <div style={{marginRight: 20, marginTop: 10}}>
                                <div style={optionalHeaderStyle}>
                                    Your Location <span style={{color: '#aaa'}}>(optional)</span>
                                </div>
                                <AutoCompleteBox changeHandler={handleFormChange}
                                                 options={countryList} value={location}
                                                 name={'country'} style={{width: 300}}
                                                 reset={acReset}
                                                 inputValueHandler={setInputValue}
                                />
                            </div>

                            <div style={{marginTop: 10}}>
                                <div style={optionalHeaderStyle}>
                                    Current Belt <span style={{color: '#aaa'}}>(optional)</span>
                                </div>
                                <SelectBox changeHandler={handleFormChange}
                                           name='userBelt' form={form}
                                           optionsList={['Unranked', ...uniqueBelts]}
                                           multiple={false} defaultValue={''}
                                           size={'large'} width={200}/>
                            </div>
                        </div>

                        <div style={{margin: '30px 0px', width: '100%', textAlign: 'center'}}>
                            <Link
                                onClick={showRequired}>{highlightRequired ? 'turn off highlighting' : 'highlight required fields'}</Link>
                        </div>

                        <div style={{margin: '30px 0px', width: '100%', textAlign: 'center'}}>
                            <Button type='submit' variant='contained' color='info'
                                    disabled={(!uploadable || uploading)}>
                                Submit
                            </Button>
                        </div>
                    </div>
                </form>

                <Dialog open={uploading} componentsProps={{backdrop: {style: {backgroundColor: '#000', opacity: 0.7}}}}>
                    <div style={{width: 320, textAlign: 'center', padding: 30}}>
                        <LoadingDisplay/>
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
                            }}>You&#39;re checked in!
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
                <Tracker feature='uploadPhotos'/>
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
