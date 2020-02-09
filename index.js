#!/usr/bin/env node

const path = require('path');
const fs = require('fs');
const jsonfile = require('jsonfile');

// Load package.json relative to current shell location
const parentModuleBase = path.resolve(__dirname, '../..');
const rootPkgPath = path.join(parentModuleBase, 'package.json');
let rootPkg = null;

try {
    console.log({ rootPkgPath });
    rootPkg = JSON.parse(fs.readFileSync(rootPkgPath).toString());
    console.log({ rootPkg });

    let { scripts } = rootPkg;
    scripts = {
        ...scripts,
        "badges:win": "./scripts/generate_badges_win.sh"
    };

    const husky = {
        hooks: {
            "pre-push": "./scripts/generate_badges_win.sh"
        }
    }

    jsonfile.writeFileSync(rootPkgPath, {
        ...rootPkg,
        scripts: { ...scripts },
        husky
    });

    const scriptDestDir = path.join(parentModuleBase, 'scripts');
    !fs.existsSync(scriptDestDir) && fs.mkdirSync(scriptDestDir);
    const scriptDestPath = path.join(scriptDestDir, 'generate_badges_win.sh');
    fs.copyFileSync('generate_badges_win.sh', scriptDestPath);

    const ciDestDir = path.join(parentModuleBase, '.ci');
    !fs.existsSync(ciDestDir) && fs.mkdirSync(ciDestDir);
    
} catch (err) {
    throw err;
}
