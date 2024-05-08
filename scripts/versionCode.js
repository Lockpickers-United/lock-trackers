import fs from 'fs'

const version = {version: new Date()}
console.log(version)

fs.writeFileSync('./public/versionCode.json', JSON.stringify(version))