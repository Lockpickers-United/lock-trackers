import React, {useContext, useCallback} from 'react'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import FilterContext from '../context/FilterContext'
import useWindowSize from '../util/useWindowSize.jsx'
import SearchBox from '../nav/SearchBox.jsx'


function SortFilterBar() {

    const {
        filters,
        addFilter,
    } = useContext(FilterContext)

    const {sort} = filters

    const handleSort = useCallback(value => () => {
        setTimeout(() => addFilter('sort', value, true), 0)
    }, [addFilter])

    const {width} = useWindowSize()
    const smallWindow = width <= 480

    const divStyle = {
        margin: '16px 5px 15px 5px', opacity: 0.8
    }

    const divFlexStyle = smallWindow ? {} : {display: 'flex'}
    const combinedDivStyle = {
        ...divStyle,
        ...divFlexStyle
    }

    return (
        <div style={combinedDivStyle}>
            <div style={{textAlign: 'left', flexGrow: 1, marginRight:40}}>
                <SearchBox label='Channels'/>
            </div>
            <div style={{textAlign: 'right'}}>
                <span style={{fontSize: '.7rem', marginRight: 5}}>SORT</span>
                <ToggleButtonGroup style={{height: 26, marginTop: 4}}>
                    <ToggleButton selected={sort === 'name' || !sort} style={{padding: 7}} value={'name'}
                                  onClick={handleSort('name')}>Name</ToggleButton>
                    <ToggleButton selected={sort === 'subscribers'} style={{padding: 7}} value={'subscribers'}
                                  onClick={handleSort('subscribers')}>Subscribers</ToggleButton>
                    <ToggleButton selected={sort === 'videos'} style={{padding: 7}} value={'videos'}
                                  onClick={handleSort('videos')}>Videos</ToggleButton>
                    <ToggleButton selected={sort === 'views'} style={{padding: 7}} value={'views'}
                                  onClick={handleSort('views')}>Views</ToggleButton>
                </ToggleButtonGroup>
            </div>
        </div>
    )
}

export default SortFilterBar