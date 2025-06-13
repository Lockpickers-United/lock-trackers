import React, {useCallback, useContext, useState} from 'react'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import ListIcon from '@mui/icons-material/List'
import CodeIcon from '@mui/icons-material/Code'
import IconButton from '@mui/material/IconButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Tooltip from '@mui/material/Tooltip'
import {enqueueSnackbar} from 'notistack'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import download from '../util/download'
import Button from '@mui/material/Button'
import dayjs from 'dayjs'
import DataContext from '../context/DataContext.jsx'

export default function ExportCheckInsButton({text, entries}) {
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const handleOpen = useCallback(event => setAnchorEl(event.currentTarget), [])
    const handleClose = useCallback(() => setAnchorEl(null), [])
    const {allCheckIns} = useContext(DataContext)

    const jsonEntries = entries.map(entry => {
        return allCheckIns.find(e => e.id === entry.id)
    })

    const handleExportJson = useCallback(() => {
        const data = JSON.stringify(jsonEntries)
        handleClose()
        download('checkindata.json', data)
        enqueueSnackbar('Current lock entries downloaded as checkindata.json')
    }, [jsonEntries, handleClose])

    const handleExportClipboard = useCallback(() => {
        const clipboardText = entries.map(entry => {
            return '* ' + entry.lockName + ' by ' + entry.lockMaker +
                (entry.successfulPick === 'Yes' ? ' picked on ' : ' attempted on ') + dayjs(entry.pickDate).format('YYYY-MM-DD')
        }).join('\n')

        handleClose()
        navigator.clipboard.writeText(clipboardText).then()
        enqueueSnackbar('Current lock entries copied to clipboard.')
    }, [handleClose, entries])

    const handleExportCsv = useCallback(() => {
        const csvColumns = ['lockId', 'lockName', 'lockMaker', 'pickDate', 'successfulPick', 'videoUrl', 'receivedDate', 'receivedFrom', 'sentDate', 'sentTo']
        const headers = csvColumns.join(',')
        const csvData = entries.map(datum => {
            return csvColumns
                .map(header => datum[header])
                .map(value => {
                    let newValue = `${value ?? ''}`.replace(/"/g, '""')
                    newValue = newValue.replace(/T\d\d:\d\d:\d\d.\d\d\dZ/g, '')
                    return /(\s|,|")/.test(newValue) ? `"${newValue}"` : newValue
                })
                .join(',')
        }).join('\n')
        const csvFile = `${headers}\n${csvData}`
        handleClose()
        download('lpulocksdata.csv', csvFile)
        enqueueSnackbar('Current lock entries downloaded as lpulocksdata.csv')
    }, [handleClose, entries])

    return (
        <React.Fragment>
            {text
                ? <Tooltip title='Export' arrow disableFocusListener>
                    <Button variant='outlined' size='small' onClick={handleOpen}
                            style={{color: '#ddd', borderColor: '#aaa'}} startIcon={<FileDownloadIcon/>}>
                        Export
                    </Button>
                </Tooltip>
                : <Tooltip title='Export' arrow disableFocusListener>
                    <IconButton onClick={handleOpen}>
                        <FileDownloadIcon/>
                    </IconButton>
                </Tooltip>
            }
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                {!text &&
                    <MenuItem disabled>
                        <ListItemIcon>
                            <FileDownloadIcon fontSize='small'/>
                        </ListItemIcon>
                        <ListItemText>Export</ListItemText>
                    </MenuItem>
                }
                <MenuItem onClick={handleExportClipboard}>
                    <ListItemIcon>
                        <ContentCopyIcon fontSize='small'/>
                    </ListItemIcon>
                    <ListItemText>Copy to clipboard</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleExportCsv}>
                    <ListItemIcon>
                        <ListIcon fontSize='small'/>
                    </ListItemIcon>
                    <ListItemText>CSV</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleExportJson}>
                    <ListItemIcon>
                        <CodeIcon fontSize='small'/>
                    </ListItemIcon>
                    <ListItemText>JSON</ListItemText>
                </MenuItem>
            </Menu>
        </React.Fragment>
    )
}
