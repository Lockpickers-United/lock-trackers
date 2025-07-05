import React, {useCallback, useContext} from 'react'
import Button from '@mui/material/Button'
import {useNavigate} from 'react-router-dom'
import FilterContext from '../context/FilterContext.jsx'
import useWindowSize from '../util/useWindowSize.jsx'

export default function SubmitImagesButton({entry, style}) {

    const {filters: allFilters} = useContext(FilterContext)
    const {sort} = allFilters

    const navigate = useNavigate()
    const safeName = entry.name.replace(/[\s/]/g, '_').replace(/\W/g, '')
    const sortParam = sort ? `&sort=${sort}` : ''

    const handleClick = useCallback(() => {
        navigate(`/challengelocks/submit/images?id=${entry.id}&name=${safeName}${sortParam}`)
    },[entry.id, navigate, safeName, sortParam])

    const {isMobile} = useWindowSize()
    const padding = isMobile ? 4 : 10
    const buttonStyle = {lineHeight: '1.0rem', fontSize: '0.8rem', padding: padding, maxHeight: 45, ...style}

    return (
        <Button variant='contained' onClick={handleClick} style={buttonStyle} size='small' color='success'>
            Submit Images
        </Button>
    )

}