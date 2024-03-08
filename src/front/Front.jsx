import React from 'react'
import useWindowSize from '../util/useWindowSize.jsx'
import LT_url from './LT_url.jsx'

function Front() {

    const {width} = useWindowSize()
    const smallWindow = width <= 560
    const pagePadding = !smallWindow
        ? '24px 24px 32px 24px'
        : '8px 8px 32px 8px'

    return (
        <div style={{
            minWidth: '320px', maxWidth: 800, height: '100%',
            padding: pagePadding, backgroundColor: '#223',
            marginLeft: 'auto', marginRight: 'auto',
            fontSize: '1.5rem', lineHeight: 0.8, textAlign: 'center',
        }}>

            <LT_url fill='#fff' style={{height: 280, padding:0, margin:0,
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -80%)'

            }}/>


        </div>
    )
}

export default Front
