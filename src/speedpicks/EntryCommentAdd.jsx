import React, {useCallback, useState} from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import useWindowSize from '../util/useWindowSize.jsx'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

function EntryCommentAdd({handleCloseComment, addCommentAction, targetStatus, commenter}) {

    const {width} = useWindowSize()
    const breakSize = width <= 500
    const divFlexStyle = !breakSize ? {display: 'flex'} : {}

    const [commentText, setCommentText] = useState('')
    const noSave = commentText.length === 0

    const handleChange = useCallback(event => {
        const {value} = event.target
        setCommentText(value)
    }, [])

    const handleReject = useCallback(async () => {
        await addCommentAction(`${commenter}:${commentText}`, targetStatus)
        handleCloseComment()
    }, [addCommentAction, commenter, commentText, targetStatus, handleCloseComment])

    const buttonText = targetStatus === 'rejected'
        ? 'Reject Entry'
        : 'Submit'

    return (
        <Card style={{
            width: '100%',
            maxWidth: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: 26,
            marginBottom: 16,
            padding: '20px', border: '1px solid #ddd'
        }}>
            <CardHeader title={'Add comment'} action={<HighlightOffIcon onClick={handleCloseComment}/>}
                        style={{paddingBottom: 0}}/>
            <CardContent>
                <div style={divFlexStyle}>
                    <div style={{fontSize: '0.9rem', lineHeight: '1.3rem', width: '100%'}}>
                        <TextField
                            variant='outlined'
                            color='warning'
                            label='Comment'
                            multiline
                            fullWidth
                            onChange={handleChange}
                            value={commentText || ''}
                            inputProps={{
                                maxLength: 255
                            }}
                        />
                    </div>
                </div>

                <div style={{width: '100%', textAlign: 'center', marginTop: '30px'}}>
                    <Button
                        variant='contained'
                        color='warning'
                        disabled={noSave}
                        onClick={handleReject}
                    >
                        {buttonText}
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default EntryCommentAdd