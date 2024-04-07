import React from 'react'
function JsonDisplay(json) {

    return (
        <div style={{textAlign: 'left', fontSize: '.9rem', lineHeight:'1.2rem'}}>
            <pre>{json.jsonName}</pre>
            <pre>{JSON.stringify(json.json, null, 2)}</pre>
        </div>
    )
}

export default JsonDisplay
