import React, {useCallback, useContext, useState} from 'react'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import Stack from '@mui/material/Stack'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import Tooltip from '@mui/material/Tooltip'
import {useHotkeys} from 'react-hotkeys-hook'
import AppContext from '../app/AppContext'
import MainMenuItem from './MainMenuItem'
import menuConfig from './menuConfig'
import Button from '@mui/material/Button'
import LPU_text_logo from '../assets/LPU-text-logo.jsx'
import LPU_LOCKS_header from '../assets/LPU_LOCKS_header.jsx'
import DBContext from '../app/DBContext.jsx'

function MainMenu() {
    const {beta} = useContext(AppContext)
    const {admin} = useContext(DBContext)
    const [open, setOpen] = useState(false)
    const [openTitle, setOpenTitle] = useState('More from LPU') // TODO: don't do this once there are more

    const handleHotkey = useCallback(() => setOpen(!open), [open])
    useHotkeys('m', handleHotkey)

    const openDrawer = useCallback(() => {
        setOpen(true)

        // Clear current focus to prevent weird issues on mobile
        document.activeElement.blur()
    }, [])
    const closeDrawer = useCallback(() => setOpen(false), [])

    return (
        <React.Fragment>
            <Tooltip title='Main Menu' arrow disableFocusListener>
                <Button edge='start' color='inherit' onClick={openDrawer}
                            style={{ height: '30px', minWidth: '30px', margin:0, padding:0}}
                >
                    <LPU_text_logo fill='#fff' style={{height: 30, padding:0, margin:0}}/>
                </Button>
            </Tooltip>

            <SwipeableDrawer
                anchor='left'
                open={open}
                onOpen={openDrawer}
                onClose={closeDrawer}
            >
                <Stack direction='column' style={{minWidth: 250}}>
                    <MenuItem onClick={closeDrawer} style={{
                        padding: '12px 0px 6px 10px',
                        margin: '0px',
                        backgroundColor: '#292929',
                        borderBottom: '1px solid #000'
                    }}>
                        <div style={{margin: '4px 0px 8px 10px'}}>
                            <LPU_LOCKS_header fill={'#fff'} style={{height: 50}}/>
                        </div>
                    </MenuItem>

                    {menuConfig
                        .filter(menuItem => beta || !menuItem.beta)
                        .filter(menuItem => admin || !menuItem.admin)
                        .map((menuItem, index) =>
                            <React.Fragment key={index}>
                                <MainMenuItem
                                    menuItem={menuItem}
                                    openTitle={openTitle}
                                    onOpen={setOpenTitle}
                                    onClose={closeDrawer}
                                />
                                <Divider style={{margin: 0}}/>
                            </React.Fragment>
                        )}
                </Stack>
            </SwipeableDrawer>
        </React.Fragment>
    )
}

export default MainMenu
