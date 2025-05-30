import React, {useCallback} from 'react'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import ReportProblemIcon from '@mui/icons-material/ReportProblem'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'

export default function ReportButton({entry, style}) {

    const [report, setReport] = React.useState(false)

    const safeName = entry.name.replace(/[\s/]/g, '_').replace(/\W/g, '')

    const handleClick = useCallback(() => {
        console.log('Report Problem clicked for entry:', safeName, entry.id)
        setReport(true)
    }, [entry.id, safeName])

    const handleClose = useCallback(() => {
        setReport(false)
    }, [])

    return (
        <React.Fragment>
            <Tooltip title='Report Problem' arrow disableFocusListener>
                <IconButton onClick={handleClick} style={{height: 40, width: 40, ...style}}>
                    <ReportProblemIcon fontSize='medium'/>
                </IconButton>
            </Tooltip>

            <Dialog open={report} componentsProps={{
                backdrop: {style: {backgroundColor: '#000', opacity: 0.7}}
            }}>
                <div style={{display: 'flex'}}>
                    <div style={{backgroundColor: '#444', marginLeft: 'auto', marginRight: 'auto', padding: 40}}>
                        <div style={{
                            fontSize: '1.2rem',
                            fontWeight: 500,
                            marginBottom: 60,
                            textAlign: 'center'
                        }}>Report problem screen will go here.
                        </div>

                        <div style={{width: '100%', textAlign: 'center'}}>
                            <Button onClick={handleClose} variant='contained' color='info'
                                    style={{marginLeft: 'auto', marginRight: 'auto'}}>
                                OK
                            </Button>
                        </div>
                    </div>
                </div>
            </Dialog>

        </React.Fragment>
    )

}