import React, {useCallback, useContext, useMemo, useState} from 'react'
import useWindowSize from '../util/useWindowSize.jsx'
import DataContext from '../context/DataContext.jsx'
import FilterContext from '../context/FilterContext.jsx'
import ChallengeLockEntry from './ChallengeLockEntry.jsx'
import ChoiceButtonGroup from '../util/ChoiceButtonGroup.jsx'
import {useNavigate} from 'react-router-dom'
import SortFilterBar from './SortFilterBar.jsx'
import SortButtonCL from './SortButtonCL.jsx'

function ChallengeLocksCardsMain() {

    const {visibleEntries} = useContext(DataContext)
    const {filters} = useContext(FilterContext)
    const [entryExpanded, setEntryExpanded] = useState(filters.id)

    const {width} = useWindowSize()
    const smallWindow = width <= 560
    const pagePadding = !smallWindow
        ? '24px 24px 32px 24px'
        : '8px 8px 32px 8px'

    const options = useMemo(() => {
        return [
            {label: 'Challenge Locks', page: '/challengelocks'},
            {label: 'Submit New Lock', page: '/challengelocks/submit'},
            {label: 'Check In (demo)', page: '/challengelocks/checkin?id=cl_4e29a0d7&name=Pirrip'}
        ]
    }, [])
    const navigate = useNavigate()
    const handleChange = useCallback(newValue => {
        navigate(newValue.page)
    }, [navigate])

    const navSortButton = <SortButtonCL/>
    const navAdminButton = null

    return (
        <React.Fragment>
            <div style={{marginBottom: 20, marginTop: 1}}>
                <ChoiceButtonGroup options={options} onChange={handleChange} defaultValue={options[0].label}/>
            </div>


            <div style={{
                minWidth: 330, maxWidth: 720, height: '100%',
                padding: pagePadding, backgroundColor: '#223',
                marginLeft: 'auto', marginRight: 'auto',
                fontSize: '1.5rem', lineHeight: 0.8, textAlign: 'center'
            }}>
                <SortFilterBar label='Challenge Locks' sortButton={navSortButton} adminButtons={navAdminButton}/>

                {visibleEntries.map((entry) => (
                    <ChallengeLockEntry
                        key={entry.id}
                        entry={entry}
                        expanded={entry.id === entryExpanded}
                        onExpand={setEntryExpanded}
                    />
                ))}
            </div>
        </React.Fragment>
    )
}

export default ChallengeLocksCardsMain
