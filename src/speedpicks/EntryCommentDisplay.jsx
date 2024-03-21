import React from 'react'

const EntryCommentDisplay = ({comment}) => {

    const [user, commentText] = comment.split(':')

    const isMod = user === 'Mod'

    const bubbleStyle = isMod
        ? {width: '100%', marginBottom: 10}
        : {width: '100%', marginBottom: 10, alignItems: 'right', marginRight: 20}

    const commentStyle = isMod
        ? {width: '80%', border: '1px solid #666', borderRadius: 5, padding: 6}
        : {width: '80%', border: '1px solid #666', borderRadius: 5, padding: 6, marginLeft: 'auto', marginRight: 20}

    const commentLabel = isMod
        ? <span style={{color: '#E15C07FF'}}>Mod: </span>
        : <span style={{color: '#5c67df'}}>{user}: </span>

    return (
        <React.Fragment>
            <div style={bubbleStyle}>
                <div style={commentStyle}>
                    {commentLabel} {commentText}
                </div>
            </div>

        </React.Fragment>
    )
}

export default EntryCommentDisplay