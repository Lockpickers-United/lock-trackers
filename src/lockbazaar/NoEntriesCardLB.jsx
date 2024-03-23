import React, {useCallback, useContext} from 'react'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'
import FilterContext from '../context/FilterContext.jsx'

function NoEntriesCard() {

    const {clearFilters} = useContext(FilterContext)

    const style = {
        marginTop: 16,
        maxWidth: 700,
        marginLeft: 'auto',
        marginRight: 'auto',
        borderRadius: 0
    }

    const message = 'No matching listings were found.'

    const handleClear = useCallback(event => {
        event.preventDefault()
        event.stopPropagation()
        clearFilters()
    }, [clearFilters])

    return (
        <Card style={style}>
            <CardContent style={{paddingBottom: 8}}>
                <Typography variant='h6' align='center'>
                    {message}
                </Typography>
            </CardContent>
                <CardActions style={{paddingBottom: 16}}>
                    <Button
                        variant='outlined'
                        color='inherit'
                        onClick={handleClear}
                        style={{minWidth: 160, margin: 'auto'}}
                    >
                        View all entries
                    </Button>
                </CardActions>
        </Card>
    )
}

export default NoEntriesCard
