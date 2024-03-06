import React, {useCallback, useContext, useState} from 'react'
import Typography from '@mui/material/Typography'
import ToggleBetaButton from './ToggleBetaButton'
import ToggleColorMode from './ToggleColorMode'
import ToggleModButton from './ToggleModButton.jsx'
import AuthContext from '../app/AuthContext.jsx'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import ReportProblemIcon from '@mui/icons-material/ReportProblem'
import DBContext from '../app/DBContext.jsx'
import speedPicks from '../speedpicks/speedPicks.json'

function Footer({extras}) {
    const {user} = useContext(AuthContext)
    const {profile} = useContext(DBContext)
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)

    const {updateEntry} = useContext(DBContext)

    const handleOpen = useCallback(event => setAnchorEl(event.currentTarget), [])
    const handleClose = useCallback(() => setAnchorEl(null), [])

    const doImport = useCallback(() => {
        speedPicks.data.map((entry) => {
                updateEntry(entry)
            }
        )
    }, [updateEntry])

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

            <div style={{textAlign: 'center'}}>
                <ToggleBetaButton/>
                {(user && profile) &&
                    <ToggleModButton/>
                }
                <br/>
                {user?.uid === 'ClbjuilBEHgbzO4UZl4y3GStlEz2' &&
                    <div style={{marginTop: '20px', display: 'flex', textAlign: 'center'}}>
                        <div style={{marginRight: 'auto', marginLeft: 'auto'}}>
                            <ToggleColorMode/>
                            <Tooltip title={'! IMPORT JSON !'} arrow
                                     disableFocusListener>
                                <IconButton onClick={handleOpen} color='inherit'>
                                    <ReportProblemIcon fontSize='small' color={'warning'}/>
                                </IconButton>
                            </Tooltip>
                            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                                <div style={{padding: 20, textAlign: 'center'}}>
                                    Are you sure?
                                </div>
                                <div style={{textAlign: 'center'}}>
                                    <Button style={{marginBottom: 10, color: '#000'}}
                                            variant='contained'
                                            onClick={doImport}
                                            edge='start'
                                            color='warning'
                                    >
                                        Import
                                    </Button>
                                </div>
                            </Menu>
                        </div>
                    </div>
                }
            </div>
        </Typography>


    )
}

export default Footer
