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
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

function EditSellerProfilePage() {

    const {updateProfile, profile = {}} = useContext(DBContext)
    const [localProfile, setLocalProfile] = useState(profile)

    const verifiedText = profile.isVerifiedSeller
        ? '(verified)'
        : '(unverified)'

    const cardTitle = profile.username
        ? `${profile?.username} - Seller Profile ${verifiedText}`
        : 'Create Profile'

    const introText = !profile.username
        ? 'You must have a named profile to submit to LPUlocks.'
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
                        required
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
                    <TextField
                        name='discordUsername'
                        required
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
                    <FormControl id='country' size='small' sx={{minWidth: 220, marginTop: '20px'}}>
                        <InputLabel>Country</InputLabel>
                        <Select
                            name='country'
                            required
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
                    <TextField
                        name='spreadsheetId'
                        required
                        fullWidth
                        size='small'
                        variant='outlined'
                        label='Google Spreadsheet ID'
                        value={localProfile?.spreadsheetId || ''}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        inputProps={{
                            maxLength: 32
                        }}
                        style={{marginTop: 20}}
                    />
                    <TextField
                        name='range'
                        required
                        fullWidth
                        size='small'
                        variant='outlined'
                        label='Google Spreadsheet Range'
                        value={localProfile?.range || ''}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        inputProps={{
                            maxLength: 32
                        }}
                        style={{marginTop: 20}}
                    />

                    <div style={{display: 'flex', marginTop: 20, placeItems: 'center'}}>
                        <div style={{marginRight: 10, width:150}}>Available Column*</div>
                        <FormControl id='avail' size='small' sx={{width: 100}}>
                            <Select
                                name='availableIndex'
                                value={localProfile.availableIndex || ''}
                                onChange={handleChange}
                            >
                                {abc.map((letter, index) =>
                                    <MenuItem key={index} value={letter}>{letter}</MenuItem>
                                )}
                            </Select>
                        </FormControl>
                    </div>

                    <div style={{display: 'flex', marginTop: 10, placeItems: 'center'}}>
                        <div style={{marginRight: 10, width:150}}>Lock URL Column*</div>
                        <FormControl id='lockURLIndex' size='small' sx={{width: 100}}>
                            <Select
                                name='lockURLIndex'
                                value={localProfile.lockURLIndex || ''}
                                onChange={handleChange}
                            >
                                {abc.map((letter, index) =>
                                    <MenuItem key={index} value={letter}>{letter}</MenuItem>
                                )}
                            </Select>
                        </FormControl>
                    </div>


                    <div style={{display: 'flex', marginTop: 10, placeItems: 'center'}}>
                        <div style={{marginRight: 10, width:150}}>Sameline # Column*</div>
                        <FormControl id='samelineIndex' size='small' sx={{width: 100}}>
                            <Select
                                name='samelineIndex'
                                value={localProfile.samelineIndex || ''}
                                onChange={handleChange}
                            >
                                {abc.map((letter, index) =>
                                    <MenuItem key={index} value={letter}>{letter}</MenuItem>
                                )}
                            </Select>
                        </FormControl>
                    </div>

                    <div style={{display: 'flex', marginTop: 10, placeItems: 'center'}}>
                        <div style={{marginRight: 10, width:150}}>Condition Column</div>
                        <FormControl id='conditionIndex' size='small' sx={{width: 100}}>
                            <Select
                                name='conditionIndex'
                                value={localProfile.conditionIndex || ''}
                                onChange={handleChange}
                            >
                                {abc.map((letter, index) =>
                                    <MenuItem key={index} value={letter}>{letter}</MenuItem>
                                )}
                            </Select>
                        </FormControl>
                    </div>

                    <div style={{display: 'flex', marginTop: 10, placeItems: 'center'}}>
                        <div style={{marginRight: 10, width:150}}>Key Count Column</div>
                        <FormControl id='keysIndex' size='small' sx={{width: 100}}>
                            <Select
                                name='keysIndex'
                                value={localProfile.keysIndex || ''}
                                onChange={handleChange}
                            >
                                {abc.map((letter, index) =>
                                    <MenuItem key={index} value={letter}>{letter}</MenuItem>
                                )}
                            </Select>
                        </FormControl>
                    </div>

                    <div style={{display: 'flex', marginTop: 10, placeItems: 'center'}}>
                        <div style={{marginRight: 10, width:150}}>Price Column</div>
                        <FormControl id='priceIndex' size='small' sx={{width: 100}}>
                            <Select
                                name='priceIndex'
                                value={localProfile.priceIndex || ''}
                                onChange={handleChange}
                            >
                                {abc.map((letter, index) =>
                                    <MenuItem key={index} value={letter}>{letter}</MenuItem>
                                )}
                            </Select>
                        </FormControl>
                    </div>


                    <div id={'OPTIONAL'}
                         style={{marginTop: 30, marginBottom: 15, fontWeight: 600, fontSize: '1rem'}}>OPTIONAL
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

export default EditSellerProfilePage

const abc = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'X']
