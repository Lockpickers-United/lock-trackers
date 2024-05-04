import React, {useContext} from 'react'
import ListingDetailsRow from './ListingDetailsRow.jsx'
import WatchlistButton from './WatchlistButton.jsx'
import DataContext from '../app/DataContext.jsx'
import EntryYMALDisplay from './EntryYMALDisplay.jsx'
import dayjs from 'dayjs'

const EntryDetailsLB = ({entry, listings, sellerView}) => {

    const {allGroupedIds} = useContext(DataContext)
    const parentId = entry.id.replace(/(\w+)-*.*/, '$1')
    const otherIds = allGroupedIds[parentId].filter(x => x !== entry.id)
    const hasListings = !!entry.listings

    const newListingsDate = dayjs(entry.newListingsDate).format('MM/DD/YY')

    const margin = sellerView
        ? '0px 0px 0px 40px'
        : '0px 0px 0px 15px'

    return (
        <React.Fragment>
            {(entry?.isLPUbeltsLock && !sellerView) &&
                <div style={{
                    textAlign: 'center',
                    marginBottom: 8,
                    marginLeft: 15,
                    width: '100%',
                    fontSize: '.9rem',
                    display: 'flex'
                }}>
                    <WatchlistButton id={entry.id} fontSize='small'/>
                    <div style={{
                        textAlign: 'right',
                        marginTop: 10,
                        marginRight: 15,
                        width: '100%',
                        fontSize: '.9rem',
                    }}>
                        New listings {newListingsDate}</div>
                </div>
            }
            {listings.map((listing, index) =>
                <div key={index} style={{
                    textOverflow: 'ellipsis',
                    margin: margin,
                    fontSize: '1rem',
                    lineHeight: '1.3rem',
                    alignItems: 'left'
                }}>
                    <ListingDetailsRow listing={listing} sellerView={sellerView}/>
                </div>
            )}
            {(otherIds.length > 0 && hasListings) &&
                <div style={{marginBottom: 10, marginTop: 10, borderTop: '1px solid #444'}}>
                    <EntryYMALDisplay otherIds={otherIds}/>
                </div>
            }
            {!sellerView &&
                <div style={{borderTop: '1px solid #444', margin: '0px 0px 0px 15px'}}/>
            }
        </React.Fragment>
    )
}

export default EntryDetailsLB