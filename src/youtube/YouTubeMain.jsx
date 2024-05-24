import React, {useContext} from 'react'
import LoadingContext from '../youtubeContext/LoadingContextYT.jsx'
import DataContext from '../app/DataContext.jsx'
import Channels from './Channels.jsx'
import SortFilterBarYT from './SortFilterBarYT.jsx'
import useWindowSize from '../util/useWindowSize.jsx'
import LoadingDisplay from '../util/LoadingDisplay.jsx'

function YouTubeMain() {

    const {allDataLoaded} = useContext(LoadingContext)
    const {visibleChannels} = useContext(DataContext)

    const {width} = useWindowSize()
    const smallWindow = width < 560
    const pagePadding = !smallWindow
        ? '24px 24px 32px 24px'
        : '8px 8px 32px 8px'

    return (

        <div style={{
            minWidth: '320px', maxWidth: 700, height:'100%',
            padding: pagePadding,
            marginLeft: 'auto', marginRight: 'auto'
        }}>

            {!allDataLoaded &&
                <LoadingDisplay/>
            }
            {(allDataLoaded && visibleChannels) &&
                <React.Fragment>
                    <SortFilterBarYT/>
                    <Channels channels={visibleChannels}/>
                </React.Fragment>
            }
        </div>
    )
}

export default YouTubeMain