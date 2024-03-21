import React from 'react'
import EntryCommentDisplay from './EntryCommentDisplay.jsx'

const EntryComments = ({entry}) => {

    return (
        <React.Fragment>
            <div style={{
                textOverflow: 'ellipsis',
                margin: '15px 0px 36px 28px',
                fontSize: '1rem',
                lineHeight: '1.3rem'
            }}>
                {entry.comments?.map((comment, index) =>
                    <EntryCommentDisplay key={index} comment={comment}/>
                )}
            </div>
        </React.Fragment>
    )

}

export default EntryComments