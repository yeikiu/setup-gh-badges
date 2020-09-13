#!/usr/bin/env node

import syncBadges from './index.js'

const [,arg1, arg2] = process.argv
const argsStr = [arg1, arg2].join(' ')
if (/\s-v\s*$/.test(argsStr)) {
    const { name, version } = require('./package')
    console.log(`${name} v${version}    ✔️`)
    process.exit()
}

syncBadges()
