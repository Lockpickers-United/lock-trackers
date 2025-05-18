import React, {useContext, useState} from 'react'
import FilterContext from '../context/FilterContext'
import useWindowSize from '../util/useWindowSize.jsx'
import FilterButton from '../filters/FilterButton.jsx'
import AdminFilterButton from './AdminFilterButton.jsx'
import DataContext from '../app/DataContext.jsx'
import SortButton from './SortButton.jsx'
import SearchBox from '../nav/SearchBox.jsx'
import FilterDisplayToggleButtons from '../filters/FilterDisplayToggleButtons.jsx'

function SortFilterBarSP() {

    const {isMod = []} = useContext(DataContext)

    const {filters, filterCount} = useContext(FilterContext)

    const [highlight, setHighlight] = useState('all')
    if (filters?.status && highlight !== filters?.status) {
        setHighlight(filters?.status)
    } else if (filters?.isBest && highlight !== 'isBest') {
        setHighlight('isBest')
    } else if (!filters?.isBest && !filters?.status && highlight !== 'all') {
        setHighlight('all')
    }

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
            <div style={{textAlign: 'left', marginTop: 10, flexGrow: 1}}>
                <SearchBox label='Speedpicks'/>
            </div>
            <div style={{justifyContent: 'right', display: 'flex'}}>
                <SortButton/>
                {filterCount > 0 &&
                    <div>
                        <FilterButton speedpicks={true}/>
                        <FilterDisplayToggleButtons/>
                        {isMod &&
                            <AdminFilterButton/>
                        }
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