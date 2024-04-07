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
                Any established seller can be listed on the site and there are no fees of any kind involved. Please note
                that only listings which directly correspond to an entry on lpubelts.com are currently shown
                on locktrackers but you can list any other locks in your sheet. Listings without an LPUbelts URL (see
                below) will be ignored.<p/>
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

                        <ul style={{ listStyleType :'disc'}}>
                            <li style={{marginTop: 5}}>Only listings with a quantity of 1 or more are displayed on the
                                site.
                            </li>
                            <li style={{marginTop: 5}}>The LPUbelts URL is a link to the lock details on lpubelts.com
                                and is
                                required.
                            </li>
                            <li style={{marginTop: 5}}>The &#34;Sameline #&#34; column is for locks that are part of a
                                sameline
                                entry containing
                                multiple locks. The
                                number indicates which lock in the group you are selling. So if you are selling a Medeco
                                Biaxial, you&#39;d look
                                at the <b><a
                                    href={'https://lpubelts.com/#/locks?id=826c31e0&name=Medeco_Original_Biaxial_M3&tab=Purple'}
                                    target='_blank'
                                    rel='noopener noreferrer'>lpubelts
                                    samelined entry</a></b> and indicate which lock it is, in this case <b>&#34;2&#34;</b>
                            </li>
                            <li style={{marginTop: 5}}>The site will pull the Make, Model, and Version from the
                                lpubelts.com
                                data.
                            </li>
                            <li style={{marginTop: 5}}>Other columns can be blank or hidden, but the site will look for
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
                        href={'https://beta.locktrackers.com/#/profile/edit'}>
                        https://beta.locktrackers.com/#/profile/edit
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