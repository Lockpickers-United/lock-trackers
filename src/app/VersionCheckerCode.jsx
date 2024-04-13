import React, {useCallback, useState, useEffect} from 'react'
import SystemUpdateIcon from '@mui/icons-material/SystemUpdate'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import {useInterval} from 'usehooks-ts'

function VersionCheckerCode() {
    //if (import.meta.env.DEV) return null
    const [initial, setInitial] = useState()
    const [version, setVersion] = useState()

    const checkVersion = async first => {
        //console.log('version: ', version)
        try {
            const response = await fetch('/versionCode.json', {cache: 'no-cache'})
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
        <Tooltip title='New Version Available' arrow disableFocusListener>
            <IconButton onClick={handleClick} style={{color: 'green', marginLeft: 0}}>
                <SystemUpdateIcon/>
            </IconButton>
        </Tooltip>
    )
}

export default VersionCheckerCode
