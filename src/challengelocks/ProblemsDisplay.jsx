import React, {useContext, useEffect, useState} from 'react'
import dayjs from 'dayjs'
import Button from '@mui/material/Button'
import AuthContext from '../app/AuthContext.jsx'
import {nodeServerUrl} from '../data/dataUrls.js'
import {postData} from '../formUtils/postData.jsx'
import {enqueueSnackbar} from 'notistack'
import DBContext from './DBProviderCL.jsx'
import FilterContext from '../context/FilterContext.jsx'
import LoadingDisplayWhite from '../misc/LoadingDisplayWhite.jsx'

export default function ProblemsDisplay({entry}) {

    const {user} = useContext(AuthContext)
    const {refreshEntries, updateVersion} = useContext(DBContext)
    const {clearFilters} = useContext(FilterContext)
    const [form, setForm] = useState({})
    const [, setResponse] = useState(undefined)
    const [uploading, setUploading] = useState(false)

    useEffect(() => {
        setForm({
            entryId: entry.id,
            entryName: entry.name,
        })
    }, [entry])

    const handleSubmit = async (event) => {
        event.preventDefault()
        setUploading(true)

        console.log('Submitting report for entry:', form)

        const formData = new FormData()
        Object.keys(form).forEach(key => {
            formData.append(key, form[key])
        })

        const url = `${nodeServerUrl}/clear-problems`

        try {
            const results = await postData({user, url, formData, snackBars: true})
            setResponse(results)
            await updateVersion()
            await refreshEntries()
            clearFilters()
        } catch (error) {
            enqueueSnackbar(`Error creating request: ${error}`, {variant: 'error', autoHideDuration: 3000})
        } finally {
            setUploading(false)
        }
    }

    const breakWordStyle = {wordBreak: 'break-word', inlineSize: '100%'}

    return (
        <React.Fragment>
            {entry.hasProblems === 'problems' &&
                <div style={{
                    border: '2px solid #fd4d4d',
                    padding: 10,
                    marginTop: 5,
                    alignItems: 'center',
                    fontSize: '1.0rem',
                    lineHeight: '1.3rem'
                }}>

                    <div style={{fontSize: '1.1rem', lineHeight: '1.4rem', fontWeight: 600}}>
                        Problems reported: {entry.problems?.length}
                    </div>
                    {entry.problems.map((problem, index) => (
                        <div key={index} style={{margin: 10, paddingRight: 10, ...breakWordStyle}}>
                            <strong>{dayjs(problem.reportedAt).format('MMM DD, YYYY')}</strong> - {problem.description} ({problem.userName})
                        </div>
                    ))
                    }
                    <div style={{
                        fontSize: '1.1rem',
                        lineHeight: '1.4rem',
                        fontWeight: 600,
                        justifyContent: 'right',
                        alignItems: 'center',
                        display: 'flex',
                        margin: '20px 10px 10px 10px'
                    }}>
                        Everything OK?
                        <Button onClick={handleSubmit} variant='outlined' color='success' size='small'
                                style={{marginLeft: 10, textAlign: 'center', width:200, height: 40}}>
                            {uploading
                                ? <div style={{margin: '0px auto'}}><LoadingDisplayWhite color={'#fff'}/></div>
                                : 'Delete problem reports'
                            }
                            </Button>
                    </div>
                </div>
            }
        </React.Fragment>
    )
}
