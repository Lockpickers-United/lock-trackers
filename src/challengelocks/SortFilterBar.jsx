import React, {useContext} from 'react'
import FilterContext from '../context/FilterContext'
import useWindowSize from '../util/useWindowSize.jsx'
import FilterButton from '../filters/FilterButton.jsx'
import DataContext from '../context/DataContext.jsx'
import SearchBox from '../nav/SearchBox.jsx'
import FilterDisplayToggleButtons from '../filters/FilterDisplayToggleButtons.jsx'

function SortFilterBarSP({label = '', sortButton = null, adminButtons = null, speedpicks = false}) {

    const {isMod = []} = useContext(DataContext)
    const {filterCount} = useContext(FilterContext)

    const {width} = useWindowSize()
    const mobileLarge428 = width <= 428

    const divStyle = {
        margin: '16px 0px 10px 0px', opacity: 0.8
    }
    const divFlexStyle = !mobileLarge428 ? {display: 'flex'} : {}
    const combinedDivStyle = {
        ...divStyle,
        ...divFlexStyle
    }

    return (
        <div style={combinedDivStyle}>
            <div style={{textAlign: 'left', marginTop: 10, flexGrow: 1, color: '#fff', opacity: 1}}>
                <SearchBox label={label}/>
            </div>
            <div style={{justifyContent: 'right', display: 'flex'}}>
                {sortButton}
                {filterCount > 0 &&
                    <div>
                        <FilterButton speedpicks={speedpicks}/>
                        <FilterDisplayToggleButtons/>
                        {isMod &&
                            <React.Fragment>{adminButtons}</React.Fragment>
                        }
                    </div>
                }
                {filterCount === 0 &&
                    <div>
                        <FilterButton speedpicks={speedpicks}/>
                        {isMod &&
                            <React.Fragment>{adminButtons}</React.Fragment>
                        }
                    </div>
                }
            </div>
        </div>
    )
}

export default SortFilterBarSP