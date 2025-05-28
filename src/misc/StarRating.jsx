import React, {useCallback} from 'react'
import {Rating} from 'react-simple-star-rating'

export default function StarRating({ratings, dimension, onChange, size = 20}) {

    const handleRating = useCallback((rate) => {
        onChange({rating: rate, dimension: dimension})
    },[dimension, onChange])

    return (
        <div style={{display: 'flex', placeItems: 'center', marginTop:4}}>
            <Rating
                onClick={handleRating}
                size={size}
                initialValue={ratings[dimension]}
                ratingValue={ratings[dimension]}
            />
        </div>
    )
}