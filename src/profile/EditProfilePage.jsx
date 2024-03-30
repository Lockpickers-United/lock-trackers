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
import MultipleSelect from './ShipsToSelect.jsx'

function EditProfilePage() {

    const {updateProfile, profile = {}} = useContext(DBContext)
    const [localProfile, setLocalProfile] = useState(profile)

    const cardTitle = profile.username
        ? `Hey ${profile?.username}!`
        : 'Create Profile'

    const introText = !profile.username
        ? 'You must have a named profile to submit speed picks.'
        : ''

    const [profileChanged, setProfileChanged] = useState(false)

    const handleChange = useCallback((event) => {
        const {name, value} = event.target
        const newProfile = {...localProfile}
        newProfile[name] = value
        newProfile.created = localProfile.created || dayjs().format()
        newProfile.modified = dayjs().format()
        setLocalProfile(newProfile)
        setProfileChanged(true)
    }, [localProfile])

    const clearForm = useCallback(() => {
        setLocalProfile({})
    }, [])

    const handleFocus = useCallback(event => event.target.select(), [])

    const handleSave = useCallback(async () => {
        try {
            updateProfile(localProfile)
            //await refreshData()
            enqueueSnackbar('Profile updated')
            setProfileChanged(false)
        } catch (ex) {
            console.error('Error while updating profile', ex)
            enqueueSnackbar('Error while updating profile', ex)
        }
    }, [updateProfile, localProfile])

    const pattern = /^[\sa-zA-Z0-9_-]{1,32}$/
    const error = localProfile.username?.length > 0 && !pattern.test(localProfile.username.toString())
    const empty = localProfile.username?.length === 0

    const helperText = error
        ? localProfile.username?.length === 0
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
                        name='username'
                        error={error}
                        fullWidth
                        variant='outlined'
                        label='Username'
                        helperText={helperText}
                        value={localProfile?.username || ''}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        inputProps={{
                            maxLength: 20
                        }}
                    />
                    <div>

                        {profile.isSeller &&
                            <div>
                                <div id={'SELLER PROFILE'} style={{
                                    marginTop: 25,
                                    marginBottom: 0,
                                    fontWeight: 600,
                                    fontSize: '1rem'
                                }}>SELLER PROFILE
                                </div>

                                <MultipleSelect
                                    parentChange={handleChange}
                                    currentValue={localProfile?.sellerShipsTo || ''}
                                />

                                <TextField
                                    name='sellerEmail'
                                    fullWidth
                                    size='small'
                                    variant='outlined'
                                    label='Public Email'
                                    value={localProfile?.sellerEmail || ''}
                                    onChange={handleChange}
                                    onFocus={handleFocus}
                                    inputProps={{
                                        maxLength: 32
                                    }}
                                    style={{marginTop: 20}}
                                />
                                <TextField
                                    name='spreadsheetId'
                                    fullWidth
                                    disabled
                                    size='small'
                                    variant='outlined'
                                    label='Spreadsheet Id'
                                    value={localProfile?.spreadsheetId || ''}
                                    onChange={handleChange}
                                    onFocus={handleFocus}
                                    inputProps={{
                                        maxLength: 50
                                    }}
                                    style={{marginTop: 20}}
                                />
                                <TextField
                                    name='spreadsheetRange'
                                    fullWidth
                                    disabled
                                    size='small'
                                    variant='outlined'
                                    label='Spreadsheet Range'
                                    value={localProfile?.spreadsheetRange || ''}
                                    onChange={handleChange}
                                    onFocus={handleFocus}
                                    inputProps={{
                                        maxLength: 50
                                    }}
                                    style={{marginTop: 20}}
                                />

                            </div>
                        }

                        <div id={'OPTIONAL'}
                             style={{marginTop: 25, marginBottom: 15, fontWeight: 600, fontSize: '1rem'}}>OPTIONAL
                        </div>

                        <FormControl id='beltFC' size='small' sx={{minWidth: 220}}>
                            <InputLabel>Belt (Honor system!)</InputLabel>
                            <Select
                                id='belt'
                                name='belt'
                                value={localProfile?.belt || ''}
                                label='Belt (Honor system!)'
                                onChange={handleChange}
                            >
                                {uniqueBelts.map((belt) =>
                                    <MenuItem key={belt} value={belt}>{belt}</MenuItem>
                                )}
                            </Select>
                        </FormControl>

                        <TextField
                            name='discordUsername'
                            fullWidth
                            size='small'
                            variant='outlined'
                            label='Discord Username'
                            value={localProfile?.discordUsername || ''}
                            onChange={handleChange}
                            onFocus={handleFocus}
                            inputProps={{
                                maxLength: 32
                            }}
                            style={{marginTop: 20}}
                        />
                        <TextField
                            name='redditUsername'
                            fullWidth
                            size='small'
                            variant='outlined'
                            label='Reddit Username'
                            value={localProfile?.redditUsername || ''}
                            onChange={handleChange}
                            onFocus={handleFocus}
                            inputProps={{
                                maxLength: 32
                            }}
                            style={{marginTop: 20}}
                        />
                        <TextField
                            name='LPUBeltsProfile'
                            fullWidth
                            size='small'
                            variant='outlined'
                            label='LPUBelts Profile Link'
                            value={localProfile?.LPUBeltsProfile || ''}
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
                                name='country'
                                value={localProfile?.country || ''}
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
                </Stack>

                <div style={{marginTop: 20, textAlign: 'right'}}>
                    <Button variant='outlined'
                            onClick={clearForm}
                            style={{marginRight: 10, color: '#bbb'}}>
                        Clear&nbsp;Form
                    </Button>
                    <Button variant='outlined'
                            disabled={error || empty || !profileChanged}
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
