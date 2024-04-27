import fs from 'fs'

const date = {version: new Date()}
console.log(date)

fs.writeFileSync('./public/versionTest.json', JSON.stringify(date))