import React, {useCallback, useContext, useMemo, useState} from 'react'
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
import {lockingMechanisms} from './CLSubmitData.js'
import countries from '../data/countries.json'
import lockFormats from '../data/lockFormats.json'
import AutoCompleteBox from '../formUtils/AutoCompleteBox.jsx'
import {DatePicker} from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs'
import clTestData from './clTestData.json'
import {FormControlLabel, Radio, RadioGroup} from '@mui/material'
import DBContext from './DBContextCL.jsx'


/**
 * @prop newBrand
 * @prop allMakes
 */

export default function SubmitChallengeLock({lockData}) {

    const serverUrl = 'https://lpulocks.com:7443'

    const {user} = useContext(AuthContext)
    const {profile} = useContext(DBContext)
    const [mainPhoto, setMainPhoto] = useState([])
    const [files, setFiles] = useState([])
    const [response, setResponse] = useState(undefined)
    const [uploading, setUploading] = useState(false)
    const [uploadError, setUploadError] = useState(undefined)
    const [acReset, setAcReset] = useState(false)
    const [form, setForm] = useState({id: 'cl_' + genHexString(8), usernamePlatform: 'discord'})
    const [inputValue, setInputValue] = useState(undefined) // eslint-disable-line
    const [location, setLocation] = useState(null)
    const [originalMake, setOriginalMake] = useState(null)

    const handleTestData = useCallback(() => {
        setForm({...form, ...clTestData, lockCreated: dayjs('2022-04-17')})
        setLocation(clTestData.country)
        setOriginalMake(clTestData.originalMake)
    }, [form])

    const handleFormChange = useCallback((event) => {
        const {name, value} = event.target
        if (name === 'country') setLocation(value)
        if (name === 'originalMake') setOriginalMake(value)
        setForm({...form, [name]: value})
    }, [form])

    const handleDateChange = useCallback((dateValue) => {
        setForm({...form, ...dateValue})
    }, [form])

    const requiredFields = ['name', 'maker', 'lockCreated', 'country', 'username', 'usernamePlatform']
    const uploadable = requiredFields.every(field => Object.keys(form).includes(field)) && mainPhoto.length > 0

    const prefix = form.name?.replace('/', '+')
    const suffix = form.username?.replace('/', '+')

    const handleSubmit = async (event) => {
        event.preventDefault()
        setUploading(true)
        const formCopy = {
            ...form,
            displayName: profile?.username || 'no display name',
            mainFileName: mainPhoto.length > 0 ? mainPhoto[0].name : undefined,
            droppedFileNames: mainPhoto.length > 0 ? files.map(file => file.name) : undefined,
            status: 'Pending'
        }

        const formData = new FormData()
        Object.keys(formCopy).forEach(key => {
            formData.append(key, formCopy[key])
        })
        const uploadsDir = `${prefix}-${suffix}-${form.id}`.toLowerCase()

        mainPhoto.forEach((file) => {
            const {base, ext} = separateBasename(file.name)
            formData.append('files', file, `${uploadsDir}/${prefix}_${base}_${suffix}--main${ext}`.toLowerCase())
        })
        files.forEach((file) => {
            const {base, ext} = separateBasename(file.name)
            formData.append('files', file, `${uploadsDir}/${prefix}_${base}_${suffix}${ext}`.toLowerCase())
        })

        console.log('formCopy', formCopy)

        const url = `${serverUrl}/submit-challenge-lock`

        try {
            const results = await postData({user, url, formData, snackBars: false})
            setResponse(results)
        } catch (error) {
            setUploadError(`${error}`.replace('Error: ', ''))
            enqueueSnackbar(`Error creating request: ${error}`, {variant: 'error', autoHideDuration: 3000})
            throw error
        } finally {
            files.forEach(file => URL.revokeObjectURL(file.preview))
            mainPhoto.forEach(file => URL.revokeObjectURL(file.preview))
            setFiles([])
            setUploading(false)
            setForm(formCopy)
        }
    }

    const handleReload = useCallback(() => {
        files.forEach(file => URL.revokeObjectURL(file.preview))
        setFiles([])
        mainPhoto.forEach(file => URL.revokeObjectURL(file.preview))
        setMainPhoto([])
        setAcReset(!acReset)
        setForm({id: 'cl_' + genHexString(8), usernamePlatform: 'discord'})
        setResponse(undefined)
        setLocation(null)
        setOriginalMake(null)
        setUploading(false)
        setUploadError(undefined)
        setTimeout(() => {
            window.scrollTo({
                left: 0,
                top: 0,
                behavior: 'smooth'
            })
        }, 100)

    }, [acReset, files, mainPhoto])

    //TODO: clear form on error OK?
    const handleClose = useCallback(() => {
        setResponse(undefined)
        setUploading(false)
        setUploadError(undefined)
    }, [])

    const countryList = useMemo(() => {
        return countries.map(country => country.country_area)
    }, [])

    const allMakes = useMemo(() => {
        return lockData?.allMakes.sort((a, b) => a.localeCompare(b)) || []
    }, [lockData])

    const options = useMemo(() => {
        return [
            {label: 'Challenge Locks', page: '/challengelocks'},
            {label: 'Submit New Lock', page: '/challengelocks/submit'},
            {label: 'Check In', page: '/challengelocks/checkin'},
        ]
    }, [])
    const navigate = useNavigate()
    const handleChange = useCallback(newValue => {
        navigate(newValue.page)
    }, [navigate])

    const {isMobile, flexStyle} = useWindowSize()
    //const fullWidth = !isMobile ? 660 : 300
    const paddingLeft = !isMobile ? 16 : 8

    const headerStyle = {fontSize: '1.1rem', fontWeight: 600, marginBottom: 5}
    const optionalHeaderStyle = {fontSize: '1.1rem', fontWeight: 400, marginBottom: 5, color: '#ccc'}

    return (

        <React.Fragment>
            <div style={{marginBottom: 20, marginTop: 1}}>
                <ChoiceButtonGroup options={options} onChange={handleChange} defaultValue={options[1].label}/><br/>
                <Link onClick={handleTestData}>Fill test data</Link>
            </div>


            <div style={{
                maxWidth: 720, padding: 8, backgroundColor: '#222',
                marginLeft: 'auto', marginRight: 'auto', marginTop: 16, marginBottom: 46, paddingLeft: 8
            }}>
                <div style={{margin: `10px 20px 30px ${paddingLeft}px`, lineHeight: '1.5rem'}}>
                    <div style={{fontSize: '1.3rem', fontWeight: 700, marginBottom: 10}}>Submit a Challenge Lock</div>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse nulla erat, pharetra aliquet
                    laoreet at, ullamcorper in mauris. Vivamus id lectus elit. Quisque et mauris neque. Maecenas id urna
                    erat.
                    &nbsp;<Link onClick={() => navigate('/view?pageId=classificationProcess')}
                                style={{color: '#aaa', cursor: 'pointer', fontWeight: 700}}>Click here to learn
                    more</Link>

                </div>

                <form action={null} encType='multipart/form-data' method='post'
                      onSubmit={handleSubmit}>
                    <div style={{paddingLeft: paddingLeft}}>

                        <div style={{display: flexStyle, marginBottom: 0}}>
                            <div style={{marginRight: 20}}>
                                <div style={headerStyle}>Challenge Lock Name</div>
                                <TextField type='text' name='name' style={{width: 340}}
                                           onChange={handleFormChange} value={form.name || ''} color='info'/>
                            </div>
                            <div style={{}}>
                                <div style={headerStyle}>CL Maker</div>
                                <TextField type='text' name='maker' style={{width: 300}}
                                           onChange={handleFormChange} value={form.maker || ''} color='info'/>
                            </div>
                        </div>

                        <div style={{display: flexStyle, marginTop: 20}}>

                            <div style={{marginRight: 20, width: 200}}>
                                <div style={headerStyle}>Created</div>
                                <DatePicker label='Date Created' value={form.lockCreated || null}
                                            onChange={(newValue) => handleDateChange({lockCreated: newValue.format('MM-DD-YYYY')})}
                                />
                            </div>

                            <div style={{marginRight: 20}}>
                                <div style={headerStyle}>Origin</div>
                                <AutoCompleteBox changeHandler={handleFormChange}
                                                 options={countryList} value={location}
                                                 name={'country'} style={{width: 250}}
                                                 reset={acReset}
                                                 inputValueHandler={setInputValue}
                                />
                            </div>

                            <div style={{}}>
                                <div style={headerStyle}>Lock Format</div>
                                <SelectBox changeHandler={handleFormChange}
                                           name='lockFormat' form={form}
                                           optionsList={lockFormats} size={'large'}
                                           width={170} multiple={false} defaultValue={''}/>
                            </div>
                        </div>

                        <div style={{display: flexStyle, marginTop: 30}}>
                            <div style={{marginRight: 30, width: 250}}>
                                <div style={headerStyle}>
                                    Main Lock Photo (no spoilers!)<br/>
                                </div>
                                <Dropzone files={mainPhoto} setFiles={setMainPhoto} maxFiles={1}/>
                            </div>
                            <div style={{marginRight: 0, flexGrow: 1, maxWidth: 380}}>
                                <div style={{...optionalHeaderStyle, color: '#fff'}}>
                                    Other Lock Photos <span
                                    style={{...optionalHeaderStyle, fontWeight: 400, color: '#aaa'}}>(optional, spoilers OK)</span>
                                </div>
                                <Dropzone files={files} setFiles={setFiles}/>
                            </div>
                        </div>

                        <div style={{display: flexStyle, marginTop: 30}}>
                            <div style={{flexGrow: 1, maxWidth: 660, marginRight: 20}}>
                                <div style={optionalHeaderStyle}>
                                    Description <span
                                    style={{...optionalHeaderStyle, color: '#aaa'}}>(optional)</span>
                                </div>
                                <TextField type='text' name='description' multiline fullWidth rows={3}
                                           color='info' style={{}} value={form.description || ''}
                                           maxLength={1200} id='description' onChange={handleFormChange}/>
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
                                <div style={optionalHeaderStyle}>Original Brand <span
                                    style={{...optionalHeaderStyle, fontWeight: 400, color: '#aaa'}}>(optional)</span>
                                </div>
                                <AutoCompleteBox changeHandler={handleFormChange}
                                                 options={allMakes} value={originalMake}
                                                 name={'originalMake'} style={{width: 230}}
                                                 reset={acReset}
                                                 inputValueHandler={setInputValue}
                                />
                            </div>
                            <div style={{}}>
                                <div style={optionalHeaderStyle}>
                                    Approx. Belt <span style={{...optionalHeaderStyle, color: '#aaa'}}>(optional)</span>
                                </div>
                                <SelectBox changeHandler={handleFormChange}
                                           name='approxBelt' form={form} optionsList={uniqueBelts}
                                           multiple={false} defaultValue={''}
                                           size={'large'} width={180}/>
                            </div>
                        </div>

                        <div style={{marginTop: 30}}>
                            <div style={{display: flexStyle}}>
                                <div style={{marginRight: 15}}>
                                    <div style={headerStyle}>Your Username</div>
                                    <TextField type='text' name='username' style={{width: 240}}
                                               onChange={handleFormChange} value={form.username || ''}
                                               color='info'/>
                                </div>

                                <div style={{marginTop: 25, marginRight: 30}}>
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
                                        <FormControlLabel value='discord' control={<Radio size='small'/>}
                                                          label='Discord'/>
                                        <FormControlLabel value='reddit' control={<Radio size='small'/>}
                                                          label='Reddit'/>
                                    </RadioGroup>
                                </div>

                                <div style={{marginTop: 0}}>
                                    <div style={optionalHeaderStyle}>
                                        Your current belt <span style={{color: '#aaa'}}>(optional)</span>
                                    </div>
                                    <SelectBox changeHandler={handleFormChange}
                                               name='userBelt' form={form}
                                               optionsList={['Unranked', ...uniqueBelts]}
                                               multiple={false} defaultValue={''}
                                               size={'large'} width={200}/>
                                </div>
                            </div>
                        </div>
                        <div style={{margin: '30px 0px', width: '100%', textAlign: 'center'}}>
                            <Button type='submit' variant='contained' color='info' disabled={!uploadable || uploading}>
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
