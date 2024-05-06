import React, {useContext} from 'react'
import useWindowSize from '../util/useWindowSize.jsx'
import SignInButton from '../auth/SignInButton'
import AuthContext from '../app/AuthContext.jsx'
import ImportGetURL from './ImportGetURL.jsx'

function LockBazaarMain() {
    const {isLoggedIn} = useContext(AuthContext)

    const {width} = useWindowSize()
    const smallWindow = width <= 560
    const pagePadding = !smallWindow
        ? '8px 24px 32px 24px'
        : '8px 8px 32px 8px'

    return (
        <div style={{
            minWidth: '320px', maxWidth: 720, height: '100%',
            padding: pagePadding, backgroundColor: '#223',
            marginLeft: 'auto', marginRight: 'auto',
            fontSize: '1.5rem', lineHeight: 0.8, textAlign: 'center'
        }}>

            <div style={{fontSize: '1rem', lineHeight:'1.2rem', fontWeight: 400, marginBottom: 30, marginTop: 20, textAlign: 'left'}}>
                <div style={{fontSize: '1.2rem', fontWeight: 600, marginBottom:15}}>Import LPUbelts Wishlist</div>
                New! You can now import your Wishlist from LPUbelts.com.
                We use the LPUbelts URL to look up the details.
                The easiest way to get the URL is to click the Copy Link icon at the top right
                of your <a href='https://lpubelts.com/#/profile/view' target='_blank'
                           rel='noopener noreferrer'>View Profile page on LPUbelts.com</a>.
            </div>

            {(!isLoggedIn) &&
                <div style={{
                    fontSize: '1rem',
                    lineHeight: '1.2rem',
                    textAlign: 'left',
                    marginTop: 15,
                    marginBottom: 20,
                    display: 'flex'
                }}>
                    <div style={{marginTop: 9, marginRight: 15}}>You need to be signed in order to add items to a
                        watchlist.
                    </div>
                    <div style={{fontSize: '1rem', width: 200}}><SignInButton/></div>
                </div>
            }

            <ImportGetURL/>

        </div>
    )
}

export default LockBazaarMain
