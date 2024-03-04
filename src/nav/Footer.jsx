import React, {useContext} from 'react'
import Typography from '@mui/material/Typography'
import ToggleBetaButton from './ToggleBetaButton'
import ToggleColorMode from './ToggleColorMode'
import ToggleModButton from './ToggleModButton.jsx'
import ImportButton from '../data/ImportButton.jsx'
import AuthContext from '../app/AuthContext.jsx'

function Footer({extras}) {
    const {user} = useContext(AuthContext)


    return (
        <Typography align='center' component='div' style={{marginTop: 16, marginBottom: 80}}>
            <a href='https://lpubelts.com' target='_blank' rel='noopener noreferrer'>
                LPUbelts.com
            </a>
            &nbsp;•&nbsp;
            <a href='https://discord.gg/lockpicking' target='_blank' rel='noopener noreferrer'>
                LPU Discord
            </a>
            &nbsp;•&nbsp;
            <a href='https://www.reddit.com/r/lockpicking/' target='_blank' rel='noopener noreferrer'>
                Reddit
            </a>
            &nbsp;•&nbsp;
            <a href='/#/privacy'>
                Privacy
            </a>

            {extras}

            <div>
                <ToggleBetaButton/><ToggleModButton/><ToggleColorMode/><br/>
                {user?.uid === 'ClbjuilBEHgbzO4UZl4y3GStlEz2' &&
                    <ImportButton/>
                }
            </div>
        </Typography>


    )
}

export default Footer
