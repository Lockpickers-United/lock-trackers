import fs from 'fs'
import {sendEmail} from './util/nodeMailer.js' // eslint-disable-line

import {localUser, prodUser} from '../keys/users.js' // eslint-disable-line

async function main() {

    const production = process.env.USER !== localUser
    const workDir = production
        ? `/home/${prodUser}/lpulocks-node/data/working`
        : `/Users/${localUser}/Documents/GitHub/lpulocks/lpulocks-node/data/working`

    const newPendingEntries = JSON.parse(await fs.promises.readFile(`${workDir}/newPendingEntries.json`, 'utf8'))
    const numEntries = newPendingEntries.length

    const testingText = !production ? ' (TESTING)' : ''

    if (numEntries > 0) {

        const entryText = numEntries > 1 ? 'new pending entries' : 'new pending entry'

        const html = `<strong>${numEntries} ${entryText} found</strong><br/><br/>`
        let fieldsHtml = html + '<table style="border-width:1px">'
        newPendingEntries.forEach(entry => {
            fieldsHtml += `<tr><td><strong>${entry.username}</strong> - </td><td>https://lpulocks.com/#/speedpicks?id=${entry.id}&sort=dateDesc&status=pending&rank=Show+All</td></tr>`
        })
        fieldsHtml += '</table>'

        try {
            await sendEmail({
                emailConfig: 'pendingEntry',
                subject: `SpeedPicks: ${numEntries} ${entryText}${testingText}`,
                text: `SpeedPicks: ${numEntries} ${entryText}`,
                html: fieldsHtml,
            })
            //console.log('Message sent: %s', email.messageId)
        } catch (error) {
            console.error('Message send failure', error)
        }
    }
}

main().catch(console.error)
