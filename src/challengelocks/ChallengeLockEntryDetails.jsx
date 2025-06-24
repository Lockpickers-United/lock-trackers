import React, {useCallback, useContext, useState} from 'react'
import ChallengeLockImageGallery from './ChallengeLockImageGallery.jsx'
import FieldValue from '../util/FieldValue.jsx'
import useWindowSize from '../util/useWindowSize.jsx'
import Button from '@mui/material/Button'
import DataContext from '../context/DataContext.jsx'
import {useNavigate} from 'react-router-dom'
import ChallengeLockCheckInDisplay from './ChallengeLockCheckInDisplay.jsx'
import sanitizeValues from '../util/sanitizeValues.js'
import Collapse from '@mui/material/Collapse'
import LoadingDisplayWhite from '../misc/LoadingDisplayWhite.jsx'
import RatingTable from './RatingTable.jsx'
import AdminActionsBar from './AdminActionsBar.jsx'
import ProblemsDisplay from './ProblemsDisplay.jsx'
import {internationalDate} from '../util/formatTime.js'
import FilterContext from '../context/FilterContext.jsx'

const ChallengeLockEntryDetails = ({entry, onExpand, refreshCheckIns, checkIns, setCheckIns}) => {
    if (!entry) return null

    const {adminEnabled} = useContext(DataContext)
    const {filters: allFilters} = useContext(FilterContext)
    const {sort} = allFilters

    const {latestUpdate} = entry
    const [showCheckIns, setShowCheckIns] = useState(false)
    const [loading, setLoading] = useState(false)

    const buttonText = showCheckIns ? 'Hide Check-ins' : 'View All Check-ins'

    const handleCheckInsClick = useCallback(async () => {
        if (!entry.id) {
            setCheckIns([])
            return
        }
        if (checkIns.length > 0) {
            setShowCheckIns(!showCheckIns)
            return
        }
        setLoading(true)
        try {
            await refreshCheckIns()
        } catch (err) {
            console.error('Error fetching check-ins', err)
            setCheckIns([])
        } finally {
            setLoading(false)
            setShowCheckIns(true)
        }
    }, [checkIns.length, entry.id, refreshCheckIns, setCheckIns, showCheckIns])

    const handleChange = useCallback((_, isExpanded) => {
        onExpand && onExpand(isExpanded ? entry.id : false)
    }, [entry.id, onExpand])

    const dateCreated = entry.lockCreatedAt
    const dateSubmitted = entry.dateSubmitted || entry.submittedAt || ''
    const submittedCredit = entry.maker !== entry.submittedByUsername
        ? `Submitted by ${entry.submittedByUsername}`
        : null
    const {makerData} = useContext(DataContext)
    const makerLockCount = makerData?.[entry.maker]
    const navigate = useNavigate()
    const handleMakerClick = useCallback(() => {
        handleChange()
        window.scrollTo({top: 0, behavior: 'smooth'})
        navigate(`/challengelocks?maker=${entry.maker}`)
    }, [entry.maker, handleChange, navigate])

    const aveRatings = Object.keys(entry)
        .filter(key => (key.startsWith('ratingAve')))
        .reduce((acc, key) => {
            acc[key.replace('ratingAve', '')] = entry[key]
            return acc
        }, {})

    const displayCountry = entry.displayCountry?.length > 32 ? entry.displayCountry?.substring(0, 32).trim() + '...' : entry.displayCountry
    const displayStateProvince = entry.stateProvince?.length > 32 ? entry.stateProvince?.substring(0, 32).trim() + '...' : entry.stateProvince

    const [blurred, setBlurred] = useState(entry.media?.length > 1 && !adminEnabled)
    const [showWarning, setShowWarning] = useState(blurred)
    const handleBlur = useCallback(() => {
        setBlurred(!blurred)
        setShowWarning(!blurred)
    }, [blurred])

    const {flexStyle, isMobile} = useWindowSize()
    const breakWordStyle = {wordBreak: 'break-word', inlineSize: '100%'}

    return (
        <div>
            {(adminEnabled) &&
                <React.Fragment>
                    <AdminActionsBar entry={entry}/>
                    <ProblemsDisplay entry={entry}/>
                </React.Fragment>
            }

            {(isMobile || (sort && !['maker', 'name'].includes(sort))) &&
                <div style={{
                    display: 'flex',
                    fontSize: '0.95rem',
                    lineHeight: '1.2rem',
                    fontWeight: 400,
                    marginTop: 10
                }}>
                    {entry.lockFormat &&
                        <FieldValue name='Format' value={entry.lockFormat}
                                    headerStyle={{color: '#999'}} style={{marginRight: 20}}/>
                    }
                    {entry.lockingMechanism &&
                        <FieldValue name='Locking Mechanism' value={entry.lockingMechanism}
                                    headerStyle={{color: '#999'}} style={{marginRight: 20}}/>
                    }
                </div>
            }

            {entry.media &&
                <div style={{position: 'relative', zIndex: 1}}>
                    <ChallengeLockImageGallery entry={entry} blurred={blurred}/>
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: 'rgba(0,0,0,0.0)',
                        alignContent: 'center',
                        justifyItems: 'center',
                        display: showWarning ? 'block' : 'none',
                        cursor: 'pointer'
                    }}
                         onClick={handleBlur}
                    >
                        <div style={{
                            fontSize: '1.1rem',
                            lineHeight: '1.5rem',
                            fontWeight: 600,
                            filter: 'none',
                            color: '#20397c',
                            backgroundColor: '#fff',
                            padding: 20,
                            border: '1px solid #20397c',
                            borderRadius: 5,
                            textAlign: 'center'
                        }}>
                            May contain spoilers!<br/>
                            Click to view images
                        </div>
                    </div>
                </div>
            }

            <div style={{
                display: flexStyle,
                flexWrap: 'wrap',
                fontSize: '0.95rem',
                lineHeight: '1.2rem',
                fontWeight: 400,
                marginTop: 25
            }}>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <FieldValue name='Created' value={internationalDate(dateCreated)}
                                headerStyle={{color: '#999'}} style={{marginRight: 15, whiteSpace: 'nowrap'}}/>
                    <FieldValue name='Submitted' value={internationalDate(dateSubmitted)}
                                headerStyle={{color: '#999'}} style={{marginRight: 15, whiteSpace: 'nowrap'}}/>
                </div>

                <div style={{display: 'flex', flexDirection: 'row'}}>
                    {entry.country &&
                        <FieldValue name='Country' value={displayCountry}
                                    headerStyle={{color: '#999'}}
                                    style={{marginRight: 15, whiteSpace: 'nowrap'}}/>
                    }
                    {entry.stateProvince &&
                        <FieldValue name='State/Province' value={displayStateProvince}
                                    headerStyle={{color: '#999'}}
                                    style={{marginRight: 15, whiteSpace: 'nowrap'}}/>
                    }
                </div>

                {(entry.originalMake || entry.originalLock) &&
                    <FieldValue name='Original Lock' value={entry.originalLock || entry.originalMake}
                                headerStyle={{color: '#999'}}
                                style={breakWordStyle}/>
                }
            </div>

            {sanitizeValues(entry.description) &&
                <div style={{fontSize: '0.95rem', lineHeight: '1.5rem', fontWeight: 400, marginTop: 10}}>
                    <FieldValue name='Description' value={
                        <div style={breakWordStyle}>
                            {sanitizeValues(entry.description)}
                        </div>
                    }
                                headerStyle={{color: '#999'}} style={{}}/>
                </div>
            }

            {submittedCredit &&
                <div style={{
                    fontSize: '0.9rem',
                    lineHeight: '1.1rem',
                    fontWeight: 400,
                    marginTop: 10,
                    marginRight: 20,
                    textAlign: 'right',
                    fontStyle: 'italic'
                }}>
                    {submittedCredit}
                </div>
            }

            {entry.checkInCount > 1 &&
                <div style={{
                    fontSize: '0.95rem',
                    lineHeight: '1.5rem',
                    fontWeight: 400,
                    marginTop: 10,
                    width: 330,
                    display: flexStyle,
                    alignContent: 'top'
                }}>
                    <div style={{marginRight: 40}}>
                        <FieldValue name='Check-ins' headerStyle={{color: '#999'}}
                                    style={{marginTop: 0, width: 100}}
                                    value={entry.checkInCount}/>
                        <FieldValue name='Success Rate' headerStyle={{color: '#999'}} style={{marginTop: 10}}
                                    value={percentage(entry.successCount / entry.checkInCount, 0)}/>
                    </div>
                    <div style={{marginRight: 0}}>
                        {entry.maxVotes > 1 &&
                            <FieldValue name={`Stats (${entry.maxVotes} voters)`} headerStyle={{color: '#999'}}
                                        style={{marginTop: 0}}
                                        value={<RatingTable ratings={aveRatings}
                                                            readonly={true}
                                                            size={18}
                                                            fontSize={'1rem'}
                                                            fontWeight={500}
                                                            paddingData={1}
                                                            backgroundColor={'#333'}
                                                            emptyColor={'#555'}
                                                            fillColor={'#ffb000'}
                                                            allowFraction={true}
                                        />}
                            />
                        }
                    </div>
                </div>
            }

            {latestUpdate &&
                <FieldValue name='Latest Check-in' headerStyle={{color: '#999'}} style={{marginTop: 25}} value={
                    <ChallengeLockCheckInDisplay checkIn={latestUpdate} latest={true}
                                                 refreshCheckIns={refreshCheckIns}/>
                }
                />
            }

            {entry.checkInCount > 1 &&
                <div style={{
                    fontSize: '0.95rem',
                    lineHeight: '1.5rem',
                    fontWeight: 400,
                    marginTop: 10,
                    display: 'flex',
                    justifyContent: 'center'
                }}>

                    {loading
                        ? <LoadingDisplayWhite color={'#CFCFF1'}/>
                        : <Button onClick={handleCheckInsClick} variant='outlined' size='small'
                                  style={{marginTop: 10, marginBottom: 10, textTransform: 'none'}}>
                            {buttonText}
                        </Button>
                    }
                </div>
            }

            <Collapse in={showCheckIns && checkIns.length > 0} timeout='auto'>
                <div
                    style={{display: flexStyle, borderBottom: '1px solid #aaa', margin: '20px 20px 0px 20px'}}/>
                {checkIns.filter(ci => ci?.id !== latestUpdate?.id).map((checkIn, index) => (
                    <ChallengeLockCheckInDisplay checkIn={checkIn} key={index}
                                                 refreshCheckIns={refreshCheckIns}/>
                ))}
            </Collapse>

            {makerLockCount > 1 &&
                <div style={{
                    marginTop: 10,
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'right'
                }}>
                    <Button onClick={handleMakerClick}>All locks
                        from {entry.maker} ({makerLockCount})</Button>
                </div>
            }
        </div>
    )
}

export default ChallengeLockEntryDetails

function percentage(number, digits = 1) {
    return Number(number).toLocaleString(undefined, {
        style: 'percent',
        minimumFractionDigits: digits
    })
}

