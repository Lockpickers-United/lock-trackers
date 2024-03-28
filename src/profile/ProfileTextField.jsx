import TextField from '@mui/material/TextField'
import React from 'react'


function ProfileTextField(fieldId,label,value,maxLength,onChange,onFocus) {


    return (

        <TextField
            id={fieldId}
            label={label}
            value={value || ''}
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

export default ProfileTextField