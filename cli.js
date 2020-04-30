#!/usr/bin/env node

const syncBadges = require('./index');

const [,, arg] = process.argv;

if (/-v.*/.test(arg)) {
    const { name, version } = require('./package');
    console.log(`${name} v${version}`);
    process.exit();
}

syncBadges();
