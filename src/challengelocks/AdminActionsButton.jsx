import React, {useCallback, useContext} from 'react'
import Tooltip from '@mui/material/Tooltip'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import DataContext from '../context/DataContext.jsx'
import VpnKeyIcon from '@mui/icons-material/VpnKey'

export default function AdminActionsButton() {

    const {isMod, adminEnabled, setAdminEnabled} = useContext(DataContext)
    if (!isMod) return null

    const adminText = adminEnabled ? 'Disable Admin' : 'Enable Admin'
    const buttonColor = adminEnabled ? '#ffb446' : '#999'

    const [anchorEl, setAnchorEl] = React.useState(null)
    const open = Boolean(anchorEl)
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }
    const toggleAdmin = useCallback(() => {
        setAdminEnabled(!adminEnabled)
        handleClose()
    },[adminEnabled, setAdminEnabled])

    return (
        <React.Fragment>
            <Tooltip title='Admin' arrow disableFocusListener>
                <Button variant='contained' size='small' color='warning'
                        onClick={handleClick}
                        style={{margin: '8px 0px 3px 10px', padding: 0, height: 32, width: 32, minWidth: 32, backgroundColor: buttonColor}}>
                    <VpnKeyIcon/>
                </Button>


            </Tooltip>
            <Menu
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
            >

                <Stack direction='column' style={{minWidth: 100}}>
                    <MenuItem style={{color:'#f1aa55'}} onClick={toggleAdmin}>
                        {adminText}
                    </MenuItem>
                </Stack>
            </Menu>
        </React.Fragment>
    )
}


