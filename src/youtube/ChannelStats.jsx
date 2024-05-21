import FieldValue from '../util/FieldValue.jsx'
import Typography from '@mui/material/Typography'
import React from 'react'
import useWindowSize from '../util/useWindowSize.jsx'

const ChannelStats = ({channel}) => {

    const {width} = useWindowSize()
    const smallWindow = width <= 480

    const statMargin = smallWindow ? 25 : 15

    return (
        <div style={{display: 'flex', flexGrow: 1, marginTop: 6}}>
            <FieldValue
                name='subscribers'
                value={<Typography
                    style={{
                        fontSize: '0.95rem',
                        lineHeight: 1.25
                    }}>{channel.subscriberCount.toLocaleString()}</Typography>}
                headerStyle={{color: '#bbb'}}
                textStyle={{color: '#eee'}}
                style={{marginRight: statMargin}}
            />
            <FieldValue
                name='videos'
                value={<Typography
                    style={{
                        fontSize: '0.95rem',
                        lineHeight: 1.25
                    }}>{channel.videoCount.toLocaleString()}</Typography>}
                headerStyle={{color: '#bbb'}}
                textStyle={{color: '#eee'}}
                style={{marginRight: statMargin}}
            />
            <FieldValue
                name='views'
                value={<Typography
                    style={{
                        fontSize: '0.95rem',
                        lineHeight: 1.25
                    }}>{channel.viewCount.toLocaleString()}</Typography>}
                headerStyle={{color: '#bbb'}}
                textStyle={{color: '#eee'}}
                style={{marginRight: 15}}
            />
        </div>
    )

}

export default ChannelStats