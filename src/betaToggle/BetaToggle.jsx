import React, {useContext} from 'react'
import useWindowSize from '../util/useWindowSize.jsx'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Card from '@mui/material/Card'
import ToggleBetaButton from '../nav/ToggleBetaButton.jsx'
import AppContext from '../app/AppContext.jsx'

function BetaToggle() {
    const {beta} = useContext(AppContext)

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
            fontSize: '1.5rem', lineHeight: 0.8, textAlign: 'center'
        }}>

            <Card style={{
                maxWidth: 450,
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: 26,
                marginBottom: 16,
                backgroundColor: '#4d4d79',
            }}>

                <CardHeader title='Toggle Beta Features' action={null} style={{paddingBottom: 0, textAlign: 'left'}}/>
                <CardContent>
                    <div style={{
                        fontSize: '1.2rem',
                        width: '100%',
                        textAlign: 'center',
                        marginTop: 20,
                        marginBottom: 15
                    }}>
                        {beta ? 'Beta features are currently enabled.' : 'Beta features disabled.'}
                        <br/><br/><br/>
                        <ToggleBetaButton/>


                    </div>
                </CardContent>
            </Card>


        </div>
    )
}

export default BetaToggle
