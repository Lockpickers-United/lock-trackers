import React from 'react'
import useWindowSize from '../util/useWindowSize.jsx'
import CopyLinkToEntryButton from './CopyLinkToEntryButton.jsx'
import CopyEntryTextButton from './CopyEntryTextButton.jsx'
import OpenLPULinkButton from './OpenLPULinkButton.jsx'
import WatchlistButton from './WatchlistButton.jsx'

const EntryActions = ({entry}) => {

    const {width} = useWindowSize()
    const mobileLarge428 = width <= 428
    const divStyle = !mobileLarge428 ? {margin: '0px 20px 10px 0px'} : {margin: '0px 5px 5px 0px'}

    return (
        <div style={divStyle}>
            {!entry.id.includes('lb_') &&
                <WatchlistButton id={entry.id} dense={true} fontSize='medium'/>
            }
            <CopyEntryTextButton entry={entry} fontSize='small'/>
            {!entry.id.includes('lb_') &&
                <React.Fragment>
                    <CopyLinkToEntryButton entry={entry} fontSize='medium'/>
                    <OpenLPULinkButton entry={entry} fontSize='small'/>
                </React.Fragment>
            }
        </div>
    )
}

export default EntryActions