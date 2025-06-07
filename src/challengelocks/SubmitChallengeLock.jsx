import React, {useCallback, useContext, useEffect, useMemo, useState} from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dropzone from '../formUtils/Dropzone.jsx'
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
import lockFormats from '../data/lockFormats.json'
import lockingMechanisms from '../data/lockingMechanisms.json'
import AutoCompleteBox from '../formUtils/AutoCompleteBox.jsx'
import {DatePicker} from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs'
import clTestData from './clTestData.json'
import {FormControlLabel, Radio, RadioGroup} from '@mui/material'
import DBContext from './DBProviderCL.jsx'
import {optionsCL} from '../data/subNavOptions.js'
import {jsonIt} from '../util/jsonIt.js' //eslint-disable-line
import sanitizeValues from '../util/sanitizeText.js'
import filterProfanity from '../util/filterProfanity.js'
import DataContext from '../context/DataContext.jsx'
import FreeSoloAutoCompleteBox from '../formUtils/FreeSoloAutoCompleteBox.jsx'

/**
 * @prop newBrand
 * @prop allMakes
 */

export default function SubmitChallengeLock({entry}) {

    const serverUrl = 'https://lpulocks.com:7443'

    const {user} = useContext(AuthContext)
    const {profile, refreshEntries, updateVersion, updateEntry} = useContext(DBContext)
    const {makerData} = useContext(DataContext)
    const [mainPhoto, setMainPhoto] = useState([])
    const [files, setFiles] = useState([])
    const [response, setResponse] = useState(undefined)
    const [uploading, setUploading] = useState(false)
    const [uploadError, setUploadError] = useState(undefined)
    const [acReset, setAcReset] = useState(false)
    const [form, setForm] = useState({})
    const [inputValue, setInputValue] = useState(undefined) // eslint-disable-line
    const [location, setLocation] = useState(null)
    const [entryId, setEntryId] = useState(undefined)
    const [entryName, setEntryName] = useState(undefined)
    const [checkIn, setCheckIn] = useState(false)
    const [highlightRequired, setHighlightRequired] = useState(false)

    useEffect(() => {
        if (entry) {
            setForm(entry)
            setLocation(entry.country || null)
            setEntryId(entry.id)
            setEntryName(entry.name)
        } else {
            const newForm = {
                id: 'cl_' + genHexString(8),
                username: profile.discordUsername || undefined,
                usernamePlatform: 'discord'
            }
            setForm(newForm)
            setLocation(null)
        }
    }, [entry, profile.discordUsername])

    const handleTestData = useCallback(() => {
        setForm({...form, ...clTestData, lockCreated: dayjs().toISOString()})
        setLocation(clTestData.country)
    }, [form])

    const textFieldMax = 40
    const makerOptions = Object.keys(makerData).sort((a, b) => {
        return a.localeCompare(b)
    })

    const handleFormChange = useCallback((event) => {
        let {name, value} = event.target
        if (name === 'country') setLocation(value)
        setForm({...form, [name]: filterProfanity(value)})
    }, [form])

    const handleDateChange = useCallback((dateValue) => {
        setForm({...form, ...dateValue})
    }, [form])

    const requiredFields = ['name', 'maker', 'lockCreated', 'country', 'username', 'usernamePlatform']
    const uploadable = requiredFields.every(field => form[field] && form[field].length > 0) &&
        (mainPhoto.length > 0 || entry)

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

    const handleDroppedFiles = useCallback((allFiles, zoneId = 'dropzone') => {
        if (zoneId === 'mainPhoto') {
            setMainPhoto(allFiles)
            setForm({...form, mainPhoto: allFiles.length > 0})
        } else {
            setFiles(allFiles)
        }
    }, [form])

    const handleSubmit = async ({doCheckIn = false}) => {

        setUploading(true)
        setCheckIn(doCheckIn)

        const formCopy = {
            ...sanitizeValues(form),
            displayName: sanitizeValues(profile?.username) || 'no display name',
            status: 'active',
        }

        const formData = new FormData()
        Object.keys(formCopy).forEach(key => {
            formData.append(key, formCopy[key])
        })

        if (!entry) {
            const prefix = formCopy.name?.replace('/', '+')
            const suffix = formCopy.username?.replace('/', '+')
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
        //return

        if (entry) {
            Object.keys(formCopy).forEach(key => formCopy[key] === undefined ? delete formCopy[key] : {})

            const submitInfo = entry.submittedBy
                ? entry.submittedBy
                : entry.requestedBy
                    ? entry.requestedBy[0]
                    : {}

            formCopy.submittedBy = {
                userId: submitInfo.userId || 'unknown',
                displayName: submitInfo.displayName || 'unknown',
                userBelt: formCopy.userBelt || submitInfo.userBelt || 'unknown',
                username: formCopy.username || submitInfo.username || 'unknown',
                usernamePlatform: formCopy.usernamePlatform || submitInfo.usernamePlatform || 'unknown'
            }

            try {
                await updateEntry(formCopy)
            } catch (error) {
                setUploadError(`${error}`.replace('Error: ', ''))
                enqueueSnackbar(`Error creating request: ${error}`, {variant: 'error', autoHideDuration: 3000})
                throw error
            } finally {
                await refreshEntries()
                setUploading(false)
                const safeName = formCopy.name.replace(/[\s/]/g, '_').replace(/\W/g, '')
                navigate(`/challengelocks?id=${formCopy.id}&name=${safeName}`)
            }
        } else {
            const url = `${serverUrl}/submit-challenge-lock`

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
                setEntryId(form.id)
                setEntryName(form.name)
                files.forEach(file => URL.revokeObjectURL(file.preview))
                mainPhoto.forEach(file => URL.revokeObjectURL(file.preview))
                setFiles([])
                setUploading(false)
                setForm(formCopy)
            }
        }
    }

    const navigate = useNavigate()
    const handleChange = useCallback(newValue => {
        navigate(newValue.page)
    }, [navigate])

    const handleReload = useCallback(async () => {
        if (checkIn) {
            const safeName = entryName.replace(/[\s/]/g, '_').replace(/\W/g, '')
            navigate(`/challengelocks/checkin?id=${entryId}&name=${safeName}`)
        } else {
            const safeName = form.name.replace(/[\s/]/g, '_').replace(/\W/g, '')
            navigate(`/challengelocks?id=${form.id}&name=${safeName}`)
        }

        // unused for now.
        files.forEach(file => URL.revokeObjectURL(file.preview))
        setFiles([])
        mainPhoto.forEach(file => URL.revokeObjectURL(file.preview))
        setMainPhoto([])
        setAcReset(!acReset)
        setForm({id: 'cl_' + genHexString(8), usernamePlatform: 'discord'})
        setResponse(undefined)
        setLocation(null)
        setUploading(false)
        setUploadError(undefined)
        setHighlightRequired(false)
        setTimeout(() => {
            window.scrollTo({
                left: 0,
                top: 0,
                behavior: 'smooth'
            })
        }, 100)

    }, [acReset, checkIn, entryId, entryName, files, form, mainPhoto, navigate])

    //TODO: clear form on error OK?
    const handleClose = useCallback(() => {
        setResponse(undefined)
        setUploading(false)
        setUploadError(undefined)
    }, [])

    const countryList = useMemo(() => {
        return countries.map(country => country.country_area)
    }, [])


    const {isMobile, flexStyle} = useWindowSize()
    //const fullWidth = !isMobile ? 660 : 300
    const paddingLeft = !isMobile ? 16 : 8

    const headerStyle = {fontSize: '1.1rem', fontWeight: 600, marginBottom: 5, paddingLeft: 2, width: '100%'}
    const optionalHeaderStyle = {fontSize: '1.1rem', fontWeight: 400, marginBottom: 5, paddingLeft: 2, color: '#ccc'}

    const subNavItem = entry ? optionsCL[0] : optionsCL[1]

    return (

        <React.Fragment>
            <ChoiceButtonGroup options={optionsCL} onChange={handleChange} defaultValue={subNavItem.label}/><br/>
            <Link onClick={handleTestData}>Fill test data</Link>


            <div style={{
                maxWidth: 720, padding: 8, backgroundColor: '#222',
                marginLeft: 'auto', marginRight: 'auto', marginTop: 16, marginBottom: 46, paddingLeft: 8
            }}>
                <div style={{margin: `10px 20px 30px ${paddingLeft}px`, lineHeight: '1.5rem'}}>
                    <div style={{
                        fontSize: '1.3rem',
                        fontWeight: 700,
                        marginBottom: 10
                    }}>{entry ? 'Edit' : 'Submit a'} Challenge Lock
                    </div>
                    {!entry &&
                        <div>
                            Use this page to submit a new Challenge Lock that you have either created or received.
                            Please be sure to <Link onClick={() => navigate('/challengelocks')}
                                                    style={{color: '#bbb', cursor: 'pointer', fontWeight: 700}}>check
                            the
                            existing locks</Link> for a match before submitting.
                        </div>
                    }
                </div>

                <form action={null} encType='multipart/form-data' method='post'>
                    <div style={{paddingLeft: paddingLeft}}>

                        <div style={{display: flexStyle, marginBottom: 0}}>
                            <div style={{marginRight: 20, width: 340}}>
                                <div style={{...headerStyle, backgroundColor: getHighlightColor('name')}}>
                                    Challenge Lock Name
                                </div>
                                <TextField type='text' name='name' style={{width: 340}}
                                           onChange={handleFormChange}
                                           value={form.name || ''} color='info'
                                           inputProps={{maxLength: textFieldMax}}/>
                            </div>
                            <div style={{width: 300}}>
                                <div style={{...headerStyle, backgroundColor: getHighlightColor('maker')}}>
                                    CL Maker
                                </div>
                                <FreeSoloAutoCompleteBox changeHandler={handleFormChange}
                                                 options={makerOptions} value={form.maker || ''}
                                                 name={'maker'} style={{width: 300}} maxLength={textFieldMax}
                                                 reset={acReset} inputValueHandler={setInputValue}
                                />

                            </div>
                        </div>

                        <div style={{display: flexStyle, marginTop: 20}}>

                            <div style={{marginRight: 20, width: 200}}>
                                <div style={{...headerStyle, backgroundColor: getHighlightColor('lockCreated')}}>
                                    Created
                                </div>
                                <DatePicker
                                            value={form.lockCreated ? dayjs(form.lockCreated) : null}
                                            onChange={(newValue) => handleDateChange({lockCreated: newValue.toISOString()})}
                                            disableFuture
                                            minDate={dayjs('2015-01-01')}
                                            maxDate={dayjs('2026-12-31')}
                                />
                            </div>

                            <div style={{marginRight: 20, width: 250}}>
                                <div style={{...headerStyle, backgroundColor: getHighlightColor('country')}}>Origin
                                </div>
                                <AutoCompleteBox changeHandler={handleFormChange}
                                                 options={countryList} value={location}
                                                 name={'country'} style={{width: 250}}
                                                 reset={acReset}
                                                 inputValueHandler={setInputValue}
                                />
                            </div>

                            <div style={{width: 170}}>
                                <div style={{...headerStyle, backgroundColor: getHighlightColor('lockFormat')}}>Lock
                                    Format
                                </div>
                                <SelectBox changeHandler={handleFormChange}
                                           name='lockFormat' form={form}
                                           optionsList={lockFormats} size={'large'}
                                           width={170} multiple={false} defaultValue={''}/>
                            </div>
                        </div>

                        {!entry &&
                            <div style={{display: flexStyle, marginTop: 30}}>
                                <div style={{marginRight: 20, width: 250}}>
                                    <div style={{...headerStyle, backgroundColor: getHighlightColor('mainPhoto')}}>
                                        Main Lock Photo (no spoilers!)<br/>
                                    </div>
                                    <Dropzone files={mainPhoto} handleDroppedFiles={handleDroppedFiles} maxFiles={1}
                                              zoneId={'mainPhoto'}/>
                                </div>
                                <div style={{marginRight: 0, flexGrow: 1, maxWidth: 390}}>
                                    <div style={{...optionalHeaderStyle, color: '#fff'}}>
                                        Other Lock Photos <span
                                        style={{...optionalHeaderStyle, fontWeight: 400, color: '#aaa'}}>(optional, spoilers OK, max 5)</span>
                                    </div>
                                    <Dropzone files={files} handleDroppedFiles={handleDroppedFiles} maxFiles={5}/>
                                </div>
                            </div>
                        }

                        <div style={{display: flexStyle, marginTop: 30}}>
                            <div style={{flexGrow: 1, maxWidth: 660, marginRight: 20}}>
                                <div style={{display: 'flex'}}>
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

                        <div style={{display: flexStyle, marginTop: 20}}>
                            <div style={{marginRight: 20}}>
                                <div style={optionalHeaderStyle}>Mechanism <span
                                    style={{...optionalHeaderStyle, fontWeight: 400, color: '#aaa'}}>(optional)</span>
                                </div>
                                <SelectBox changeHandler={handleFormChange}
                                           name='lockingMechanism' form={form}
                                           optionsList={lockingMechanisms} size={'large'}
                                           width={180} multiple={false} defaultValue={''}/>
                            </div>
                            <div style={{marginRight: 20}}>
                                <div style={optionalHeaderStyle}>Original Lock <span
                                    style={{...optionalHeaderStyle, fontWeight: 400, color: '#aaa'}}>(optional)</span>
                                </div>
                                <TextField type='text' name='originalLock' style={{width: 250}}
                                           onChange={handleFormChange} value={form.originalLock || ''} color='info'
                                           inputProps={{maxLength: textFieldMax}}/>
                            </div>
                            <div style={{}}>
                                <div style={optionalHeaderStyle}>
                                    Approx. Belt <span style={{...optionalHeaderStyle, color: '#aaa'}}>(optional)</span>
                                </div>
                                <SelectBox changeHandler={handleFormChange}
                                           name='approximateBelt' form={form} optionsList={uniqueBelts}
                                           multiple={false} defaultValue={''}
                                           size={'large'} width={180}/>
                            </div>
                        </div>

                        <div style={{marginTop: 30}}>
                            <div style={{display: flexStyle}}>
                                <div style={{display: 'flex'}}>
                                    <div style={{marginRight: 15}}>
                                        <div style={{...headerStyle, backgroundColor: getHighlightColor('username')}}>
                                            {entry ? 'Original' : 'Your'} Username
                                        </div>
                                        <TextField type='text' name='username' style={{width: 240}}
                                                   onChange={handleFormChange} value={form.username || ''} color='info'
                                                   inputProps={{maxLength: textFieldMax}}/>
                                    </div>
                                    <div style={{marginTop: 25, marginRight: 30}}>
                                        <RadioGroup
                                            name='usernamePlatform'
                                            onChange={handleFormChange}
                                            size='small'
                                            value={form.usernamePlatform || 'discord'}
                                            sx={{
                                                '& .MuiRadio-root': {
                                                    padding: '7px'
                                                }
                                            }}
                                        >
                                            <FormControlLabel value='discord' control={<Radio size='small'/>}
                                                              label='Discord'/>
                                            <FormControlLabel value='reddit' control={<Radio size='small'/>}
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
                                               name='userBelt' form={form}
                                               optionsList={['Unranked', ...uniqueBelts]}
                                               multiple={false} defaultValue={''}
                                               size={'large'} width={200}/>
                                </div>
                            </div>
                        </div>

                        {!uploadable &&
                            <div style={{margin: '30px 0px', width: '100%', textAlign: 'center'}}>
                                <Link
                                    onClick={showRequired}>{highlightRequired ? 'turn off highlighting' : 'highlight required fields'}</Link>
                            </div>
                        }

                        <div style={{margin: '30px 0px', width: '100%', textAlign: 'center'}}>
                            {entry &&
                                <Button onClick={() => navigate(`/challengelocks?id=${entry.id}`)} variant='contained'
                                        color='error' style={{marginRight: 20}}>
                                    Cancel
                                </Button>
                            }
                            <Button onClick={() => handleSubmit({doCheckIn: false})} variant='contained' color='info'
                                    disabled={!uploadable || uploading}
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
                <Tracker feature='uploadPhotos'/>
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
