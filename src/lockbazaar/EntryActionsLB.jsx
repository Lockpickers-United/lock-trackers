import React from 'react'
import useWindowSize from '../util/useWindowSize.jsx'
import CopyLinkToEntryButton from './CopyLinkToEntryButton.jsx'
import CopyEntryTextButton from './CopyEntryTextButton.jsx'
import OpenLPULinkButton from './OpenLPULinkButton.jsx'

const EntryDetails = ({entry}) => {

    const {width} = useWindowSize()
    const mobileLarge428 = width <= 428
    const divStyle = !mobileLarge428 ? {margin:'0px 20px 10px 0px'} : {margin:'0px 5px 5px 0px'}

    return (
        <div style={divStyle}>
            <CopyEntryTextButton entry={entry} fontSize='small'/>
            <CopyLinkToEntryButton entry={entry} fontSize='medium'/>
            {!entry.id.includes('lb_') &&
            <OpenLPULinkButton entry={entry} fontSize='small'/>
            }
        </div>
    )
}

export default EntryDetails