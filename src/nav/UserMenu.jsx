import React, {useCallback, useContext, useMemo, useState} from 'react'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import PersonIcon from '@mui/icons-material/Person'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import LogoutIcon from '@mui/icons-material/Logout'
import EditIcon from '@mui/icons-material/Edit'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Tooltip from '@mui/material/Tooltip'
import SignInButton from '../auth/SignInButton'
import AuthContext from '../app/AuthContext'
import DBContext from '../app/DBContext'
import {useNavigate} from 'react-router-dom'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import AlarmOnIcon from '@mui/icons-material/AlarmOn'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'

function UserMenu() {
    const navigate = useNavigate()
    const {isLoggedIn, user, logout} = useContext(AuthContext)
    const {profile, adminFlags} = useContext(DBContext)

    const hasWatchlist = useMemo(() => {
        return !!profile?.watchlist && profile.watchlist.length > 0
    }, [profile?.watchlist])

    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const handleOpen = useCallback(event => setAnchorEl(event.currentTarget), [])
    const handleClose = useCallback(() => setAnchorEl(null), [])

    const safeName = profile.username
        ? profile.username.replace(/\s/g, '_')
        : 'Private'

    //TODO: change profile destination and add toggle on view page
    const profileURL = `/speedpicks?pickerId=${user?.uid}&name=${safeName}`

    const sellerURL = adminFlags?.isSeller ? `/lockbazaar?sellerName=${profile.username}` : null

    const handleClick = useCallback(url => () => {
        handleClose()
        navigate(url)
    }, [handleClose, navigate])

    const handleLogout = useCallback(() => {
        handleClose()
        logout()
    }, [handleClose, logout])

    return (
        <React.Fragment>
            <Tooltip title={isLoggedIn ? user.displayName : 'Account'} arrow disableFocusListener>
                <IconButton color='inherit' onClick={handleOpen} edge='end'>
                    {
                        isLoggedIn
                            ? <Avatar
                                alt={user.displayName}
                                src={user.photoURL}
                                sx={{width: 32, height: 32}}
                            />
                            : <AccountCircleIcon/>
                    }
                </IconButton>
            </Tooltip>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                {
                    isLoggedIn &&
                    <div>
                        <MenuItem disabled>
                            <ListItemIcon>
                                <PersonIcon fontSize='small'/>
                            </ListItemIcon>
                            <ListItemText>{safeName}</ListItemText>
                        </MenuItem>
                        <MenuItem onClick={handleClick('/profile/edit')}>
                            <ListItemIcon style={{marginTop:5}}>
                                <EditIcon fontSize='small'/>
                            </ListItemIcon>
                            <ListItemText>Edit Profile</ListItemText>
                        </MenuItem>
                        {sellerURL &&
                            <MenuItem onClick={handleClick(sellerURL)}>
                                <ListItemIcon style={{marginTop:5}}>
                                    <ShoppingCartOutlinedIcon fontSize='small'/>
                                </ListItemIcon>
                                <ListItemText>Seller Profile</ListItemText>
                            </MenuItem>
                        }
                        {hasWatchlist &&
                            <MenuItem onClick={handleClick('/lockbazaar?collection=Watchlist')}>
                                <ListItemIcon style={{marginTop:5}}>
                                    <FavoriteBorderIcon fontSize='small'/>
                                </ListItemIcon>
                                <ListItemText>Your Watchlist</ListItemText>
                            </MenuItem>
                        }
                        {profile?.username &&
                            <MenuItem onClick={handleClick(profileURL)}>
                                <ListItemIcon style={{marginTop:5}}>
                                    <AlarmOnIcon fontSize='small'/>
                                </ListItemIcon>
                                <ListItemText>Speed Picks</ListItemText>
                            </MenuItem>
                        }
                        <Divider/>
                        <MenuItem onClick={handleLogout}>
                            <ListItemIcon style={{marginTop:5, marginBottom:5}}>
                                <LogoutIcon fontSize='small'/>
                            </ListItemIcon>
                            <ListItemText>Sign Out</ListItemText>
                        </MenuItem>
                    </div>
                }
                {
                    !isLoggedIn &&
                    <div>
                        <Divider/>
                        <SignInButton onClick={handleClose}/>
                    </div>
                }
            </Menu>
        </React.Fragment>
    )
}

export default UserMenu
