import React from 'react'
import StarRating from '../misc/StarRating.jsx'
import DisplayTable from '../misc/DisplayTable.jsx'
import ratingDimensions from '../data/clRatingDimensions.json'

export default function RatingTable({
                                        ratings,
                                        onRatingChange = () => {
                                        },
                                        size,
                                        allowFraction = false,
                                        readonly = false,
                                        fontSize = '1.0rem',
                                        paddingData = 5,
                                        backgroundColor,
                                        fillColor,
                                        emptyColor = '#777',
                                        fontWeight = 500
                                    }) {


    const columns = [
        {id: 'ratingArea', align: 'right', name: 'Area'},
        {id: 'rating', align: 'left', name: 'Your Rating'}
    ]
    const rows = Object.keys(ratingDimensions).map(key => {
        return {
            ratingArea: ratingDimensions[key] || key,
            rating: <StarRating ratings={ratings} onChange={onRatingChange} dimension={key}
                                readonly={readonly} size={size} fontSize={fontSize} allowFraction={allowFraction}
                                fillColor={fillColor} emptyColor={emptyColor} style={{marginLeft: 5, marginTop: 4}}
            />
        }
    })
    const tableData = {columns: columns, data: rows}

    return (
        <DisplayTable tableData={tableData} showHeader={false} alternateRows={false}
                      colorData={'#ddd'} fontSize={fontSize} fontWeightData={fontWeight}
                      paddingData={paddingData} backgroundColor={backgroundColor}/>

    )
}