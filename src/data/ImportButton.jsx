import React, {useCallback, useContext} from 'react'
import DBContext from '../app/DBContext.jsx'
import speedPicks from '../speedpicks/speedPicks.json'
import ReportProblemIcon from '@mui/icons-material/ReportProblem'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'

const ImportButton = () => {

    const {updateEntry} = useContext(DBContext)

    const doImport = useCallback(() => {
        speedPicks.data.map((entry) => {
                updateEntry(entry)
            }
        )
    }, [updateEntry])

    return (
        <Tooltip title={'! IMPORT JSON !'} arrow
                 disableFocusListener>
            <IconButton onClick={doImport} color='inherit'>
                <ReportProblemIcon fontSize='small'  color={'warning'}/>
            </IconButton>
        </Tooltip>
    )


}

export default ImportButton