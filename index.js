const path = require('path');
const fs = require('fs');
const jsonfile = require('jsonfile');

// Load package.json relative to current shell location
const parentModuleBase = path.resolve(__dirname, '../..');
const rootPkgPath = path.join(parentModuleBase, 'package.json');
let rootPkg = null;

try {
    rootPkg = JSON.parse(fs.readFileSync(rootPkgPath).toString());

    let { scripts } = rootPkg;
    scripts = {
        ...scripts,
        "badges:win": "node_modules/setup-gh-badges/generate_badges_win.sh"
    };

    // Update parent module's package.json
    jsonfile.writeFileSync(rootPkgPath, {
        ...rootPkg,
        scripts: { ...scripts }
    });

    // Generate folder to hold badges
    const ciDestDir = path.join(parentModuleBase, '.ci_badges');
    !fs.existsSync(ciDestDir) && fs.mkdirSync(ciDestDir);
    
} catch (err) {
    throw err;
}
