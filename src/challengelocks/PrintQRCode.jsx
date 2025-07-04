import React, {useCallback, useContext, useEffect, useState} from 'react'
import Button from '@mui/material/Button'
import useWindowSize from '../util/useWindowSize.jsx'
import Dialog from '@mui/material/Dialog'
import Tracker from '../app/Tracker.jsx'
import {useNavigate} from 'react-router-dom'
import FilterContext from '../context/FilterContext.jsx'
import QRCode from 'react-qr-code'
import FieldValue from '../util/FieldValue.jsx'
import DBContext from './DBProviderCL.jsx'
import {internationalDate} from '../util/formatTime.js'

export default function PrintQRCode() {

    // TODO - implement without getting allEntries @ dbContext (separate dbContextQR?)

    const {getChallengeLock} = useContext(DBContext)
    const {filters} = useContext(FilterContext)
    const lockId = filters.id

    const [lock, setLock] = useState(undefined)

    const getCL = useCallback(async () => {
        if (!lockId) {
            console.error('No lock ID provided for PrintQRCode')
            return {}
        }
        return await getChallengeLock(lockId)
    }, [getChallengeLock, lockId])

    useEffect(() => {
        if (lockId && !lock) {
            getCL().then((cl) => {
                setLock(cl)
            }).catch(err => {
                console.error('Error fetching challenge lock:', err)
            })
        }
    }, [getCL, lock, lockId])

    const notValidLock = (lock && Object.keys(lock).length === 0) || false

    const safeName = lock?.name?.replace(/[\s/]/g, '_').replace(/\W/g, '')
    const lockUrl = `${location.origin}/#/challengelocks/checkin?id=${lockId}&name=${safeName}`

    const navigate = useNavigate()
    const {width, isMobile} = useWindowSize()
    const paddingLeft = !isMobile ? 16 : 8

    const flexStyle = width < 500 ? 'block' : 'flex'
    const nameTextStyle = {fontSize: '1.5rem', lineHeight: '1.7rem', fontWeight: 600, marginLeft: 0}
    const makerTextStyle = {fontSize: '1.2rem', lineHeight: '1.4rem', marginLeft: 0, marginTop: 10}

    const codeSize = isMobile ? 200 : 200

    return (

        <div
            style={{width: '100%', height: '100%', backgroundColor: '#fff', padding: 0, margin: 0, overflow: 'hidden'}}>

            <div style={{
                maxWidth: 450,
                padding: 8,
                backgroundColor: '#fff',
                color: '#000',
                border: '1px dashed #333',
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: 24,
                marginBottom: 24,
                paddingLeft: 8,
                paddingBottom: 30
            }}>

                {lock && lock.name &&
                    <React.Fragment>
                        <div style={{margin: `10px 20px 30px ${paddingLeft}px`, lineHeight: '1.5rem'}}>
                            <div style={{display: flexStyle, paddingBottom: 15, borderBottom: '1px solid #ccc'}}>
                                <div style={{display: 'flex', alignItems: 'center', flexGrow: 1, marginRight: 10}}>
                                    <div>
                                        <div style={nameTextStyle}>{lock.name}</div>
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


                        <div style={{height: 'auto', margin: '40px auto', maxWidth: codeSize, width: '100%'}}>
                            <QRCode
                                size={256}
                                style={{height: 'auto', maxWidth: '100%', width: '100%'}}
                                value={lockUrl}
                                viewBox={'0 0 256 256'}
                            />
                        </div>
                        <div style={{marginBottom: 10, width: '100%', textAlign: 'center', fontSize: '0.85rem'}}>
                            Scan QR code to check in or view lock details
                        </div>
                        <div style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            paddingTop: 15,
                            borderTop: '1px solid #ccc',
                            justifyContent: 'left'
                        }}>
                            {lock.lockCreatedAt &&
                                <FieldValue name='Created' value={internationalDate(lock.lockCreatedAt)}
                                            headerStyle={{color: '#999'}} style={{marginRight: 20}}/>
                            }
                            {lock.latestUpdate &&
                                <React.Fragment>
                                    <FieldValue name='Latest Check-in'
                                                value={internationalDate(lock.latestUpdate?.pickDate)}
                                                headerStyle={{color: '#999'}} style={{marginRight: 20}}/>
                                    <FieldValue name='Checked in by' value={lock.latestUpdate?.username}
                                                headerStyle={{color: '#999'}} style={{}}/>
                                    {lock.latestUpdate.country &&
                                        <FieldValue name='Check-in Country' value={lock.latestUpdate?.country}
                                                    headerStyle={{color: '#999'}} style={{marginRight: 20}}/>
                                    }
                                </React.Fragment>
                            }
                        </div>

                        <div style={{display: flexStyle, margin: '30px 8px', borderBottom: '1px solid #ccc'}}>
                            Notes:
                        </div>
                        <div style={{display: flexStyle, margin: '30px 8px', borderBottom: '1px solid #ccc'}}/>
                        <div style={{display: flexStyle, margin: '30px 8px', borderBottom: '1px solid #ccc'}}/>
                        <div style={{display: flexStyle, margin: '30px 8px', borderBottom: '1px solid #ccc'}}/>
                        <div style={{display: flexStyle, margin: '30px 8px', borderBottom: '1px solid #ccc'}}/>
                        <div style={{
                            fontSize: '1.3rem',
                            lineHeight: '1.6rem',
                            fontWeight: 500,
                            marginTop: 20,
                            textAlign: 'center'
                        }}>lpulocks.com
                        </div>

                        <Tracker feature='clPrint' id={lock?.id} name={lock?.name}/>

                    </React.Fragment>
                }
                <Dialog open={notValidLock} componentsProps={{
                    backdrop: {style: {backgroundColor: '#000', opacity: 0.7}}
                }}>
                    <div style={{display: 'flex'}}>
                        <div
                            style={{backgroundColor: '#444', marginLeft: 'auto', marginRight: 'auto', padding: 40}}>
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
                            }}>Click below to browse the challenge locks page and select a lock to print.
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
            </div>

        </div>
    )
}
