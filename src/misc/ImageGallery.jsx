import React, {useCallback, useEffect, useState} from 'react'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import useWindowSize from '../util/useWindowSize'
import ytIcon from '../resources/yt.png'
import ImageViewer from './ImageViewer'

function ImageGallery(props) {
    const {
        columns,
        media,
        allMedia,
        initiallyOpen,
        openIndex,
        onOpenImage,
        onCloseImage,
        onBackButton,
        shareParams,
        showFullSize = true
    } = props

    const {isMobile} = useWindowSize()
    const [open, setOpen] = useState(initiallyOpen)

    const fullMedia = allMedia || media

    const handleVideoClick = useCallback(url => () => {
        return window.open(url, '_blank', 'noopener,noreferrer')
    }, [])

    const handleOpen = useCallback(sequenceId => () => {
        onOpenImage(sequenceId)
        setOpen(true)
    }, [onOpenImage])

    const handleClose = useCallback(() => {
        onCloseImage()
        setOpen(false)
    }, [onCloseImage])

    // Handle back button presses
    useEffect(() => {
        const handler = () => {
            if (onBackButton) {
                const result = onBackButton()
                return setOpen(result)
            }
            return setOpen(false)
        }
        addEventListener('hashchange', handler)
        return () => removeEventListener('hashchange', handler)
    })

    const cols = columns ?? (isMobile ? 2 : 3)

    return (
        <React.Fragment>
            {open &&
                <ImageViewer
                    media={fullMedia}
                    openIndex={openIndex}
                    onOpenImage={onOpenImage}
                    onClose={handleClose}
                    shareParams={shareParams}
                    showFullSize={showFullSize}
                />
            }
            <ImageList variant='masonry' cols={cols} sx={{}}>
                {media.map(({title, subtitle, thumbnailUrl, fullUrl, sequenceId}, index) =>
                    <ImageListItem key={index} style={{marginBottom: 4}}>
                        <img
                            src={thumbnailUrl}
                            alt={title}
                            style={{paddingBottom: subtitle ? 0 : 0, cursor: 'pointer'}}
                            onClick={handleOpen(sequenceId)}
                        />
                        {
                            fullUrl?.match(/youtube\.com/) &&
                            <img
                                src={ytIcon}
                                alt={title}
                                style={{
                                    alignItems: 'center',
                                    position: 'absolute',
                                    top: 'calc(50% - 65px)',
                                    left: 'calc(50% - 40px)',
                                    width: 80,
                                    height: 80,
                                    cursor: 'pointer'
                                }}
                                onClick={handleVideoClick(fullUrl)}
                            />
                        }
                    </ImageListItem>
                )}
            </ImageList>
        </React.Fragment>
    )
}

export default ImageGallery
