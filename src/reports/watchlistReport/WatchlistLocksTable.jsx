import React from 'react'
import AdminStatsTable from '../AdminStatsTable'
import useWindowSize from '../../util/useWindowSize'

const WatchlistLocksTable = ({data}) => {
    const {allLockSaves} = data

    allLockSaves.data = allLockSaves.data.filter(lock => (lock.rank < 51))

    const {width} = useWindowSize()
    const mobile360 = width <= 360
    const mobile395 = width <= 395
    const mobile428 = width <= 428  // but test also at 412
    const window560 = width <= 560
    const window820 = width <= 820

    const fontSize = mobile360 ? '.8rem'
        : mobile395 ? '.85rem'
            : mobile428 ? '.9rem'
                : window560 ? '.95rem'
                    : window820 ? '.95rem'
                        : '.95rem'

    const tableWidth = '100%'

    return (
        <AdminStatsTable tableData={allLockSaves} tableWidth={tableWidth} fontSize={fontSize} wrap={true}/>
    )
}

export default WatchlistLocksTable
