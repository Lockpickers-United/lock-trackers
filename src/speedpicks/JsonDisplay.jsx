import React from 'react'
function JsonDisplay(json) {

    return (
        <div style={{textAlign: 'left', fontSize: '.8rem'}}>
            <pre>{JSON.stringify(json.jsonName, null, 2)}</pre>
            <pre>{JSON.stringify(json.json, null, 2)}</pre>
        </div>
    )
}

export default JsonDisplay
