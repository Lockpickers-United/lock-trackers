import React, {useCallback, useState, useEffect} from 'react'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import {useInterval} from 'usehooks-ts'
import CachedIcon from '@mui/icons-material/Cached'

function VersionCheckerCode() {
    //if (import.meta.env.DEV) return null
    const [initial, setInitial] = useState('')
    const [version, setVersion] = useState('')

    const checkVersion = async first => {
        //console.log('version: ', version)
        try {
            const response = await fetch('https://lpulocks.com/data/version.json', {cache: 'no-cache'})
            const {version: newVersion} = (await response.json())
            if (first && !initial) {
                setInitial(newVersion)
            }
            setVersion(newVersion)
        } catch (e) {
            console.warn('Unable to check version.', e)
            setVersion('error')
        }
    }

    useEffect(() => {
        checkVersion(true)
    })
    useInterval(checkVersion, 10 * 60 * 1000) // 10 minutes
    const handleClick = useCallback(() => location.reload(), [])

    if (!initial || !version || initial === version) return null
    return (
        <Tooltip title='New Listings Available' arrow disableFocusListener>
            <IconButton onClick={handleClick} style={{color: '#7272ce', marginLeft: 0}}>
                <CachedIcon/>
            </IconButton>
        </Tooltip>
    )
}

export default VersionCheckerCode
