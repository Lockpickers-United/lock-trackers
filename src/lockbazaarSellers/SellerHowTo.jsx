import React from 'react'
import useWindowSize from '../util/useWindowSize.jsx'

function SellerHowTo() {

    const {width} = useWindowSize()
    const smallWindow = width <= 560
    const pagePadding = !smallWindow
        ? '24px 24px 32px 24px'
        : '8px 8px 32px 8px'

    return (
        <div style={{
            minWidth: '320px', maxWidth: 700, height: '100%',
            padding: pagePadding, backgroundColor: '#223',
            marginLeft: 'auto', marginRight: 'auto',
            fontSize: '1.5rem', lineHeight: 0.8, textAlign: 'center'
        }}>

            <div style={{textAlign: 'left', fontSize: '1rem', lineHeight: '1.3rem'}}>
                Any established seller can be listed on the site and there are no fees of any kind involved.
                In order to be listed on the site:<p/>

                <ol type='1'>
                    <li style={{marginBottom: 10}}>
                        Contact <b>mgsecure </b> on discord to start the process. Please provide a link to your sheet
                        posting in #lock-bazaar-forum on the LPU discord
                    </li>

                    <li style={{marginBottom: 10}}>
                        Update your sheet to match the standard columns A through M. Please reference
                        our <b><a
                        href={'https://docs.google.com/spreadsheets/d/1s7lAzU4uuPBesteNVocK9rD7F5UYDrQOgh4hDiP6QXw/edit#gid=0'}
                        target='_blank'
                        rel='noopener noreferrer'>example
                        spreadsheet</a></b>

                        <ul style={{listStyleType: 'disc'}}>
                            <li style={{marginTop: 5}}>Only listings with a quantity of 1 or more are displayed on the
                                site.
                                Only listings linked to a specific lock on lpubelts.com will have their belt ranking
                                shown.
                            </li>
                            <li style={{marginTop: 5}}>For listings that match a specific lock on lpubelts.com:
                                the site will pull the Belt, Make, Model, Version, and Locking Mechanisms
                                from the lpubelts.com data. This information is automatically updated, so if a lock
                                changes ranking,
                                your listing will too.
                            </li>
                            <li style={{marginTop: 5}}>Matching to an lpubelts lock is done by supplying
                                a valid URL to the lock details on lpubelts.com in the &#34;LPUbelts URL&#34; column.
                            </li>
                            <li style={{marginTop: 5}}>For locks that are part of a sameline entry containing multiple locks, the &#34;Sameline #&#34; column
                                column should contain a number indicating which lock in the group you are selling.
                                So if you are selling a Medeco Biaxial, you&#39;d look
                                at the <b><a
                                    href={'https://lpubelts.com/#/locks?id=826c31e0&name=Medeco_Original_Biaxial_M3&tab=Purple'}
                                    target='_blank'
                                    rel='noopener noreferrer'>lpubelts
                                    samelined entry</a></b> and indicate which lock it is, in this
                                case <b>&#34;2&#34;</b>
                            </li>
                            <li style={{marginTop: 5}}>For listings of other locks: the site will display the information in your sheet, with the exception of belt ranking.
                            </li>
                            <li style={{marginTop: 5}}>Unused columns can be blank or hidden, but the site will look for
                                data
                                there so please
                                make sure they
                                are
                                in your sheet and empty even if you don&#39;t intend to use them.
                            </li>
                        </ul>
                    </li>

                    <li style={{marginBottom: 10}}>
                        Sign up and create a profile with username at <a
                        href={'https://lpulocks.com/#/profile/edit'}>
                        https://lpulocks.com/#/profile/edit
                    </a>
                    </li>

                </ol>

                Once that&#39;s done we will enable you as a seller behind the scenes and there will be some other
                profile
                info you can fill out, including the area(s) you ship to. We&#39;re here to help if you have any
                questions!

            </div>
        </div>

    )

}

export default SellerHowTo