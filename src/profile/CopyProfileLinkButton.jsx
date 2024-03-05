import LinkIcon from '@mui/icons-material/Link'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import {enqueueSnackbar} from 'notistack'
import React, {useCallback, useContext} from 'react'
import AuthContext from '../app/AuthContext'
import FilterContext from '../context/FilterContext.jsx'
import DataContext from '../context/DataContext.jsx'

function CopyProfileLinkButton() {
    const {user} = useContext(AuthContext)
    const {filters} = useContext(FilterContext)
    const pickerId = filters?.pickerId
    const {getProfileFromId, isMod} = useContext(DataContext)

    const profile = filters?.pickerId ? getProfileFromId(filters.pickerId) : null

    const handleClick = useCallback(async () => {
        const safeName = profile?.username.replace(/\s/g, '_')
        const link = `https://locktrackers.com/dist/#/speedpicks?pickerId=${pickerId}&name=${safeName}`

        await navigator.clipboard.writeText(link)
        enqueueSnackbar('Link to profile copied to clipboard.')
    }, [profile.username, pickerId])

    if ((!user || (!!pickerId && pickerId !== user.uid) || !profile?.username) && !isMod) return null
    return (
        <Tooltip title='Copy My Profile Link' arrow disableFocusListener>
            <IconButton onClick={handleClick}>
                <LinkIcon/>
            </IconButton>
        </Tooltip>
    )
}

export default CopyProfileLinkButton
