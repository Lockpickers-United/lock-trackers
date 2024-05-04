import React, {useContext} from 'react'
import entryName from '../util/entryName'
import ListItemText from '@mui/material/ListItemText'
import WatchlistButton from './WatchlistButton.jsx'
import LoadingContextLB from '../lockbazaarContext/LoadingContextLB.jsx'
import WatchlistAddAllButton from './WatchlistAddAllButton.jsx'
import BeltStripe from '../speedpicks/BeltStripe.jsx'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'

const WatchlistAddLockDetails = ({lock}) => {
    const {getLockLinesInfoFromId} = useContext(LoadingContextLB)

    const lockName = lock ? entryName(lock, 'short') : ''
    const lockVersion = lock ? lock.version : ''
    const samelines = getLockLinesInfoFromId(lock.id)

    const style = {
        maxWidth: 700,
        marginLeft: 'auto',
        marginRight: 'auto',
        borderBottom: '1px solid #444',
        textAlign: 'left'
    }

    return (

        <Accordion expanded={true} onChange={null} style={style} key={lock.id} disableGutters={true}>
            <AccordionSummary expandIcon={null}
                              sx={{
                                  '& .MuiAccordionSummary-content': {
                                      display: 'block'
                                  }
                              }}>
                <div style={{display: 'flex', placeItems: 'center', padding:'4px 0px 4px 0px'}}>
                    <BeltStripe value={lock.belt}/>

                    <div style={{margin: 0, width: '100%', textAlign: 'left'}}>
                        {lockName &&
                            <div style={{display: 'flex', placeItems: 'center', width: '100%'}}>
                                {lock.makeModels.length === 1 &&
                                    <table style={{}}>
                                        <tbody>
                                        <tr>
                                            <td>
                                                <ListItemText
                                                    primary={lockName}
                                                    primaryTypographyProps={{fontWeight: 600}}
                                                    secondary={lockVersion}
                                                    secondaryTypographyProps={{}}
                                                    style={{padding: '0px 0px 0px 10px'}}
                                                />
                                            </td>
                                            <td style={{paddingLeft: 20}}>
                                                <WatchlistButton id={lock.id} dense={true}/>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                }
                                {samelines.length > 1 &&
                                    <table style={{}}>
                                        <tbody>
                                        <tr>
                                            <td>
                                                <ListItemText
                                                    primary={lockName}
                                                    primaryTypographyProps={{fontWeight: 600}}
                                                    secondary={lockVersion}
                                                    secondaryTypographyProps={{}}
                                                    style={{padding: '0px 0px 0px 10px'}}
                                                />
                                                <table style={{}}>
                                                    <tbody>
                                                    {samelines.map((sameline, index) =>
                                                        <tr key={index} style={{}}>
                                                            <td style={{paddingLeft: 20}}>
                                                                <ListItemText
                                                                    primary={sameline.name}
                                                                    primaryTypographyProps={{fontWeight: 600}}
                                                                    style={{padding: '0px 0px 0px 10px'}}
                                                                />
                                                            </td>
                                                            <td style={{paddingLeft: 10}}>
                                                                <WatchlistButton id={sameline.id} dense={true}/>
                                                            </td>
                                                        </tr>
                                                    )}
                                                    </tbody>
                                                </table>

                                            </td>
                                            <td style={{verticalAlign: 'top'}}>
                                                <WatchlistAddAllButton entry={lock} fontSize={'small'}/>
                                            </td>
                                        </tr>


                                        </tbody>
                                    </table>
                                }

                            </div>
                        }
                    </div>
                </div>
            </AccordionSummary>
        </Accordion>

                )
                }

                export default WatchlistAddLockDetails
