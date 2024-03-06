import Stack from '@mui/material/Stack'
import React, {useCallback, useContext, useState} from 'react'
import Typography from '@mui/material/Typography'
import {enqueueSnackbar} from 'notistack'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import TextField from '@mui/material/TextField'
import DBContext from '../app/DBContext'
import Button from '@mui/material/Button'
import dayjs from 'dayjs'
import {uniqueBelts} from '../data/belts'
import countries from '../data/countries.json'
import {FormControl, InputLabel, Select} from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import LoadingContext from '../context/LoadingContext.jsx'

function EditProfilePage() {

    const {refreshData} = useContext(LoadingContext)
    const {updateProfile, profile} = useContext(DBContext)
    const [created] = useState(profile?.created || dayjs().format())
    const [username, setUsername] = useState(profile?.username || '')
    const [discordUsername, setDiscordUsername] = useState(profile?.discordUsername || '')
    const [redditUsername, setRedditUsername] = useState(profile?.redditUsername || '')
    const [LPUBeltsProfile, setLPUBeltsProfile] = useState(profile?.LPUBeltsProfile || '')
    const [belt, setBelt] = useState(profile?.belt || '')
    const [country, setCountry] = useState(profile?.country || '')

    const cardTitle = username
        ? `Hey ${profile?.username}!`
        : 'Create Profile'

    const introText = !username
        ? 'You must have a named profile to submit speed picks.'
        : ''

    const handleChange = useCallback((event) => {
        const {value} = event.target
        if (event.target.id === 'username') {
            setUsername(value)
        } else if (event.target.id === 'discordUsername') {
            setDiscordUsername(value)
        } else if (event.target.id === 'redditUsername') {
            setRedditUsername(value)
        } else if (event.target.id === 'LPUBeltsProfile') {
            setLPUBeltsProfile(value)
        } else if (event.target.name === 'belt') {
            setBelt(value)
        } else if (event.target.name === 'country') {
            setCountry(value)
        }
    }, [])

    const clearForm = useCallback(() => {
        setUsername('')
        setDiscordUsername('')
        setRedditUsername('')
        setLPUBeltsProfile('')
        setBelt('')
        setCountry('')
    }, [])

    const handleFocus = useCallback(event => event.target.select(), [])

    const handleSave = useCallback(async () => {
        try {
            updateProfile(username, discordUsername, redditUsername, LPUBeltsProfile, belt, country, created)
            await refreshData()
            enqueueSnackbar('Updated profile.')
        } catch (ex) {
            console.error('Error while updating profile', ex)
            enqueueSnackbar('Error while updating profile.')
        }
    }, [updateProfile, username, discordUsername, redditUsername, LPUBeltsProfile, belt, country, created, refreshData])

    const pattern = /^[\sa-zA-Z0-9_-]{1,32}$/

    const error = username.length > 0 && !pattern.test(username.toString())
    const empty = username.length === 0

    const helperText = error
        ? username.length === 0
            ? 'Public profiles must have a display name.'
            : 'Display name must only include A-Z, 0-9, _ and -.'
        : ''

    return (
        <Card style={{
            maxWidth: 450,
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: 26,
            marginBottom: 16
        }}>
            <CardHeader title={cardTitle} action={null} style={{paddingBottom: 0}}/>
            <CardContent>
                <Typography>{introText}</Typography>
                <br/>
                <Stack direction='column'>
                    <TextField
                        id='username'
                        error={error}
                        fullWidth
                        variant='outlined'
                        label='Username'
                        helperText={helperText}
                        value={username || ''}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        inputProps={{
                            maxLength: 20
                        }}
                    />
                    {1 === 1 &&
                        <div>
                            <div style={{marginTop: 20, marginBottom: 15, fontWeight: 600, fontSize: '1rem'}}>OPTIONAL
                            </div>

                            <FormControl id='beltFC' size='small' sx={{minWidth: 220}}>
                                <InputLabel>Belt (Honor system!)</InputLabel>
                                <Select
                                    id='belt'
                                    name='belt'
                                    value={belt}
                                    label='Belt (Honor system!)'
                                    onChange={handleChange}
                                >
                                    {uniqueBelts.map((belt) =>
                                        <MenuItem key={belt} value={belt}>{belt}</MenuItem>
                                    )}
                                </Select>
                            </FormControl>

                            <TextField
                                id='discordUsername'
                                fullWidth
                                size='small'
                                variant='outlined'
                                label='Discord Username'
                                value={discordUsername || ''}
                                onChange={handleChange}
                                onFocus={handleFocus}
                                inputProps={{
                                    maxLength: 32
                                }}
                                style={{marginTop: 20}}
                            />
                            <TextField
                                id='redditUsername'
                                fullWidth
                                size='small'
                                variant='outlined'
                                label='Reddit Username'
                                value={redditUsername || ''}
                                onChange={handleChange}
                                onFocus={handleFocus}
                                inputProps={{
                                    maxLength: 32
                                }}
                                style={{marginTop: 20}}
                            />
                            <TextField
                                id='LPUBeltsProfile'
                                fullWidth
                                size='small'
                                variant='outlined'
                                label='LPUBelts Profile Link'
                                value={LPUBeltsProfile || ''}
                                onChange={handleChange}
                                onFocus={handleFocus}
                                inputProps={{
                                    maxLength: 128
                                }}
                                style={{marginTop: 20}}
                            />

                            <FormControl id='country' size='small' sx={{minWidth: 220, marginTop: '20px'}}>
                                <InputLabel>Country</InputLabel>
                                <Select
                                    id='country'
                                    name='country'
                                    value={country}
                                    label='Country'
                                    onChange={handleChange}
                                >
                                    {countries.map((countryInfo) =>
                                        <MenuItem key={countryInfo.ISO_alpha3_code}
                                                  value={countryInfo.country_area}>{countryInfo.country_area}</MenuItem>
                                    )}
                                </Select>
                            </FormControl>


                        </div>
                    }
                </Stack>

                <div style={{marginTop: 20, textAlign: 'right'}}>
                    <Button variant='outlined'
                            onClick={clearForm}
                            style={{marginRight: 10, color: '#bbb'}}>
                        Clear&nbsp;Form
                    </Button>
                    <Button variant='outlined'
                            disabled={error || empty}
                            color={error ? undefined : 'success'}
                            onClick={handleSave}
                            style={{}}>
                        Save&nbsp;Profile
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default EditProfilePage
