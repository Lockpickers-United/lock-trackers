import LinkIcon from '@mui/icons-material/Link'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import {enqueueSnackbar} from 'notistack'
import React, {useCallback, useContext} from 'react'
import AuthContext from '../app/AuthContext'
import FilterContext from '../context/FilterContext.jsx'
import DataContext from '../app/DataContext.jsx'

function CopyProfileLinkButton() {
    const {user} = useContext(AuthContext)
    const {filters} = useContext(FilterContext)
    const pickerId = filters?.pickerId
    const {getProfileFromId, isMod} = useContext(DataContext)

    const profile = filters?.pickerId ? getProfileFromId(filters.pickerId) : null

    const safeName = profile?.username
        ? profile.username.replace(/\s/g, '_')
        : 'Private'

    const handleClick = useCallback(async () => {
        const link = `https://lpulocks.com/#/speedpicks?pickerId=${pickerId}&name=${safeName}`

        await navigator.clipboard.writeText(link)
        enqueueSnackbar('Link to profile copied to clipboard.')
    }, [pickerId, safeName])

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
