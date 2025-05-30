import React, {useContext} from 'react'
import Button from '@mui/material/Button'
import useWindowSize from '../util/useWindowSize.jsx'
import Dialog from '@mui/material/Dialog'
import Tracker from '../app/Tracker.jsx'
import {useNavigate} from 'react-router-dom'
import DataContext from '../context/DataContext.jsx'
import FilterContext from '../context/FilterContext.jsx'
import QRCode from 'react-qr-code'
import FieldValue from '../util/FieldValue.jsx'
import dayjs from 'dayjs'

export default function PrintQRCode() {
    const {allEntries, getEntryFromId} = useContext(DataContext)

    const {filters} = useContext(FilterContext)
    const lockId = filters.id
    const lock = getEntryFromId(lockId) || {}
    const notValidLock = (Object.keys(allEntries).length > 0 && Object.keys(lock).length === 0)
    const dateCreated = lock.lockCreated || lock.createdAt

    console.log('lock', lock)

    const safeName = lock?.name?.replace(/[\s/]/g, '_').replace(/\W/g, '')
    const lockUrl = `https://beta.lpulocks.com/#/challengelocks/checkin?id=${lockId}&name=${safeName}`

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
                marginTop: 16,
                marginBottom: 46,
                paddingLeft: 8,
                paddingBottom: 60
            }}>

                <div style={{margin: `10px 20px 30px ${paddingLeft}px`, lineHeight: '1.5rem'}}>
                    <div style={{display: flexStyle, paddingBottom: 15, borderBottom: '1px solid #ccc'}}>
                        <div style={{display: 'flex', alignItems: 'center', flexGrow: 1, marginRight: 10}}>
                            <div>
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
                    <div style={{display: 'flex'}}>
                        <FieldValue name='Created' value={dayjs(dateCreated).format('MMM DD, YYYY')}
                                    headerStyle={{color: '#999'}} style={{marginRight: 20}}/>
                        {lock.country &&
                            <FieldValue name='Country' value={lock.country}
                                        headerStyle={{color: '#999'}} style={{marginRight: 40}}/>
                        }
                    </div>
                    {lock.latestUpdate &&
                        <div style={{display: 'flex'}}>
                            <FieldValue name='Latest Check-in'
                                        value={dayjs(lock.latestUpdate?.pickDate).format('MMM DD, YYYY')}
                                        headerStyle={{color: '#999'}} style={{marginRight: 20}}/>
                            <FieldValue name='Checked in by' value={'Picker Name'}
                                        headerStyle={{color: '#999'}} style={{}}/>
                        </div>
                    }
                </div>

                <div style={{display: flexStyle, margin: '30px 8px', borderBottom: '1px solid #ccc'}}>
                    Notes:
                </div>
                <div style={{display: flexStyle, margin: '30px 8px', borderBottom: '1px solid #ccc'}}/>
                <div style={{display: flexStyle, margin: '30px 8px', borderBottom: '1px solid #ccc'}}/>
                <div style={{display: flexStyle, margin: '30px 8px', borderBottom: '1px solid #ccc'}}/>
                <div style={{display: flexStyle, margin: '30px 8px', borderBottom: '1px solid #ccc'}}/>

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

                <div style={{
                    fontSize: '1.3rem',
                    lineHeight: '1.6rem',
                    fontWeight: 500,
                    marginTop: 20,
                    textAlign: 'center'
                }}>lpulocks.com
                </div>
            </div>

            <Tracker feature='challengeLock' id={lock.id} name={lock.name}/>

        </div>


    )
}

