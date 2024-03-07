import React, {useCallback, useContext, useEffect, useState} from 'react'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import {useInterval} from 'usehooks-ts'
import DBContext from './DBContext.jsx'
import CachedIcon from '@mui/icons-material/Cached'

function VersionChecker() {
    //if (import.meta.env.DEV) return null
    const {version} = useContext(DBContext)
    const [initial, setInitial] = useState('')
    const [currentVersion, setCurrentVersion] = useState('')

    console.log(currentVersion)

    const checkVersion = async first => {
        try {
            const newVersion = version
            if (first) {
                setInitial(newVersion)
            }
            setCurrentVersion(newVersion)
        } catch (e) {
            console.warn('Unable to check version.', e)
            setCurrentVersion('error')
        }
    }

    const [change, setChange] = useState(false)

    if (initial?.length > 0 && initial !== version) {
        console.log('version checker initial ', initial)
        console.log('version checker version ', version)
        if (!change) setChange(true)
    }

    console.log(change)

    useEffect(() => {
        checkVersion(true)
    })

    //useInterval(checkVersion, 10 * 60 * 1000) // 10 minutes
    useInterval(checkVersion, 10 * 60 * 100) // 10 minutes

    const handleClick = useCallback(() => location.reload(), [])

    if (change) {
        return (
            <Tooltip title='New Version Available' arrow disableFocusListener>
                <IconButton onClick={handleClick} style={{color: 'green', marginLeft: 8}}>
                    <CachedIcon/>
                </IconButton>
            </Tooltip>
        )
    } else {
        return null
    }
}

export default VersionChecker
