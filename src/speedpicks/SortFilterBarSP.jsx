import React, {useContext} from 'react'
import FilterContext from '../context/FilterContext'
import useWindowSize from '../util/useWindowSize.jsx'
import FilterButton from '../filters/FilterButton.jsx'
import AdminFilterButton from './AdminFilterButton.jsx'
import DataContext from '../context/DataContext.jsx'
import SortButton from './SortButton.jsx'
import SearchBox from '../nav/SearchBox.jsx'
import FilterDisplayToggleButtons from '../filters/FilterDisplayToggleButtons.jsx'

function SortFilterBarSP() {

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
                <SearchBox label='Speedpicks'/>
            </div>
            <div style={{justifyContent: 'right', display: 'flex'}}>
                <SortButton/>
                {filterCount > 0 &&
                    <div>
                        <FilterButton speedpicks={true}/>
                        {isMod &&
                            <AdminFilterButton/>
                        }
                        <FilterDisplayToggleButtons/>
                    </div>
                }
                {filterCount === 0 &&
                    <div>
                        <FilterButton speedpicks={true}/>
                        {isMod &&
                            <AdminFilterButton/>
                        }
                    </div>
                }
            </div>
        </div>
    )
}

export default SortFilterBarSP