import React, {useContext} from 'react'
import useWindowSize from '../util/useWindowSize.jsx'
import Tracker from '../app/Tracker.jsx'
import FilterContext from '../context/FilterContext.jsx'
import {QRWithCopy} from './QRWithCopy.jsx'

export default function PrintQRCode() {

    const {filters} = useContext(FilterContext)
    const {id, name, maker} = filters

    const decodedName = name ? decodeURIComponent(name) : 'Unknown Lock'
    const decodedMaker = maker ? decodeURIComponent(maker) : 'Unknown Maker'
    const safeName = decodedName.replace(/[\s/]/g, '_').replace(/\W/g, '')
    const filename=`${safeName}-qr.png`

    const lockUrl = id
        ? `${location.origin}/#/challengelocks/checkin?id=${id}&name=${safeName}`
        : `${location.origin}/#/challengelocks`

    const {width, isMobile} = useWindowSize()
    const paddingLeft = !isMobile ? 16 : 8

    const flexStyle = width < 500 ? 'block' : 'flex'
    const nameTextStyle = {fontSize: '1.5rem', lineHeight: '1.7rem', fontWeight: 600, marginLeft: 0}
    const makerTextStyle = {fontSize: '1.2rem', lineHeight: '1.4rem', marginLeft: 0, marginTop: 10}

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

                {id &&
                    <React.Fragment>
                        <div style={{
                            margin: `10px 20px 0px ${paddingLeft}px`,
                            lineHeight: '1.5rem',
                            paddingBottom: 20,
                            borderBottom: '1px solid #ccc'
                        }}>
                                <div style={nameTextStyle}>{decodedName}</div>
                                <div style={makerTextStyle}>By: {decodedMaker}</div>
                        </div>

                        <div style={{height: 'auto', margin: '20px auto', width: '100%'}}>
                            <QRWithCopy
                                value={lockUrl}
                                size={200}
                                filename={filename}
                                pngScale={6}
                                pngPadding={24}
                                fg='#111827'
                                bg='#ffffff'
                                actionsPlacement='center'
                            />
                        </div>

                        <div style={{marginBottom: 10, width: '100%', textAlign: 'center', fontSize: '0.85rem'}}>
                            Scan QR code to check in or view lock details
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

                        <Tracker feature='clPrint' id={id} name={safeName}/>

                    </React.Fragment>
                }
            </div>

        </div>
    )
}
