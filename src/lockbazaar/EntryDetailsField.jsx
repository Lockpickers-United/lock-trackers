import React from 'react'

function EntryDetailsField({field, value}) {

    return (
        <div style={{marginRight:20}}>
            <span style={{fontSize: '.85rem', color: '#bbb'}}>{field}: </span>{value}
        </div>

    )
}

export default EntryDetailsField