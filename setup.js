const path = require('path');
const fs = require('fs');

(async() => {
try {
    //
    // Update package.json with 'badges' script relative to current shell location
    //    
    const rootPkgPath = path.resolve(__dirname, '..', '..', 'package.json');
    let rootPkg = null;
    rootPkg = JSON.parse(fs.readFileSync(rootPkgPath).toString());
    let { scripts = {} } = rootPkg;
    if (!Object.keys(scripts).includes('sync-badges')) {
        scripts = {
            ...scripts,
            "sync-badges": "node node_modules/setup-gh-badges"
        };
        fs.writeFileSync(rootPkgPath, JSON.stringify({
            ...rootPkg,
            scripts: { ...scripts }
        }));
    }
    
} catch (err) {
    throw err;
}
})();
