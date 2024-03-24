import React from 'react'
import useWindowSize from '../util/useWindowSize.jsx'
import ListingDetailsRow from './ListingDetailsRow.jsx'

const EntryDetailsLB = ({entry}) => {

    const {width} = useWindowSize()
    const mobileLarge428 = width <= 428
    const divStyle = {
        fontSize: '1rem', lineHeight: '1.3rem', margin: '20px 0px 10px 0px'
    }
    const divFlexStyle = !mobileLarge428 ? {display: 'flex'} : {display: 'flex'}
    const combinedDivStyle = {
        ...divStyle,
        ...divFlexStyle
    }

    const fieldValueStyle = {marginLeft: 28, marginRight: 0, fontSize: '1rem', lineHeight: '1.9rem'}

    return (
        <React.Fragment>
            {entry.listings.map((listing, index) =>
                <div key={index} style={{
                    textOverflow: 'ellipsis',
                    margin: '0px 0px 0px 28px',
                    fontSize: '1rem',
                    lineHeight: '1.3rem',
                    display: 'flex',
                    alignItems: 'left'
                }}>
                    <ListingDetailsRow listing={listing}/>
                </div>
            )}
        </React.Fragment>
    )
}

export default EntryDetailsLB