import React from 'react'
import lpubeltsCopyLink from '../resources/lpubeltsCopyLinkSps.png'
import useWindowSize from '../util/useWindowSize.jsx'

function RulesInfo() {

    const {width} = useWindowSize()
    const breakSize = width <= 500
    const divFlexStyle = !breakSize ? {display: 'flex', margin: '30px 20px'} : {}
    const liStyle = {marginBottom: '5px'}

    return (
        <div style={{
            maxWidth: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: 0,
            marginBottom: 16
        }}>
            <div style={{fontSize: '0.9rem', lineHeight: '1.3rem', marginRight: 30}}>
                <ul>
                    <li style={liStyle}>You need to sign in and create a profile in order to submit a time.</li>
                    <li style={liStyle}>Only locks listed on <a href='https://lpubelts.com' target='_blank'
                                                                rel='noopener noreferrer'>LPUbelts.com</a> are eligible for speed
                        pick entries.
                    </li>
                    <li style={liStyle}>Each submission must be accompanied by a video clearly showing the entire
                        pick in one
                        take, following the same video rules for each lock as described in the <a
                            href='https://lpubelts.com/#/info' target='_blank'
                            rel='noopener noreferrer'>LPU belt requirements</a>:
                        <blockquote>
                            Ensure clarity and proper light showing all parts of the lock during gutting process
                            (The lock can be fully gutted and a zoom in after to show parts is acceptable).
                            Please avoid using the Shorts format on YouTube, it does not allow for rewinding to
                            see anything that was missed without watching the whole video over ...
                            Your video proof must show the lock picked and gutted in one continuous shot with no cuts.
                            The video should be clear, well lit, and the lock should stay in frame at all times.
                        </blockquote>
                    </li>
                    <li style={liStyle}>Locks that can be gutted must be gutted in the same take to clearly show the
                        pins and
                        components.
                    </li>
                    <li style={liStyle}>The lock you pick is indicated by pasting the LPUbelts URL into the New
                        Entry form. See below for more details.
                    </li>
                    <li style={liStyle}>The start time you indicate should be the time the pick enters the lock.
                    </li>
                    <li style={liStyle}>After submitting, your entry will not be displayed to other users until a
                        mod approves
                        the entry. Please be patient, it may take a day or two for your entry to be reviewed.
                    </li>
                    <li style={liStyle}>While not required, we recommend adding your discord or reddit username to
                        your profile
                        in case mods need to contact you about your submission.
                    </li>
                </ul>
                <hr style={{margin: '30px 0px 30px 20px'}}/>
            </div>
            <div style={{margin: '30px 0px 30px 40px', fontWeight: 400, fontSize: '1.2rem'}}>About LPUbelts lock links
            </div>
            <div style={divFlexStyle}>
                <div style={{fontSize: '0.9rem', lineHeight: '1.3rem', marginLeft: 20, marginBottom:20}}>

                    We use the lpubelts URL to determine the lock being submitted.<br/><br/>

                    The easiest way to get the URL is to click the Copy Link icon at the bottom right of any
                    lock entry.<br/><br/>

                    You can also copy the link from your browser window when looking at a specific lock.
                    We use the information in the URL -- specifically the element &lsquo;id=XXXXXXXX&rsquo; --
                    to match your submission to its corresponding lock
                </div>
                <div style={{marginLeft: 20}}>
                    <img alt='LPU' src={lpubeltsCopyLink} width={200}/>
                </div>
            </div>
        </div>
    )
}

export default RulesInfo