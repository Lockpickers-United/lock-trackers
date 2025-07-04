import CardHeader from '@mui/material/CardHeader'
import React from 'react'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

export default function MustBeLoggedIn() {
    const style = {
        marginTop: 16,
        maxWidth: 350,
        marginLeft: 'auto',
        marginRight: 'auto',
        borderRadius: 0
    }

    return (
        <Card style={style}>
            <CardHeader title='Log In!'/>
            <CardContent>
                <Typography variant='h6' align='center'>
                    You must be logged in to use this page.
                </Typography>
            </CardContent>
        </Card>
    )
}

