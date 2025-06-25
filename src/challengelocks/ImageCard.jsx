import React from 'react'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import ForwardIcon from '@mui/icons-material/Forward'

export default function ImageCard({
                                      image = {}, index, height = 150, maxWidth = 150,
                                      mediaArrayName, handleRemove, style = {}, icon = 'remove'
                                  }) {

    return (
        <div style={style}>

            <div style={{position: 'relative', zIndex: 1}}>
                <img src={image.thumbnailUrl} alt={image.name} key={index}
                     style={{maxHeight: height, maxWidth: maxWidth}}/>
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    alignContent: 'flex-start',
                    justifyItems: 'right'
                }}
                >
                    <div style={{
                        height: 24,
                        width: 24,
                        color: '#20397c',
                        backgroundColor: '#fff',
                        border: '2px solid #fff',
                        borderRadius: 12
                    }}>
                        {icon === 'remove' &&
                            <HighlightOffIcon
                                style={{color: '#000', marginTop: -2, marginLeft: -2, cursor: 'pointer'}}
                                onClick={() => {
                                    //console.log('removing image', image.sequenceId, 'from', mediaArrayName)
                                    handleRemove(mediaArrayName, image.sequenceId)
                                }}
                            />
                        }
                        {icon === 'move' &&
                            <ForwardIcon
                                style={{color: '#000', marginTop: -2, marginLeft: -12, cursor: 'pointer'}}
                                fontSize="large"
                                onClick={() => {
                                    //console.log('removing image', image.sequenceId, 'from', mediaArrayName)
                                    handleRemove(mediaArrayName, image.sequenceId)
                                }}
                            />
                        }
                    </div>
                </div>
            </div>

        </div>
    )
}