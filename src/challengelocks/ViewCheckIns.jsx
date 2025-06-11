import React, {useCallback, useContext} from 'react'
import useWindowSize from '../util/useWindowSize.jsx'
import DataContext from '../context/DataContext.jsx'
import ChoiceButtonGroup from '../util/ChoiceButtonGroup.jsx'
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

export default function ViewCheckIns({user}) {

    const {authLoaded} = useContext(AuthContext)
    const {checkInsLoaded} = useContext(DBContext)
    const {allCheckIns, visibleEntries} = useContext(DataContext)
    const navigate = useNavigate()

    console.log('ViewCheckIns', checkInsLoaded, allCheckIns, visibleEntries)

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
            <ChoiceButtonGroup options={optionsCL} onChange={handleChange} defaultValue={optionsCL[2].label}/>

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
                            fontSize: '1.4rem', lineHeight:'1.8rem', fontWeight: 700
                        }}>
                            You must be logged in to view your check-ins.<br/><br/>
                            <div style={{width: 210, marginLeft: 'auto', marginRight: 'auto'}}>
                                <SignInButton/>
                            </div>
                        </div>
                    </Dialog>


                    {visibleEntries.map((checkIn) => (
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

        </React.Fragment>
    )
}