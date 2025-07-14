import fs from 'fs'
import {sendEmail} from '../../util/sendEmail.js'
import {localUser, prodUser} from '../../../keys/users.js'

const {writeFile} = fs.promises

async function main() {

    const prodEnvironment = process.env.USER !== localUser
    const testingText = !prodEnvironment ? ' (TESTING)' : ''
    const dataDir = prodEnvironment
        ? `/home/${prodUser}/lpulocks-node/data/working`
        : `/Users/${localUser}/Documents/GitHub/lpulocks/lpulocks-node/data/working`

    const currentActivity = JSON.parse(await fs.promises.readFile(`${dataDir}/challengeLockActivity.json`, 'utf8'))
    const {newChallengeLocks, newPendingMedia} = currentActivity

    const newLockCount = newChallengeLocks?.length || 0
    const newMediaCount = newPendingMedia?.length || 0
    if (newLockCount === 0 && newMediaCount === 0) return

    const titleA = newLockCount > 0 ? `${newLockCount} new challenge locks` : undefined
    const titleJoin = titleA && newMediaCount > 0 ? ' and ' : ''
    const titleB = newMediaCount > 0 ? `${newMediaCount} new pending media` : ''
    const subject = `Challenge Locks: ${titleA || ''}${titleJoin}${titleB}${testingText}`

    let html = ''

    if (newLockCount > 0) {
        const entryText = `new challenge lock${newLockCount > 1 ? 's' : ''}`
        let fieldsHtml = `<strong>${newLockCount} ${entryText} found</strong><br/><br/>`
        fieldsHtml += '<table style="border-width:1px">'
        newChallengeLocks.forEach(entry => {
            const host = entry.name.includes('(DEV)') ? 'dev.' : ''
            fieldsHtml += `<tr><td>&nbsp;</td><td><strong>${entry.name}&nbsp;</strong></td><td>https://${host}lpulocks.com/#/challengelocks?sort=updatedAt&id=${entry.id}</td></tr>`
        })
        fieldsHtml += '</table><br/><br/>'
        html = fieldsHtml
    }

    if (newMediaCount > 0) {
        const entryText = `lock${newMediaCount > 1 ? 's' : ''} with new pending media`
        let fieldsHtml = `<strong>${newMediaCount} ${entryText} found</strong><br/><br/>`
        fieldsHtml += '<table style="border-width:1px">'
        newPendingMedia.forEach(entry => {
            const host = entry.name.includes('(DEV)') ? 'dev.' : ''
            fieldsHtml += `<tr><td>&nbsp;</td><td><strong>${entry.name}&nbsp;</strong></td><td>https://lpulocks.com/#/${host}challengelocks?sort=updatedAt&id=${entry.id}</td></tr>`
        })
        fieldsHtml += '</table>'
        html += fieldsHtml
    }

    try {
        await sendEmail({
            emailConfig: 'challengeLock',
            subject: subject,
            text: subject,
            html: html
        })
    } catch (error) {
        console.error('Message send failure', error)
    }

    const resetActivity = {newChallengeLocks: [], newPendingMedia: []}
    const updatedActivityJson = JSON.stringify(resetActivity, null, 2)
    try {
        await writeFile(`${dataDir}/challengeLockActivity.json`, updatedActivityJson)
    } catch (error) {
        console.error('Error writing updated activity file:', error)
        throw new Error('Failed to write updated activity file')
    }

}

main().catch(console.error)
