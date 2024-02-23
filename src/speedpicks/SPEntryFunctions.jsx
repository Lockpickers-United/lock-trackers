import React, {useCallback, useContext} from 'react'
import Button from '@mui/material/Button'
import SPDataContext from './SPDataContext.jsx'

const SPEntryFunctions = ({entry, startEdit, entriesUpdate}) => {

    const {DCUpdate, isMod = []} = useContext(SPDataContext)

    const toggleApprove = useCallback(() => {
        entry.approved = !entry.approved
        console.log(entry.approved)
        DCUpdate(Math.random())
        entriesUpdate(Math.random())
    }, [DCUpdate, entriesUpdate, entry])

    const status = entry.approved ? 'APPROVED' : 'PENDING'
    const statusColor = entry.approved ? '#fff' : '#ca6060'
    const functionColor = entry.approved ? '#ca6060' : '#0a0'
    const statusString = `ENTRY IS ${status}:`

    return (

        <div style={{
            width: '100%',
            textAlign: 'right',
            padding: '0px 12px 8px 0px'
        }}>
            <Button disabled style={{color: statusColor, fontWeight: 600}}>{statusString}</Button>
            <Button style={{color: '#ccc'}} onClick={startEdit}>Edit</Button>
            {(entry.approved && isMod) &&
                <Button style={{marginRight: 10, color: functionColor}} onClick={toggleApprove}>Pend</Button>
            }
            {(!entry.approved && isMod) &&
                <Button style={{marginRight: 10, color: functionColor}} onClick={toggleApprove}>Approve</Button>
            }
        </div>
    )
}

export default SPEntryFunctions