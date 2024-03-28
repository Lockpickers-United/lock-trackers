import TextField from '@mui/material/TextField'
import React from 'react'


function ProfileInputItem(fieldId, label, value, maxLength, onChange, onFocus) {


    const valString = value ? value.toString() : ''

    return (

        <TextField
            id={fieldId.toString()}
            label={label.toString()}
            value={valString || ''}
            onChange={onChange}
            onFocus={onFocus}
            inputProps={{
                maxLength: {maxLength}
            }}
            fullWidth
            size='small'
            variant='outlined'
            style={{marginTop: 20}}
        />

    )
}

export default ProfileInputItem