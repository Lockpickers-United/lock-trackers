import React from 'react'
import AdminStatsTable from '../AdminStatsTable'
import useWindowSize from '../../util/useWindowSize'
import dayjs from 'dayjs'

const WatchlistDailyTable = ({data}) => {
    const {dailyTableData} = data

    dailyTableData.data = dailyTableData.data.filter(dayData =>
        (dayjs(dayData.date).isAfter(dayjs().subtract(28, 'day')))
    )


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
        <AdminStatsTable tableData={dailyTableData} tableWidth={tableWidth} fontSize={fontSize}/>
    )
}

export default WatchlistDailyTable
