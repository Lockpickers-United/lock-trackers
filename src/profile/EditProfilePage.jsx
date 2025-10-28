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
import ShipsToSelect from './ShipsToSelect.jsx'
import Link from '@mui/material/Link'
import Switch from '@mui/material/Switch'

function EditProfilePage() {

    const {updateProfile, profile, adminFlags = {}} = useContext(DBContext)
    const [localProfile, setLocalProfile] = useState(profile)
    const sellerListingsPaused = !!localProfile.sellerPaused

    const cardTitle = profile.username
        ? `Hey ${profile?.username}!`
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

    const handleSave = useCallback(async (profileToSave = localProfile) => {
        try {
            await updateProfile(profileToSave)
            enqueueSnackbar('Profile updated')
            setProfileChanged(false)
        } catch (ex) {
            console.error('Error while updating profile', ex)
            enqueueSnackbar('Error while updating profile')
        }
    }, [updateProfile, localProfile])

    const togglePause = useCallback(async () => {
        const payload = { target: { name: 'sellerPaused', value: !localProfile.sellerPaused } }
        handleChange(payload)
        const next = {
            ...localProfile,
            sellerPaused: !localProfile.sellerPaused,
            created: localProfile.created || dayjs().format(),
            modified: dayjs().format(),
        }
        await handleSave(next)
    }, [handleChange, handleSave, localProfile])

    const pattern = /^[\sa-zA-Z0-9_-]{1,32}$/
    const error = localProfile.username?.length > 0 && !pattern.test(localProfile.username.toString())
    const lpuError = localProfile.LPUBeltsProfile?.length > 0 && !lpuIdRegex.test(localProfile.LPUBeltsProfile)

    const empty = localProfile.username?.length === 0

    const helperText = error
        ? localProfile.username?.length === 0
            ? 'Public profiles must have a display name.'
            : 'Display name must only include A-Z, 0-9, _ and -.'
        : ''

    const lpuHelperText = lpuError
        ? 'Not a valid LPUbelts profile.'
        : ''

    const pausedColor = localProfile?.sellerPaused ? '#fa8500' : '#fff'
    const linkSx = {
        color: localProfile?.sellerPaused ? '#fa8500' : '#bbb', textDecoration: 'none', cursor: 'pointer', '&:hover': {
            textDecoration: 'underline'
        }
    }


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
                        slotProps={{
                            htmlInput: {maxLength: 25}
                        }}
                    />
                    <div>

                        {adminFlags.isSeller &&
                            <div>
                                <div style={{display: 'flex', marginTop: 25, alignItems: 'center'}}>
                                    <div id={'SELLER PROFILE'} style={{
                                        marginBottom: 0,
                                        fontWeight: 600,
                                        fontSize: '1rem',
                                        color: pausedColor
                                    }}>SELLER PROFILE
                                    </div>
                                    <div style={{display: 'flex', flexGrow:1, justifyContent: 'right', alignItems: 'center', fontWeight: 700}}>
                                        <Link onClick={togglePause} sx={linkSx}>{sellerListingsPaused ? 'Pause Listings' : 'Pause Listings'}</Link>
                                        <Switch label='Pause Listings' checked={sellerListingsPaused} onChange={togglePause} color='warning'/>
                                    </div>
                                </div>

                                <TextField
                                    name='sellerNote'
                                    fullWidth
                                    size='small'
                                    variant='outlined'
                                    multiline
                                    label='Seller Notes'
                                    value={localProfile?.sellerNote || ''}
                                    onChange={handleChange}
                                    onFocus={handleFocus}
                                    style={{marginTop: 20, marginBottom: 20}}
                                />

                                <ShipsToSelect
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
                                    style={{marginTop: 20}}
                                    slotProps={{
                                        htmlInput: {
                                            maxLength: 32
                                        }
                                    }}
                                />
                                <TextField
                                    name='spreadsheetId'
                                    fullWidth
                                    disabled
                                    size='small'
                                    variant='outlined'
                                    label='Spreadsheet Id'
                                    value={adminFlags?.spreadsheetId || ''}
                                    onChange={handleChange}
                                    onFocus={handleFocus}
                                    style={{marginTop: 20}}
                                    slotProps={{
                                        htmlInput: {
                                            maxLength: 50
                                        }
                                    }}
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
                                variant='outlined'
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
                            style={{marginTop: 20}}
                            slotProps={{
                                htmlInput: {
                                    maxLength: 32
                                }
                            }}
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
                            style={{marginTop: 20}}
                            slotProps={{
                                htmlInput: {
                                    maxLength: 32
                                }
                            }}
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
                            error={lpuError}
                            helperText={lpuHelperText}
                            style={{marginTop: 20}}
                            slotProps={{
                                htmlInput: {
                                    maxLength: 128
                                }
                            }}
                        />

                        <FormControl id='country' size='small' sx={{minWidth: 220, marginTop: '20px'}}>
                            <InputLabel>Country</InputLabel>
                            <Select
                                name='country'
                                value={localProfile?.country || ''}
                                label='Country'
                                variant='outlined'
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
                            disabled={error || lpuError || empty || !profileChanged}
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

const lpuIdRegex = /^(http|https):\/\/lpubelts.com\/#\/profile\/([A-Za-z0-9]{28})/


export default EditProfilePage
