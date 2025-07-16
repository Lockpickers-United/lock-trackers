import React, {useContext} from 'react'
import useWindowSize from '../util/useWindowSize.jsx'
import FilterButton from '../filters/FilterButton.jsx'
import DataContext from '../context/DataContext.jsx'
import SearchBox from '../nav/SearchBox.jsx'
import FilterDisplayToggleButtons from '../filters/FilterDisplayToggleButtons.jsx'

function SortFilterBar({label = '', sortButton = null, adminButtons = null, speedpicks = false, entryCount}) {

    const {isMod = []} = useContext(DataContext)

    const {width, isMobile} = useWindowSize()
    const mobileLarge428 = width <= 428

    const divStyle = {
        margin: '16px 0px 16px 0px', opacity: 0.8
    }
    const divFlexStyle = !mobileLarge428 ? {display: 'flex'} : {}
    const combinedDivStyle = {
        ...divStyle,
        ...divFlexStyle
    }

    return (
        <div style={combinedDivStyle}>
            <div style={{textAlign: 'left', marginTop: 10, flexGrow: 1, color: '#fff', opacity: 1}}>
                <SearchBox label={label} entryCount={entryCount}/>
            </div>
            <div style={{justifyContent: 'right', display: 'flex', flexDirection: 'column'}}>
                <div style={{display: 'flex', flexGrow: 1, justifyContent: 'right'}}>
                    {sortButton}
                    <FilterButton speedpicks={speedpicks}/>
                    {isMod &&
                        <React.Fragment>{adminButtons}</React.Fragment>
                    }
                </div>
                <div style={{display: 'flex', justifyContent: 'right'}}>
                    <FilterDisplayToggleButtons isMobile={isMobile}/>
                </div>
            </div>
        </div>
    )
}

export default SortFilterBar