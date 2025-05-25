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
import {setDeep, setDeepPush, setDeepUnique} from '../util/setDeep'
import Link from '@mui/material/Link'
import ChoiceButtonGroup from '../util/ChoiceButtonGroup.jsx'
import {useNavigate} from 'react-router-dom'
import AuthContext from '../app/AuthContext.jsx'
import DataContext from '../context/DataContext.jsx'
import {postData} from '../formUtils/postData.jsx'
import {enqueueSnackbar} from 'notistack'
import {lockingMechanisms} from './CLSubmitData.js'
import countries from '../data/countries.json'
import statesProvinces from '../data/statesProvinces.json'
import lockFormats from '../data/lockFormats.json'
import AutoCompleteBox from '../formUtils/AutoCompleteBox.jsx'
import {jsonIt} from '../../lpulocks-node/src/util/jsonIt.js'
import {DatePicker} from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs'
import clTestData from './clTestData.json'


/**
 * @prop newBrand
 * @prop allMakes
 */

export default function SubmitChallengeLock({lockData}) {

    const serverUrl = 'http://localhost:3080'

    const {user} = useContext(AuthContext)
    const {profile} = useContext(DataContext)
    const [mainPhoto, setMainPhoto] = useState([])
    const [files, setFiles] = useState([])
    const [response, setResponse] = useState(undefined)
    const [uploading, setUploading] = useState(false)
    const [uploadError, setUploadError] = useState(undefined)
    const [acReset, setAcReset] = useState(false)
    const [form, setForm] = useState({id: 'cl_' + genHexString(8)})
    const [inputValue, setInputValue] = useState(undefined)
    const [location, setLocation] = useState(null)
    const [originalMake, setOriginalMake] = useState(null)

    const handleTestData = useCallback(() => {
        setForm({...form, ...clTestData, createdAt: dayjs('2022-04-17')})
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
        console.log('dateValue', dateValue)
        setForm({...form, ...dateValue})
    }, [form])

    const uploadable = ((form['make'] || form.newBrand)
            && form.model
            && form.lockingMechanisms && form.lockingMechanisms.length > 0
            && (form.redditUsername || form.discordUsername))
        && files.length > 0

    const prefix = form.name?.replace('/', '+')
    const suffix = form.redditUsername && form.discordUsername
        ? [form.discordUsername, form.redditUsername].join('_').replace('/', '+')
        : `${form.redditUsername || form.discordUsername}`.replace('/', '+')

    const handleSubmit = async (event) => {
        event.preventDefault()
        //setUploading(true)
        const formCopy = {
            ...form,
            displayName: profile?.displayName || 'no display name',
            droppedFileNames: files.map(file => file.name),
            status: 'Pending'
        }
        delete formCopy.altBrand
        delete formCopy.newBrand

        console.log('formCopy', formCopy)

        const formData = new FormData()
        Object.keys(formCopy).forEach(key => {
            formData.append(key, formCopy[key])
        })
        const uploadsDir = `${prefix}-${suffix}`.toLowerCase()


        mainPhoto.forEach((file) => {
            const {base, ext} = separateBasename(file.name)
            formData.append('files', file, `${uploadsDir}/${prefix}_${base}_${suffix}--main${ext}`.toLowerCase())
        })
        files.forEach((file) => {
            const {base, ext} = separateBasename(file.name)
            formData.append('files', file, `${uploadsDir}/${prefix}_${base}_${suffix}${ext}`.toLowerCase())
        })


        jsonIt('formCopy', formCopy)
        for (const entry of formData.entries()) {
            //console.log(entry[0], entry[1])
        }


        const url = `${serverUrl}/submit-challenge-lock`

        try {
            const results = await postData({user, url, formData, snackBars: false})
            enqueueSnackbar('Upload successful', {variant: 'success'})
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
        setAcReset(!acReset)
        setForm({id: genHexString(8)})
        setResponse(undefined)
        setUploading(false)
        setUploadError(undefined)
        setTimeout(() => {
            window.scrollTo({
                left: 0,
                top: 0,
                behavior: 'smooth'
            })
        }, 100)

    }, [acReset, files])

    //TODO: clear form on error OK
    const handleClose = useCallback(() => {
        setResponse(undefined)
        setUploading(false)
        setUploadError(undefined)
    }, [])

    const countryList = useMemo(() => {
        return countries.map(country => country.country_area)
    }, [])

    const options = useMemo(() => {
        return [
            {label: 'Challenge Locks', page: '/challengelocks'},
            {label: 'Submit New Lock', page: '/challengelocks/submit'}
        ]
    }, [])
    const navigate = useNavigate()
    const handleChange = useCallback(newValue => {
        navigate(newValue.page)
    }, [navigate])

    const {isMobile, flexStyle} = useWindowSize()
    const fullWidth = !isMobile ? 660 : 300
    const paddingLeft = !isMobile ? 16 : 8

    const headerStyle = {fontSize: '1.1rem', fontWeight: 500, marginBottom: 5}


    return (

        <React.Fragment>
            <div style={{marginBottom: 20, marginTop: 1}}>
                <ChoiceButtonGroup options={options} onChange={handleChange} defaultValue={options[0].label}/>

            <Link onClick={handleTestData}>Fill test data</Link>
            </div>



            <div style={{
                maxWidth: 720, padding: 8, backgroundColor: '#222',
                marginLeft: 'auto', marginRight: 'auto', marginTop: 16, marginBottom: 46, paddingLeft: 8
            }}>
                <div style={{marginBottom: 30, marginRight: paddingLeft, lineHeight: '1.5rem'}}>
                    <div style={{fontSize: '1.3rem', fontWeight: 700, marginBottom: 10}}>Submit a Challenge Lock</div>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse nulla erat, pharetra aliquet
                    laoreet at, ullamcorper in mauris. Vivamus id lectus elit. Quisque et mauris neque. Maecenas id urna
                    erat.
                    &nbsp;<Link onClick={() => navigate('/view?pageId=classificationProcess')}
                                style={{color: '#aaa', cursor: 'pointer', fontWeight: 700}}>Click here to learn
                    more</Link>

                </div>

                <div style={{
                    fontSize: '1.5rem',
                    fontWeight: 500,
                    padding: `10px ${paddingLeft}px`,
                    backgroundColor: '#111',
                    width: '100%',
                    marginBottom: 20
                }}>
                    Challenge Lock Info
                </div>
                <form action={null} encType='multipart/form-data' method='post'
                      onSubmit={handleSubmit}>
                    <div style={{paddingLeft: paddingLeft}}>

                        <div style={{display: flexStyle, marginBottom: 0}}>
                            <div style={{marginRight: 20}}>
                                <div style={headerStyle}>Challenge Lock Name</div>
                                <TextField type='text' name='name' style={{width: 300}}
                                           onChange={handleFormChange} value={form.name || ''} color='info'/>
                            </div>
                            <div style={{}}>
                                <div style={headerStyle}>CL Maker</div>
                                <TextField type='text' name='maker' style={{width: 300}}
                                           onChange={handleFormChange} value={form.maker || ''} color='info'/>
                            </div>
                        </div>

                        <div style={{display: flexStyle, marginTop: 20}}>

                            <div style={{marginRight: 20, width:200}}>
                                <div style={headerStyle}>Created</div>
                                <DatePicker label='Date Created' value={form.createdAt || null}
                                            onChange={(newValue) => handleDateChange({createdAt: newValue.format('MM-DD-YYYY')})}
                                />
                            </div>

                            <div style={{marginRight: 20}}>
                                <div style={headerStyle}>Location</div>
                                <AutoCompleteBox changeHandler={handleFormChange}
                                                 options={countryList} value={location}
                                                 name={'country'} style={{width: 250}}
                                                 reset={acReset}
                                                 inputValueHandler={setInputValue}
                                />
                            </div>


                            {form.country && statesProvinces[form.country] &&
                                <div style={{}}>
                                    <div style={headerStyle}>State/Province <span
                                        style={{...headerStyle, fontWeight: 400, color: '#aaa'}}>(optional)</span>
                                    </div>
                                    <SelectBox changeHandler={handleFormChange}
                                               name='stateProvince' form={form}
                                               optionsList={statesProvinces[form.country]} size={'large'}
                                               width={220} multiple={false} defaultValue={''}/>
                                </div>
                            }
                        </div>

                        <div style={{display: flexStyle, marginTop: 30}}>
                            <div style={{marginRight: 20}}>
                                <div style={headerStyle}>
                                    Locking Mechanism
                                </div>
                                <SelectBox changeHandler={handleFormChange}
                                           name='lockingMechanism' form={form}
                                           optionsList={lockingMechanisms} size={'large'}
                                           width={180} multiple={false} defaultValue={''}/>
                            </div>
                            <div style={{marginRight: 20}}>
                                <div style={{...headerStyle, fontWeight: 400}}>Original Brand <span
                                    style={{...headerStyle, fontWeight: 400, color: '#aaa'}}>(optional)</span>
                                </div>
                                <AutoCompleteBox changeHandler={handleFormChange}
                                                 options={lockData?.allMakes} value={originalMake}
                                                 name={'originalMake'} style={{width: 230}}
                                                 reset={acReset}
                                                 inputValueHandler={setInputValue}
                                />
                            </div>

                            <div style={{}}>
                                <div style={{...headerStyle, fontWeight: 400}}>Lock Format <span
                                    style={{...headerStyle, fontWeight: 400, color: '#aaa'}}>(optional)</span>
                                </div>
                                <SelectBox changeHandler={handleFormChange}
                                           name='lockFormat' form={form}
                                           optionsList={lockFormats} size={'large'}
                                           width={200} multiple={false} defaultValue={''}/>
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
                                <div style={headerStyle}>
                                    Other Lock Photos <span style={{...headerStyle, fontWeight: 400}}>(max 10, spoilers OK)</span>
                                </div>
                                <Dropzone files={files} setFiles={setFiles}/>
                            </div>
                        </div>

                        <div style={{display: flexStyle, marginTop: 20}}>
                            <div style={{flexGrow: 1, maxWidth: fullWidth}}>
                                <div style={{fontSize: '1.1rem'}}>
                                    Brief Description <span style={{color: '#aaa'}}>(optional)</span>
                                </div>
                                <TextField type='text' name='description' multiline fullWidth rows={2}
                                           color='info' style={{}} value={form.description || ''}
                                           maxLength={1200} id='description' onChange={handleFormChange}/>
                            </div>
                        </div>

                        <div style={{display: flexStyle, marginTop: 20}}>
                            <div style={{marginRight: 20}}>
                                <div style={{fontSize: '1.1rem', fontWeight: 400, marginBottom: 5}}>
                                    Approx. Belt <span style={{color: '#aaa'}}>(optional)</span></div>
                                <SelectBox changeHandler={handleFormChange}
                                           name='approxBelt' form={form} optionsList={uniqueBelts}
                                           multiple={false} defaultValue={''}
                                           size={'large'} width={180}/>
                            </div>
                        </div>

                        <div style={{display: flexStyle, marginTop: 20}}>
                            <div style={{flexGrow: 1, maxWidth: fullWidth}}>
                                <div style={{fontSize: '1.1rem'}}>
                                    Detailed Description <span style={{color: '#aaa'}}>(optional)</span>
                                </div>
                                <TextField type='text' name='descriptionFull' multiline fullWidth rows={5}
                                           color='info'
                                           style={{}} value={form.descriptionFull || ''}
                                           maxLength={1200} id='descriptionFull' onChange={handleFormChange}/>
                            </div>
                        </div>


                        <div style={{marginTop: 30}}>
                            <div style={{marginRight: 50, width: 300}}>
                                <div style={{fontSize: '1.1rem', fontWeight: 500}}>
                                    Contact Info
                                </div>
                            </div>

                            <div style={{display: flexStyle}}>
                                <div style={{marginRight: 20}}>
                                    <div style={{fontSize: '1rem'}}>Discord Username</div>
                                    <TextField type='text' name='discordUsername' style={{width: 200}}
                                               onChange={handleFormChange} value={form.discordUsername || ''}
                                               color='info'/>
                                </div>

                                <div style={{marginRight: 40}}>
                                    <div style={{fontSize: '1rem'}}>AND/OR Reddit Username</div>
                                    <TextField type='text' name='redditUsername' style={{width: 200}}
                                               onChange={handleFormChange} value={form.redditUsername || ''}
                                               color='info'/>
                                </div>

                                <div style={{marginTop: 0}}>
                                    <div style={{fontSize: '1rem'}}>
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
                    </div>

                    <div style={{marginTop: 30, width: '100%', display: 'flex', justifyContent: 'center'}}>
                        <Button type='submit' variant='contained' color='info'
                                disabled={(!uploadable || uploading) && false}>
                            Submit
                        </Button>
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
                            }}>Lock request submitted!
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
