import React, {useCallback, useContext} from 'react'
import Button from '@mui/material/Button'
import {useNavigate} from 'react-router-dom'
import FilterContext from '../context/FilterContext.jsx'

export default function CheckInButton({entry, style}) {

    const {filters: allFilters} = useContext(FilterContext)
    const {sort} = allFilters

    const navigate = useNavigate()
    const safeName = entry.name.replace(/[\s/]/g, '_').replace(/\W/g, '')
    const sortParam = sort ? `&sort=${sort}` : ''

    const handleClick = useCallback(() => {
        navigate(`/challengelocks/checkin?id=${entry.id}&name=${safeName}${sortParam}`)
    },[entry.id, navigate, safeName, sortParam])

    return (
        <Button variant='contained' onClick={handleClick} style={style} size={'small'} color='success'>
            Check In!
        </Button>
    )

}