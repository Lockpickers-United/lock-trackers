import React, {useCallback, useContext, useMemo, useState} from 'react'
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
import DBContext from './DBContextCL.jsx'
import DisplayTable from '../misc/DisplayTable.jsx'
import StarRating from '../misc/StarRating.jsx'
import DataContext from '../context/DataContext.jsx'
import {jsonIt} from '../util/jsonIt.js'
import checkInTestData from './checkInTestData.json'
import FilterContext from '../context/FilterContext.jsx'


/**
 * @prop newBrand
 * @prop allMakes
 */

export default function CheckIn({lockId}) {

    const serverUrl = 'https://lpulocks.com:7443'

    const {getEntryFromId} = useContext(DataContext)
    const {user} = useContext(AuthContext)
    const {dbLoaded, profile} = useContext(DBContext)
    const [response, setResponse] = useState(undefined)
    const [uploading, setUploading] = useState(false)
    const [uploadError, setUploadError] = useState(undefined)
    const [acReset, setAcReset] = useState(false)
    const [form, setForm] = useState({id: 'clci_' + genHexString(8), usernamePlatform: 'discord'})
    const [inputValue, setInputValue] = useState(undefined) // eslint-disable-line
    const [location, setLocation] = useState(null)
    const [ratings, setRatings] = useState({})

    //     const lockId = 'cl_69dfddd5'
    const {filters} = useContext(FilterContext)
    const lock = getEntryFromId(filters.id) || {}

    if (dbLoaded && Object.keys(lock).length === 0) {
        console.error('No lock found for id: ' + lockId)
    }


    const handleTestData = useCallback(() => {
        setForm({...form, ...checkInTestData})
        setLocation(checkInTestData.country)
    }, [form])

    const handleFormChange = useCallback((event) => {
        const {name, value} = event.target
        if (name === 'country') setLocation(value)
        setForm({...form, [name]: value})
    }, [form])

    const handleDateChange = useCallback((dateValue) => {
        setForm({...form, ...dateValue})
    }, [form])

    const requiredFields = ['name', 'maker', 'lockCreated', 'country', 'username', 'usernamePlatform']
    const uploadable = requiredFields.every(field => Object.keys(form).includes(field))

    const handleSubmit = async (event) => {
        event.preventDefault()
        setUploading(true)
        const formCopy = {
            ...form,
            lockId: lockId,
            submittedAt: dayjs().toISOString(),
            displayName: profile?.username || 'no display name',
            userId: user.uid,
        }

        jsonIt('formCopy', formCopy)

        if (form.ratings) {
            Object.keys(form.ratings).forEach(rating => {
                formCopy[`rating-${rating}`] = form.ratings[rating]
            })
        }

        delete formCopy.ratings

        // using postData to handle the file upload

        const formData = new FormData() // eslint-disable-line
        Object.keys(formCopy).forEach(key => {
            formData.append(key, formCopy[key])
        })

        const url = `${serverUrl}/check-in-challenge-lock`

        try {
            const results = await postData({user, url, formData, snackBars: false})
            setResponse(results)
        } catch (error) {
            setUploadError(`${error}`.replace('Error: ', ''))
            enqueueSnackbar(`Error creating request: ${error}`, {variant: 'error', autoHideDuration: 3000})
            throw error
        } finally {
            setUploading(false)
            setForm(formCopy)
        }
    }

    const handleReload = useCallback(() => {
        setAcReset(!acReset)
        setForm({id: 'clci_' + genHexString(8), usernamePlatform: 'discord'})
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
    }, [acReset])

    //TODO: clear form on error OK?
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
            {label: 'Submit Lock', page: '/challengelocks/submit'},
            {label: 'Check In', page: '/challengelocks/checkin'}
        ]
    }, [])
    const navigate = useNavigate()
    const handleChange = useCallback(newValue => {
        navigate(newValue.page)
    }, [navigate])

    const onRatingChange = useCallback(({dimension, rating}) => {
        console.log('ratings', {...ratings, [dimension]: rating})
        setRatings({...ratings, [dimension]: rating})
        setForm({...form, ratings: {...ratings, [dimension]: rating}})
    }, [form, ratings])

    const columns = [
        {id: 'ratingArea', align: 'right', name: 'Area'},
        {id: 'rating', align: 'left', name: 'Your Rating'}
    ]
    const rows = [
        {ratingArea: 'Fun', rating: <StarRating ratings={ratings} onChange={onRatingChange} dimension={'fun'}/>},
        {
            ratingArea: 'Difficulty',
            rating: <StarRating ratings={ratings} onChange={onRatingChange} dimension={'difficulty'}/>
        },
        {
            ratingArea: 'Creativity',
            rating: <StarRating ratings={ratings} onChange={onRatingChange} dimension={'creativity'}/>
        },
        {
            ratingArea: 'Quality/Appearance',
            rating: <StarRating ratings={ratings} onChange={onRatingChange} dimension={'quality'}/>
        }
    ]
    const tableData = {columns: columns, data: rows}


    const {isMobile, flexStyle} = useWindowSize()
    const paddingLeft = !isMobile ? 16 : 8

    const headerStyle = {fontSize: '1.1rem', fontWeight: 600, margin: '5px 0px'}
    const optionalHeaderStyle = {fontSize: '1.1rem', fontWeight: 400, margin: '5px 0px', color: '#ccc'}

    const nameTextStyle = {fontSize: '1.5rem', lineHeight: '1.7rem', color: '#fff', fontWeight: 600, marginLeft: 0}
    const makerTextStyle = {fontSize: '1.2rem', lineHeight: '1.4rem', color: '#fff', marginLeft: 5, marginTop: 0}

    return (

        <React.Fragment>
            <div style={{marginBottom: 20, marginTop: 1}}>
                <ChoiceButtonGroup options={options} onChange={handleChange} defaultValue={options[2].label}/><br/>
                <Link onClick={handleTestData}>Fill test data</Link>
            </div>


            <div style={{
                maxWidth: 720, padding: 8, backgroundColor: '#222',
                marginLeft: 'auto', marginRight: 'auto', marginTop: 16, marginBottom: 46, paddingLeft: 8
            }}>

                <div style={{margin: `10px 20px 30px ${paddingLeft}px`, lineHeight: '1.5rem'}}>
                    <div style={{display: flexStyle, paddingBottom: 15, borderBottom: '1px solid #ccc'}}>
                        <div style={{display: 'flex', alignItems: 'center', flexGrow: 1}}>
                            <div>
                                <div style={{marginBottom: 10, fontSize: '0.9rem'}}>Challenge Lock Check In</div>
                                <div style={nameTextStyle}>{lock.name}</div>
                                <div style={makerTextStyle}>By: {lock.maker}</div>
                            </div>
                        </div>
                        <div style={{marginTop: 5}}>
                            <img src={lock.thumbnail} alt={lock.name}
                                 style={{width: 120, height: 120, marginRight: 10}}/>
                        </div>
                    </div>
                </div>


                <form action={null} encType='multipart/form-data' method='post'
                      onSubmit={handleSubmit}>
                    <div style={{paddingLeft: paddingLeft}}>

                        <div style={{marginTop: 15}}>
                            <div style={{display: flexStyle}}>
                                <div style={{marginRight: 15}}>
                                    <div style={headerStyle}>Discord/Reddit Username</div>
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
                                        <FormControlLabel value='discord' control={<Radio size='small'/>}
                                                          label='Discord'/>
                                        <FormControlLabel value='reddit' control={<Radio size='small'/>}
                                                          label='Reddit'/>
                                    </RadioGroup>
                                </div>
                                <div style={{marginRight: 20, width: 200}}>
                                    <div style={headerStyle}>Date</div>
                                    <DatePicker label='Pick Date' value={form.pickDate || dayjs()} disableFuture
                                                onChange={(newValue) => handleDateChange({pickDate: newValue.toISOString()})}
                                    />
                                </div>

                            </div>
                        </div>

                        <div style={{display: flexStyle, marginTop: 15}}>
                            <div style={{marginRight: 20}}>
                                <div style={headerStyle}>Successful Pick?</div>
                                <SelectBox changeHandler={handleFormChange}
                                           name='successfulPick' form={form}
                                           optionsList={['Yes', 'No']} size={'large'}
                                           width={170} multiple={false} defaultValue={''}/>
                            </div>
                            <div style={{marginRight: 20, flexGrow: 1}}>
                                <div style={optionalHeaderStyle}>Pick Video URL <span
                                    style={{...optionalHeaderStyle, fontWeight: 400, color: '#aaa'}}>(optional)</span>
                                </div>
                                <TextField type='text' name='videoUrl' fullWidth size='large'
                                           onChange={handleFormChange} value={form.videoUrl || ''} color='info'/>
                            </div>

                        </div>

                        <div style={{
                            fontSize: '1.4rem',
                            color: '#ccc',
                            borderBottom: '1px solid #ccc',
                            marginTop: 30,
                            marginRight: 20
                        }}>
                            Other Optional Information
                        </div>

                        <div style={{display: flexStyle, marginTop: 20}}>
                            <div style={{marginRight: 25}}>
                                <div style={{...optionalHeaderStyle}}>
                                    Your Ratings <span
                                    style={{...optionalHeaderStyle, fontWeight: 400, color: '#aaa'}}>(optional)</span>
                                </div>
                                <DisplayTable tableData={tableData} showHeader={false}
                                              colorData={'#ddd'} fontSize={'1.0rem'} fontWeightData={500}/>
                            </div>

                            <div style={{flexGrow: 1, marginRight: 20}}>
                                <div style={optionalHeaderStyle}>
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

                        <div style={{display: flexStyle, width: '100%', marginTop: 35, justifyContent: 'center'}}>
                            <div style={{marginRight: 20}}>
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

                            <div style={{marginTop: 0}}>
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
                            <Button type='submit' variant='contained' color='info'
                                    disabled={(!uploadable || uploading) && false}>
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

function genHexString(len) {
    const hex = '0123456789ABCDEF'
    let output = ''
    for (let i = 0; i < len; ++i) {
        output += hex.charAt(Math.floor(Math.random() * hex.length))
    }
    return output.toLowerCase()
}
