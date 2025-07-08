import React, {useCallback, useEffect} from 'react'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import {filterProfanity} from '../util/sanitizeValues.js'


export function EditImagesPhotoCredit({photoCredit, setPhotoCredit, profile, currentPhotoCredit}) {


    useEffect(() => {
        setPhotoCredit(photoCredit || profile?.lastPhotoCredit || currentPhotoCredit || profile?.username || undefined)
    }, [currentPhotoCredit, photoCredit, profile?.lastPhotoCredit, profile?.username, setPhotoCredit])

    const handleCreditChange = useCallback((e) => {
        const {value} = e.target
        setPhotoCredit(filterProfanity(value))
    },[setPhotoCredit])

    const headerStyle = {fontSize: '1.2rem', fontWeight: 600, marginBottom: 5, paddingLeft: 2, width: '100%'}
    const reqStyle = {height: 4, borderRadius: 2}


    return (
        <React.Fragment>
            <div style={{
                margin: '30px auto 10px auto',
                display: 'flex',
                justifyContent: 'center',
                width: '100%'
            }}>
                <div>
                    <div style={{
                        ...headerStyle,
                        padding: '0px 0px 5px 0px',
                        width: 'auto',
                        margin: 0,
                        fontSize: '1.1rem',
                        backgroundColor: !photoCredit ? '#c00' : 'inherit',
                        alignContent: 'center'
                    }}>
                        Photo Credit for New Images
                    </div>
                    <TextField type='text' name='photoCredit' style={{width: 240}}
                               onChange={handleCreditChange} value={photoCredit || ''}
                               color='info'
                               slotProps={{
                                   htmlInput: {maxLength: 40}
                               }} size='small'/>
                    <div style={{...reqStyle, backgroundColor: !photoCredit ? '#d00' : '#090'}}/>
                </div>
            </div>

            <div style={{
                fontSize: '0.9rem', fontWeight: 400, marginBottom: 5, color: '#fff',
                textAlign: 'center'
            }}>
                {profile?.lastPhotoCredit &&
                    <span><Link
                        onClick={() => handleCreditChange({
                            target: {
                                name: 'photoCredit',
                                value: profile?.lastPhotoCredit
                            }
                        })}
                        style={{
                            cursor: 'pointer',
                            textDecoration: 'none',
                            fontWeight: photoCredit === profile?.lastPhotoCredit ? '600' : '400'
                        }}>Last Used</Link> • </span>
                }
                {currentPhotoCredit &&
                    <span><Link
                        onClick={() => handleCreditChange({
                            target: {
                                name: 'photoCredit',
                                value: currentPhotoCredit
                            }
                        })}
                        style={{
                            cursor: 'pointer',
                            textDecoration: 'none',
                            fontWeight: photoCredit === currentPhotoCredit ? '600' : '400'
                        }}>Match Existing Photos</Link> • </span>
                }
                {profile?.username &&
                    <span><Link
                        onClick={() => handleCreditChange({
                            target: {
                                name: 'photoCredit',
                                value: profile?.username
                            }
                        })}
                        style={{
                            cursor: 'pointer',
                            textDecoration: 'none',
                            fontWeight: photoCredit === profile?.username ? '600' : '400'
                        }}>Your Userame</Link></span>
                }
            </div>
        </React.Fragment>
    )
}

export default React.memo(EditImagesPhotoCredit)
