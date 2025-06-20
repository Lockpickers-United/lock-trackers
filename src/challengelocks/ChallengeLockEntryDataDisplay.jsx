import React, {useContext} from 'react'
import FilterChip from '../filters/FilterChip.jsx'
import useWindowSize from '../util/useWindowSize.jsx'
import FilterContext from '../context/FilterContext.jsx'
import {internationalDate} from '../util/formatTime.js'
import StarRating from '../misc/StarRating.jsx'

export default function ChallengeLockEntryDataDisplay({entry}) {

    const {filters: allFilters} = useContext(FilterContext)
    const {sort} = allFilters

    const {flexStyle, isMobile} = useWindowSize()

    const textDisplayStyle = {fontSize: '0.9rem', color:'#aaa', fontWeight: 400, marginRight:10}
const valueDisplayStyle = !isMobile
    ? {fontSize: '1.1rem', fontWeight:700, marginRight:10}
    : {fontSize: '1.0rem', fontWeight:700, marginRight:0}

    return (
        <React.Fragment>
            {(!sort || ['maker', 'name'].includes(sort)) && !isMobile &&
                <div style={{display: flexStyle}}>
                    <FilterChip
                        value={entry.lockFormat}
                        field='lockFormat'
                    />
                    {entry.lockingMechanism &&
                        <FilterChip
                            value={entry.lockingMechanism}
                            field='lockingMechanism'
                        />
                    }
                </div>
            }
            {['createdAsc', 'createdDesc'].includes(sort) && !!entry.lockCreatedAt &&
                <div style={valueDisplayStyle}>
                    <span style={textDisplayStyle}>
                        Date Created</span>{internationalDate(entry.lockCreatedAt)}
                </div>
            }
            {['checkInAsc', 'checkInDesc'].includes(sort) && !!entry.latestCheckIn &&
                <div style={valueDisplayStyle}>
                    <span style={textDisplayStyle}>
                        Latest Check-in</span>{internationalDate(entry.latestCheckIn)}
                </div>
            }
            {sort === 'checkInCount' && !!entry.checkInCount &&
                <div style={valueDisplayStyle}>
                    <span style={textDisplayStyle}>
                        Check-in Count</span>{entry.checkInCount}
                </div>
            }

            {sort === 'ratingAveFun' && !!entry.ratingAveFun &&
                <div style={{...valueDisplayStyle, display: 'flex'}}>
                    <div style={{...textDisplayStyle, paddingTop:8}}>Fun</div>
                    <StarRating ratings={{'rating': entry.ratingAveFun}} dimension={'rating'}
                                readonly={true} size={18} emptyColor={'#555'}/>
                </div>
            }
            {sort === 'ratingAveDifficulty' && !!entry.ratingAveDifficulty &&
                <div style={{...valueDisplayStyle, display: 'flex'}}>
                    <div style={{...textDisplayStyle, paddingTop: 8}}>Difficulty</div>
                    <StarRating ratings={{'rating': entry.ratingAveDifficulty}} dimension={'rating'}
                                readonly={true} size={18} emptyColor={'#555'}/>
                </div>
            }
            {sort === 'ratingAveCreativity' && !!entry.ratingAveCreativity &&
                <div style={{...valueDisplayStyle, display: 'flex'}}>
                    <div style={{...textDisplayStyle, paddingTop: 8}}>Creativity</div>
                    <StarRating ratings={{'rating': entry.ratingAveCreativity}} dimension={'rating'}
                                readonly={true} size={18} emptyColor={'#555'}/>
                </div>
            }
            {sort === 'ratingAveQuality' && !!entry.ratingAveQuality &&
                <div style={{...valueDisplayStyle, display: 'flex'}}>
                    <div style={{...textDisplayStyle, paddingTop: 8}}>Quality</div>
                    <StarRating ratings={{'rating': entry.ratingAveQuality}} dimension={'rating'}
                                readonly={true} size={18} emptyColor={'#555'}/>
                </div>
            }

            {sort === 'submittedAt' && !!entry.submittedAt &&
                <div style={valueDisplayStyle}>
                    <span style={textDisplayStyle}>
                        Submitted</span>{internationalDate(entry.submittedAt)}
                </div>
            }
            {sort === 'updatedAt' && !!entry.updatedAt &&
                <div style={valueDisplayStyle}>
                    <span style={textDisplayStyle}>
                        Updated</span>{internationalDate(entry.updatedAt)}
                </div>
            }
        </React.Fragment>
    )
}