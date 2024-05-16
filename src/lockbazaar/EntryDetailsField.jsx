import React from 'react'
import useWindowSize from '../util/useWindowSize.jsx'

function EntryDetailsField({field, value}) {

    const {width} = useWindowSize()
    const smallWindow = width < 520

    const separator = !smallWindow ? <br/> : ': '
    const marginLeft = !smallWindow ? 0 : 15

    return (
        <div style={{marginRight:25, marginLeft:marginLeft}}>
            <span style={{fontSize: '.85rem', color: '#bbb'}}>{field}{separator}</span>{value}
        </div>

    )
}

export default EntryDetailsField