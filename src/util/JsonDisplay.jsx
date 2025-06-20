import React from 'react'

export default function JsonDisplay({json, abc = true}) {

    const maxLen = Object.keys(json.json).reduce((max, key) => Math.max(max, key.length), 0)
    const displayText = !abc
        ? JSON.stringify(json.json, null, 2)
        : Object.keys(json.json).sort().map(key => `${key.padEnd(maxLen+1, ' ')}: ${json.json[key]}`).join('\n')

    return (
        <div style={{textAlign: 'left', fontSize: '.9rem', lineHeight: '1.5rem'}}>
            <pre>{json.jsonName}</pre>
            <pre>{displayText}</pre>
        </div>
    )
}
