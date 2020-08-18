#!/usr/bin/env node

const syncBadges = require('./index');

const [,arg1, arg2] = process.argv
const argsStr = [arg1, arg2].join(' ')
if (/\s-v\s*$/.test(argsStr)) {
    const { name, version } = require('./package');
    console.log(`${name} v${version} ✔️`);
    process.exit();
}

syncBadges();
