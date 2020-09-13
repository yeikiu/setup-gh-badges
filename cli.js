#!/usr/bin/env node

const syncBadges = require('./index.js')
const { resolve } = require('path')
const { readFileSync } = require('fs')

const [,arg1, arg2] = process.argv
const argsStr = [arg1, arg2].join(' ')
if (/\s-v\s*$/.test(argsStr)) {
    const rawPkg = readFileSync(resolve(__dirname, 'package.json'))
    const { name, version } = JSON.parse(rawPkg)
    console.log(`${name} v${version}    ✔️`)
    process.exit()
}

syncBadges()
