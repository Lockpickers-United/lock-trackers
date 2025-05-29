import React, {useCallback} from 'react'
import Button from '@mui/material/Button'
import {useNavigate} from 'react-router-dom'

export default function CheckInButton({entry, style}) {

    const navigate = useNavigate()
    const safeName = entry.name.replace(/[\s/]/g, '_').replace(/\W/g, '')

    const handleClick = useCallback(() => {
        navigate(`/challengelocks/checkin?id=${entry.id}&name=${safeName}`)
    },[entry.id, navigate, safeName])

    return (
        <Button variant='contained' onClick={handleClick} style={style} size={'small'} color='success'>
            Check In!
        </Button>
    )

}