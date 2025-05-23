import React, {useContext} from 'react'
import useWindowSize from '../util/useWindowSize.jsx'
import LoadingContextLB from '../lockbazaarContext/LoadingContextLB.jsx'
import RaflSellerProfileInline from './RaflSellerProfileInline.jsx'
import ReactMarkdown from 'react-markdown'
import rehypeExternalLinks from 'rehype-external-links'
import RaflInfo from './RaflInfo.md?raw'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import {useNavigate} from 'react-router-dom'

function RaflPage() {

    const navigate = useNavigate()
    const {validListings, sellerProfiles} = useContext(LoadingContextLB)

    const sellerFirstListings = sellerProfiles
        ? sellerProfiles
            .filter(profile => profile.raflSeller)
            .map((profile) => {
                return validListings?.find(({sellerName}) => sellerName === profile.username)
            })
            .sort((a, b) => {
                return a.sellerName.localeCompare(b.sellerName)
            })
            .filter(x => x)
        : []

    const {width} = useWindowSize()
    const smallWindow = width <= 560
    const pagePadding = !smallWindow
        ? '24px 24px 32px 24px'
        : '8px 8px 32px 8px'

    return (
        <React.Fragment>
            <div style={{
                minWidth: '320px', maxWidth: 700, height: '100%',
                padding: pagePadding, backgroundColor: '#223',
                marginLeft: 'auto', marginRight: 'auto',
                fontSize: '1rem', lineHeight: '1.3rem'
            }}>

                <Box style={{textAlign: 'left', marginBottom: '10px'}} sx={{
                    'li': {
                        lineHeight: '1.3rem',
                        marginTop: '6px'
                    }
                }}>
                    <ReactMarkdown rehypePlugins={[[rehypeExternalLinks, {target: '_blank'}]]}>
                        {`${RaflInfo}`}
                    </ReactMarkdown>

                    <Link onClick={() => navigate('/lockbazaar?giftCertificates=RAFL')} style={{fontWeight:700}}>Click here</Link> for
                    a list of all items available from Gift Certificate sellers.
                </Box>

                <div style={{
                    borderBottom: '1px solid #666', fontSize:'1.5rem', fontWeight:700, padding:'30px 0px'
                }}>
                    Gift Certficates Accepted By
                </div>
                {sellerFirstListings.map((listing, index) =>
                    <RaflSellerProfileInline listing={listing} key={index} raflView={true} handleClose={() => {
                    }}/>
                )}
            </div>
        </React.Fragment>
    )
}

export default RaflPage
