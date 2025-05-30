import React from 'react'
import StarRating from '../misc/StarRating.jsx'
import DisplayTable from '../misc/DisplayTable.jsx'

export default function RatingTable({
                                        ratingDimensions, ratings, onRatingChange = () => {
    },
                                        size,
                                        readonly = false,
                                        fontSize = '1.0rem',
                                        paddingData = 5,
                                        backgroundColor
                                    }) {

    const columns = [
        {id: 'ratingArea', align: 'right', name: 'Area'},
        {id: 'rating', align: 'left', name: 'Your Rating'}
    ]
    const rows = Object.keys(ratingDimensions).map(key => {
        return {
            ratingArea: ratingDimensions[key] || key,
            rating: <StarRating ratings={ratings} onChange={onRatingChange} emptyColor='#777' dimension={key}
                                readonly={readonly} size={size} fontSize={fontSize}/>
        }
    })
    const tableData = {columns: columns, data: rows}

    return (
        <DisplayTable tableData={tableData} showHeader={false} alternateRows={false}
                      colorData={'#ddd'} fontSize={fontSize} fontWeightData={500}
                      paddingData={paddingData} backgroundColor={backgroundColor}/>

    )
}