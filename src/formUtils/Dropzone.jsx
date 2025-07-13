import React, {useCallback, useEffect, useMemo} from 'react'
import {useDropzone} from 'react-dropzone'
import Link from '@mui/material/Link'
import CancelIcon from '@mui/icons-material/Cancel'
import IconButton from '@mui/material/IconButton'

export default function Dropzone({
                                     files,
                                     otherFiles = [],
                                     handleDroppedFiles,
                                     maxFiles = 10,
                                     maxMBperFile = 10,
                                     maxTotalMB = 50,
                                     zoneId = 'dropzone',
                                     backgroundColor = '#333'
                                 }) {


    const maxFilesHit = files.length >= maxFiles
    const maxSize = maxMBperFile * 1024 * 1024

    const [errorMessage, setErrorMessage] = React.useState('')
    const [warning, setWarning] = React.useState('')

    const displayError = useCallback((errorMessage) => {
        const errorMessageDisplay = {
            'File type must be image/*': 'Only image files are allowed.',
            'Too many files': `Only ${maxFiles} file${maxFiles > 1 ? 's' : ''} allowed.`,
            'Too large': `Maximum image file size of ${maxMBperFile}MB exceeded.`
        }
        if (errorMessage.length > 0) {
            if (errorMessage.includes('File is larger than')) {
                return errorMessageDisplay['Too large']
            } else {
                return errorMessageDisplay[errorMessage] || errorMessage
            }
        }
    }, [maxFiles, maxMBperFile])

    const warningCheck = useCallback((files) => {
        const totalSize = files.reduce((acc, file) => acc + file.size, 0)

        let warningMessage
        if (files.length > maxFiles) {
            warningMessage = `Warning: only the first ${maxFiles} files will be uploaded.`
            setWarning(warningMessage)
        } else if (totalSize > maxTotalMB * 1024 * 1024) {
            warningMessage = `Warning: uploads over ${maxTotalMB}MB are not recommended.`
            setWarning(warningMessage)
        } else {
            setWarning('')
        }
    }, [maxFiles, maxTotalMB])


    const {getRootProps, getInputProps, isFocused, isDragAccept, isDragReject} =
        useDropzone({
            maxFiles: maxFiles,
            maxSize: maxSize,
            accept: {
                'image/*': []
            },
            onDrop: acceptedFiles => {
                const combinedFiles = [...files, ...otherFiles]
                const uniqueFiles = acceptedFiles
                    .filter(file => !combinedFiles.find(f => f.path === file.path))
                const newFiles = uniqueFiles
                    .map(file => Object.assign(file, {preview: URL.createObjectURL(file)}))
                const allFiles = [...files, ...newFiles]
                if (uniqueFiles.length !== acceptedFiles.length || allFiles.length > maxFiles) {
                    setWarning(`Duplicate file${acceptedFiles.length - uniqueFiles.length > 1 ? 's' : ''} detected. Only unique files added.`)
                } else {
                    warningCheck(uniqueFiles)
                }
                handleDroppedFiles(allFiles.slice(0, 5), zoneId)
                setErrorMessage('')
            },
            onDropRejected: (rejectedFiles) => {
                if (rejectedFiles.length > 0) {
                    const errorMessage = rejectedFiles[0].errors.map(e => e.message).join(', ')
                    setErrorMessage(displayError(errorMessage))
                }
            },
            disabled: maxFilesHit
        })

    const baseStyle = {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        borderWidth: 1,
        borderRadius: 1,
        borderColor: '#777',
        borderStyle: 'dashed',
        backgroundColor: backgroundColor,
        color: '#eee',
        outline: 'none',
        transition: 'border .24s ease-in-out',
        minWidth: 150
    }

    const focusedStyle = {borderColor: '#2196f3'}
    const acceptStyle = {borderColor: '#00e676'}
    const rejectStyle = {borderColor: '#ff1744', borderWidth: 2}
    const maxFilesHitStyle = {borderColor: '#666', color: '#666'}

    // TODO: clear error message border on change
    const style = useMemo(() => ({
        ...baseStyle,
        ...(isFocused ? focusedStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject && errorMessage.length > 0 ? rejectStyle : {}),
        ...(maxFilesHit ? maxFilesHitStyle : {})
    }), [isFocused, isDragAccept, isDragReject, maxFilesHit]) // eslint-disable-line react-hooks/exhaustive-deps


    const thumbsContainer = {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 4,
        justifyContent: 'center'
    }

    const thumb = {
        display: 'inline-flex',
        borderRadius: 2,
        border: '0px solid #333',
        marginBottom: 12,
        marginRight: 8,
        //width: 100,
        height: 140,
        padding: 4,
        boxSizing: 'border-box'
    }

    const thumbInner = {
        display: 'flex',
        minWidth: 0,
        overflow: 'hidden',
        alignItems: 'start'
    }

    const img = {
        display: 'block',
        width: 'auto',
        height: '100%'
    }

    const clearAll = useCallback((event) => {
        event.preventDefault()
        event.stopPropagation()
        files.forEach(file => URL.revokeObjectURL(file.preview))
        handleDroppedFiles([], zoneId)
        setErrorMessage('')
        setWarning('')
    }, [files, handleDroppedFiles, zoneId])

    const clearFile = useCallback((event, filename) => {
        event.preventDefault()
        event.stopPropagation()
        const matchedFiles = files.filter(e => {
            return e.name === filename
        })
        matchedFiles.forEach(file => URL.revokeObjectURL(file.preview))
        const remainingFiles = files.filter(e => e.name !== filename)
        handleDroppedFiles(remainingFiles, zoneId)
        warningCheck(remainingFiles)
        setErrorMessage('')
    }, [files, handleDroppedFiles, warningCheck, zoneId])

    const thumbs = files.map((file, index) => (
        <div style={thumb} key={index}>
            <div style={thumbInner}>
                <img
                    src={file.preview}
                    style={img}
                    alt='Upload preview'
                    // Revoke data uri after image is loaded
                    onLoad={() => {
                        //URL.revokeObjectURL(file.preview)
                    }}
                />
            </div>
            <IconButton style={{
                margin: '0px 0px 0px -16px',
                backgroundColor: '#000',
                padding: 0,
                height: 15,
                width: 15
            }} onClick={(event) => clearFile(event, file.name)}><CancelIcon/></IconButton>
        </div>
    ))

    useEffect(() => {
        // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
        // doing this in remove now
        return () => files.forEach(file => URL.revokeObjectURL(file.preview))
    }, []) //eslint-disable-line

    const errorMessageStyle = {fontSize: '0.9rem', color: '#fc3838', textAlign: 'center'}
    const warningStyle = {fontSize: '0.9rem', color: '#fc9706', textAlign: 'center'}

    return (

        <section className='container'>
            <div {...getRootProps({style})}>
                <input {...getInputProps()} />
                {maxFilesHit
                    ? <p style={{textAlign: 'center'}}>Maximum Number of<br/> Files Added</p>
                    : <p style={{textAlign: 'center'}}>Drag Files Here or<br/> Click to Browse</p>
                }
                {errorMessage.length > 0 &&
                    <div style={errorMessageStyle}>{errorMessage}</div>
                }
                {warning.length > 0 &&
                    <div style={warningStyle}>{warning}</div>
                }
                {files.length > 0 &&
                    <div style={{...baseStyle, borderWidth: 0, padding: 10}}>
                        <div style={thumbsContainer}>
                            {thumbs}
                        </div>
                        <Link onClick={clearAll} name='all' style={{color: '#eee', marginTop: 6}}>Clear all</Link>
                    </div>
                }

            </div>


        </section>

    )


}
