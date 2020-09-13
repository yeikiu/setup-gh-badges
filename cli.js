#!/usr/bin/env node

import syncBadges from './index.js'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { readFileSync } from 'fs'

const [,arg1, arg2] = process.argv
const argsStr = [arg1, arg2].join(' ')
if (/\s-v\s*$/.test(argsStr)) {
    const __filename = fileURLToPath(import.meta.url)
    const __dirname = dirname(__filename);
    const rawPkg = readFileSync(resolve(__dirname, 'package.json'))
    const { name, version } = JSON.parse(rawPkg)
    console.log(`${name} v${version}    ✔️`)
    process.exit()
}

syncBadges()
