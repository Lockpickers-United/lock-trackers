import React, {useCallback, useEffect, useRef, useState} from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import queryString from 'query-string'
import Tracker from '../app/Tracker.jsx'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import useWindowSize from '../util/useWindowSize.jsx'
import OpenYouTubeLinkButton from './OpenYouTubeLinkButton.jsx'
import ChannelStats from './ChannelStats.jsx'

const Channel = ({channel, expanded, onExpand}) => {

    const descriptionLines = channel.description.split('\n')

    const expandColor = channel.description ? '#aaa' : '#444'

    const [scrolled, setScrolled] = useState(false)
    const ref = useRef(null)

    const handleChange = useCallback((_, isExpanded) => {
        onExpand && onExpand(isExpanded ? channel.id : false)
    }, [channel.id, onExpand])

    useEffect(() => {
        if (expanded && ref && !scrolled) {
            const isMobile = window.innerWidth <= 600
            const offset = isMobile ? 70 : 74
            const {id} = queryString.parse(location.search)
            const isIdFiltered = id === channel.id

            setScrolled(true)

            setTimeout(() => {
                window.scrollTo({
                    left: 0,
                    top: ref.current.offsetTop - offset,
                    behavior: isIdFiltered ? 'auto' : 'smooth'
                })
            }, isIdFiltered ? 0 : 100)
        } else if (!expanded) {
            setScrolled(false)
        }
    }, [expanded, scrolled, channel.id])

    const style = {
        maxWidth: 700,
        marginLeft: 'auto',
        marginRight: 'auto',
        borderBottom: '1px solid #444',
        textAlign: 'left'
    }

    const {width} = useWindowSize()
    const smallWindow = width <= 480

    return (
        <Accordion expanded={expanded} onChange={handleChange} style={style} ref={ref} disableGutters={false}>
            <AccordionSummary expandIcon={<ExpandMoreIcon style={{color: expandColor}}/>}
                              sx={{
                                  '& .MuiAccordionSummary-content': {
                                      display: 'block'
                                  }
                              }}>

                {!smallWindow &&
                    <div style={{display: 'flex', margin: '10px 0px', placeItems:'center'}}>
                        <div style={{height: 50, marginRight: 10}}>
                            <img src={channel.thumbnail} alt={channel.title} height='50' width='50'
                                 style={{borderRadius: '50%', overflow: 'hidden', fontSize: '.7rem'}}/>
                        </div>
                        <div style={{display: 'flex', width: '85%'}}>
                            <div style={{
                                margin: '12px 0px 8px 8px',
                                width: '45%',
                                flexShrink: 0,
                                flexDirection: 'column',
                                fontSize: '1.1rem', fontWeight: 600
                            }}>
                                {channel.title}
                            </div>
                            <ChannelStats channel={channel}/>
                        </div>
                        <div style={{marginTop: 0, marginRight: 10}}>
                            <OpenYouTubeLinkButton channel={channel} fontSize={'small'}/>
                        </div>
                    </div>
                }

                {smallWindow &&
                    <div style={{margin: '10px 0px'}}>
                        <div style={{display: 'flex', width: '65%', marginBottom: 20, placeItems:'center'}}>
                            <div style={{height: 50, marginRight: 10}}>
                                <img src={channel.thumbnail} alt={channel.title} height='50' width='50'
                                     style={{borderRadius: '50%', overflow: 'hidden', fontSize: '.7rem'}}/>
                            </div>
                            <div style={{
                                margin: '0px 0px 0px 8px',
                                width: '95%',
                                flexShrink: 0,
                                flexDirection: 'column',
                                fontSize: '1.1rem', fontWeight: 600
                            }}>
                                {channel.title}
                            </div>
                            <div style={{marginTop: 0, marginRight: 10}}>
                                <OpenYouTubeLinkButton channel={channel} fontSize={'small'}/>
                            </div>
                        </div>
                        <div style={{marginLeft: 10}}>
                            <ChannelStats channel={channel}/>
                        </div>
                    </div>
                }

            </AccordionSummary>
            {
                expanded &&
                <React.Fragment>
                    <AccordionDetails>
                        {channel.description &&
                            descriptionLines.map((line, index) =>
                                <div key={index} style={{marginLeft: 25}}>
                                    {line}<br/>
                                </div>
                            )
                        }
                        {!channel.description &&
                            <div style={{width: '100%', textAlign: 'center', marginBottom: 10, fontStyle: 'italic'}}>
                                no channel details available<br/>
                            </div>

                        }
                        <Tracker feature='channel' id={channel.id} title={channel.title}/>
                    </AccordionDetails>
                </React.Fragment>
            }
        </Accordion>
    )
}

export default Channel
