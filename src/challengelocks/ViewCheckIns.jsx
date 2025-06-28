import React, {useCallback, useContext, useEffect} from 'react'
import useWindowSize from '../util/useWindowSize.jsx'
import DataContext from '../context/DataContext.jsx'
import SubNav from '../nav/SubNav.jsx'
import {useNavigate} from 'react-router-dom'
import SortFilterBar from './SortFilterBar.jsx'
import SortButtonCheckIns from './SortButtonCheckIns.jsx'
import {optionsCL} from '../data/subNavOptions.js'
import AdminActionsButtonCheckIns from './AdminActionsButtonCheckIns.jsx'
import NoEntriesCardCL from './NoEntriesCardCL.jsx'
import ChallengeLockCheckInDisplay from './ChallengeLockCheckInDisplay.jsx'
import Button from '@mui/material/Button'
import DBContext from '../app/DBContext.jsx'
import Fade from '@mui/material/Fade'
import SignInButton from '../auth/SignInButton.jsx'
import AuthContext from '../app/AuthContext.jsx'
import Dialog from '@mui/material/Dialog'
import ExportCheckInsButton from './ExportCheckInsButton.jsx'
import sampleEntries from './checkInSampleData.json'
import FilterContext from '../context/FilterContext.jsx'
import removeAccents from 'remove-accents'

export default function ViewCheckIns({user}) {

    const {authLoaded} = useContext(AuthContext)
    const {checkInsLoaded} = useContext(DBContext)
    const {allCheckIns, visibleEntries} = useContext(DataContext)

    const {filters, addFilters} = useContext(FilterContext)
    const {id} = filters
    const {getProfile} = useContext(DBContext)

    // NT jC4XyU3KaKM7wCPkHQgulralMEE3
    // Engineer  cm8oFWt2fBPTYdyhqnjBMsHlfNy1

    useEffect(() => {
        if (!id) return
        async function fetchData() {
            return await getProfile(id)
        }
        fetchData().then(idProfile => {
            const name = idProfile?.discordUsername || idProfile?.displayName || idProfile?.redditUsername
            const safename = name ? removeAccents(name).replace(/[^a-zA-Z0-9 ]/g, '').trim() : undefined
            addFilters([{key: 'name', value: safename}], true)
        })
    }, [addFilters, filters, getProfile, id, user])


    const displayEntries = authLoaded && user
        ? visibleEntries
        : sampleEntries

    const navigate = useNavigate()

    const style = {
        maxWidth: 700,
        marginLeft: 'auto',
        marginRight: 'auto',
        borderBottom: '1px solid #444',
        textAlign: 'left',
        backgroundColor: '#333',
        paddingTop: 10
    }

    const {width} = useWindowSize()
    const smallWindow = width <= 560
    const pagePadding = !smallWindow
        ? '24px 24px 32px 24px'
        : '8px 8px 32px 8px'

    const handleChange = useCallback(newValue => {
        navigate(newValue.page)
    }, [navigate])

    const navSortButton = <SortButtonCheckIns/>
    const navAdminButton = <AdminActionsButtonCheckIns/>

    return (
        <React.Fragment>
            <SubNav options={optionsCL} onChange={handleChange} defaultValue={optionsCL[2].label}/>

            <div style={{
                minWidth: 330, maxWidth: 720, height: '100%',
                padding: pagePadding, backgroundColor: '#223',
                marginLeft: 'auto', marginRight: 'auto',
                fontSize: '1.5rem', lineHeight: 0.8, textAlign: 'center'
            }}>
                <SortFilterBar label='Check-ins' sortButton={navSortButton} adminButtons={navAdminButton}/>

                {(checkInsLoaded && allCheckIns?.length > 0 && visibleEntries?.length === 0) &&
                    <NoEntriesCardCL entryType={'check-ins'}/>
                }

                <div style={style}>
                    {checkInsLoaded && allCheckIns?.length === 0 &&
                        <Fade in={checkInsLoaded && allCheckIns?.length === 0} timeout={2000}>
                            <div style={{textAlign: 'center', padding: 20}}>
                                No check-ins found.<br/><br/>
                                <div style={{fontSize: '1.0rem', marginBottom: 25}}>You don&#39;t have any check-ins
                                    yet!
                                </div>
                                <div style={{fontSize: '1.0rem'}}>
                                    <Button variant='contained' size='small'
                                            onClick={() => navigate('/challengelocks')}>
                                        Browse Challenge Locks
                                    </Button>
                                </div>
                            </div>
                        </Fade>
                    }

                    <Dialog open={authLoaded && !user}
                            componentsProps={{backdrop: {style: {backgroundColor: '#000', opacity: 0.6}}}}>
                        <div style={{
                            width: '350px', textAlign: 'center',
                            padding: 50, marginTop: 0, backgroundColor: '#333',
                            marginLeft: 'auto', marginRight: 'auto',
                            fontSize: '1.4rem', lineHeight: '1.8rem', fontWeight: 700
                        }}>
                            You must be logged in to view your check-ins.<br/><br/>
                            <div style={{width: 210, marginLeft: 'auto', marginRight: 'auto'}}>
                                <SignInButton/>
                            </div>
                            <div style={{marginTop: 30, fontSize: '1.0rem'}}>
                                <Button variant='text' size='small'
                                        onClick={() => navigate('/challengelocks')}>
                                    Browse Challenge Locks
                                </Button>
                            </div>
                        </div>
                    </Dialog>


                    {displayEntries.map((checkIn) => (
                        <ChallengeLockCheckInDisplay
                            key={checkIn.id}
                            checkIn={checkIn}
                            refreshCheckIns={() => {
                            }}
                            viewRoute={true}
                        />
                    ))}
                </div>
            </div>

            {visibleEntries?.length > 0 &&
                <div style={{margin: '20px auto 40px auto', textAlign: 'center'}}>
                    <ExportCheckInsButton text={true} entries={visibleEntries}/>
                </div>
            }

        </React.Fragment>
    )
}