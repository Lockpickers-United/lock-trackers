import React, {useCallback, useContext, useEffect, useState} from 'react'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import ReportProblemIcon from '@mui/icons-material/ReportProblem'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import TextField from '@mui/material/TextField'
import useWindowSize from '../util/useWindowSize.jsx'
import {nodeServerUrl} from '../data/dataUrls.js'
import {postData} from '../formUtils/postData.jsx'
import {enqueueSnackbar} from 'notistack'
import AuthContext from '../app/AuthContext.jsx'
import DBContextGlobal from '../app/DBContextGlobal.jsx'
import DBContext from './DBProviderCL.jsx'
import dayjs from 'dayjs'
import LoadingDisplayWhite from '../misc/LoadingDisplayWhite.jsx'
import {useNavigate} from 'react-router-dom'

export default function ProblemReportButton({entry, style}) {

    const {user} = useContext(AuthContext)
    const {profile} = useContext(DBContextGlobal)
    const {refreshEntries, updateVersion} = useContext(DBContext)
    const navigate = useNavigate()
    const [report, setReport] = useState(false)
    const [form, setForm] = useState({})
    const [response, setResponse] = useState(undefined)
    const [uploading, setUploading] = useState(false)
    const [uploadError, setUploadError] = useState(undefined)

    useEffect(() => {
        setForm({
            entryId: entry.id,
            entryName: entry.name,
            entryMaker: entry.maker,
            description: '',
            userId: user?.uid || 'anonymous',
            userName: profile?.username || 'Anonymous',
            reportedAt: dayjs().toISOString()
        })
    }, [entry, profile, user])

    console.log('form', form)

    const handleClick = useCallback(() => {
        setReport(true)
    }, [])

    const safeName = entry.name?.replace(/[\s/]/g, '_').replace(/\W/g, '')

    const handleSubmit = async (event) => {
        event.preventDefault()
        setUploading(true)

        console.log('Submitting report for entry:', form)

        const formData = new FormData()
        Object.keys(form).forEach(key => {
            formData.append(key, form[key])
        })

        const url = `${nodeServerUrl}/report-problem`

        try {
            const results = await postData({user, url, formData, snackBars: false})
            setResponse(results)
            await updateVersion()
            await refreshEntries()
            navigate(`/challengelocks?id=${entry.id}&name=${safeName}`)

        } catch (error) {
            setUploadError(`${error}`.replace('Error: ', ''))
            enqueueSnackbar(`Error creating request: ${error}`, {variant: 'error', autoHideDuration: 3000})
        } finally {
            setUploading(false)
        }
    }

    const handleFormChange = useCallback((event) => {
        let {name, value} = event.target
        let formCopy = {...form}
        let updates = {[name]: value}
        setForm({...formCopy, ...updates})
    }, [form])

    const handleClose = useCallback(() => {
        setReport(false)
        setResponse(undefined)
        setUploadError(false)
        setForm({
            entryId: entry.id,
            entryName: entry.name,
            entryMaker: entry.maker,
            description: '',
            userId: user?.uid || 'anonymous',
            userName: profile?.username || 'Anonymous'
        })
    }, [entry.id, entry.maker, entry.name, profile?.username, user?.uid])

    const handleOK = useCallback(async () => {
        handleClose()
    }, [handleClose])

    const {isMobile} = useWindowSize()
    const headerStyle = {fontSize: '1.0rem', margin: '5px 0px'}

    return (
        <React.Fragment>
            <Tooltip title='Report Problem' arrow disableFocusListener>
                <IconButton onClick={handleClick} style={{height: 40, width: 40, ...style}}>
                    <ReportProblemIcon fontSize='medium'/>
                </IconButton>
            </Tooltip>

            <Dialog open={report} onClose={handleClose}
                    sx={{
                        '.MuiDialog-paper': {
                            margin: 0,
                            border: '1px solid #666'

                        }
                    }}
                    componentsProps={{
                        backdrop: {style: {backgroundColor: '#000', opacity: 0.3}}
                    }}>
                <div style={{backgroundColor: '#444', display: 'flex', justifyContent: 'flex-end'}}>
                    <HighlightOffIcon onClick={handleClose} style={{margin: 5, cursor: 'pointer'}}/>
                </div>
                <div style={{display: 'flex'}}>
                    <div
                        style={{backgroundColor: '#444', marginLeft: 'auto', marginRight: 'auto', padding: '0px 20px'}}>
                        <div style={{
                            fontSize: '1.2rem',
                            fontWeight: 500,
                            marginBottom: 10
                        }}>
                            Report Problem
                        </div>

                        <div style={{width: isMobile ? '100%' : 450}}>
                            <div style={{...headerStyle, marginTop: 0}}>
                                Please provide a brief description.
                            </div>
                            <TextField type='text' name='description' multiline fullWidth rows={6} size='small'
                                       color='info' style={{}} value={form.description || ''}
                                       maxLength={600} id='description' onChange={handleFormChange}/>
                            <div style={{color: '#aaa', fontSize: '0.85rem', textAlign: 'right'}}>
                                {form.description?.length || 0}/600
                            </div>
                        </div>

                        <div style={{width: '100%', textAlign: 'center', marginBottom: 40, marginTop: 20}}>

                            <Button onClick={handleSubmit} variant='contained' color='info'
                                    disabled={!form.description || form.description.length < 5}
                                    style={{marginLeft: 'auto', marginRight: 'auto', textAlign: 'center', width:150, height: 40}}>
                                {uploading
                                    ? <div style={{margin: '0px auto'}}><LoadingDisplayWhite color={'#fff'}/></div>
                                    : 'Submit Report'
                                }
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
                        }}>Problem reported, thank you.
                        </div>

                        <div style={{width: '100%', textAlign: 'center'}}>
                            <Button onClick={handleOK} variant='contained' color='info'
                                    style={{marginLeft: 'auto', marginRight: 'auto'}}>
                                OK
                            </Button>
                        </div>
                    </div>
                </div>
            </Dialog>

        </React.Fragment>
    )

}