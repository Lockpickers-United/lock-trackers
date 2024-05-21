import React, {useContext, useDeferredValue} from 'react'
import ListContext from '../context/ListContext'
import NoEntriesCardLB from '../lockbazaar/NoEntriesCardLB.jsx'
import Channel from './Channel.jsx'

function Channels({channels}) {

    document.title = 'LPU Locks - Lock Bazaar Browser'

    const {expanded, setExpanded} = useContext(ListContext)
    const defExpanded = useDeferredValue(expanded)

    return (
        <div>
            {channels?.length === 0 &&
                <NoEntriesCardLB/>
            }
            {channels.map((channel) =>
                <Channel
                    key={channel.id}
                    channel={channel}
                    expanded={channel.id === defExpanded}
                    onExpand={setExpanded}
                />
            )}
        </div>
    )
}

export default Channels
