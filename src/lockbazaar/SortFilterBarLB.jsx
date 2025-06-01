import React, {useContext} from 'react'
import FilterContext from '../context/FilterContext'
import useWindowSize from '../util/useWindowSize.jsx'
import FilterButton from '../filters/FilterButton.jsx'
import SortFilterWatchlistButton from './SortFilterWatchlistButton.jsx'
import FilterDisplayToggleButtons from '../filters/FilterDisplayToggleButtons.jsx'
import SortButtonLB from './SortButtonLB.jsx'
import SearchBox from '../nav/SearchBox.jsx'

function SortFilterBar() {

    const {filterCount} = useContext(FilterContext)

    const {width} = useWindowSize()
    const mobileLarge428 = width <= 428

    const divStyle = {
        margin: '16px 0px 15px 0px', opacity: 1.0
    }
    const divFlexStyle = !mobileLarge428 ? {display: 'flex'} : {}
    const combinedDivStyle = {
        ...divStyle,
        ...divFlexStyle
    }

    return (
        <div style={combinedDivStyle}>
            <div style={{textAlign: 'left', marginTop: 10, flexGrow: 1, color: '#fff', opacity: 1}}>
                <SearchBox label='Lock Bazaar'/>
            </div>
            <div style={{justifyContent: 'right', display: 'flex', opacity: 0.8}}>
                <SortButtonLB/>
                {filterCount > 0 &&
                    <div>
                        <FilterButton speedpicks={false}/>
                        <SortFilterWatchlistButton/>
                        <FilterDisplayToggleButtons/>
                    </div>
                }
                {filterCount === 0 &&
                    <div>
                        <FilterButton/>
                        <SortFilterWatchlistButton/>
                    </div>
                }
            </div>
        </div>
    )
}

export default SortFilterBar