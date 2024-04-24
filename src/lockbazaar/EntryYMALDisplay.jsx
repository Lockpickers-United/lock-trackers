import React, {useCallback, useContext} from 'react'
import Button from '@mui/material/Button'
import FilterContext from '../context/FilterContext.jsx'
import entryName from '../util/entryName'
import LoadingContextLB from '../lockbazaarContext/LoadingContextLB.jsx'

function EntryYMALDisplay({ids}) {

    const {clearFilters, setFilters} = useContext(FilterContext)
    const {getLockLineFromId} = useContext(LoadingContextLB)

    const handleClick = useCallback(event => {
        event.preventDefault()
        event.stopPropagation()
        clearFilters()
        setFilters({'id': event.target.value})
    }, [clearFilters, setFilters])

    return (
        <React.Fragment>
            {ids.map((id, index) =>
                <Button variant='text' size='large'
                        key={index}
                        style={{
                            textTransform: 'none',
                            lineHeight: '.9rem',
                            minWidth: 40,
                            textAlign: 'left',
                        }}
                        color='primary'
                        value={id}
                        onClick={handleClick}
                >
                    {entryName(getLockLineFromId(id), 'short')}
                </Button>
            )}
        </React.Fragment>
    )
}

export default EntryYMALDisplay