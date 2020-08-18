const { resolve, join } = require('path');
const { existsSync, mkdirSync, writeFileSync, readFileSync } = require('fs');
const { makeBadge } = require('badge-maker');

const createBadge = ({
    name, label, message, color = 'green', style = 'flat'
}) => {
    // Generate folder to hold badges
    const ciDestDir = resolve(process.cwd(), '.ci_badges');
    !existsSync(ciDestDir) && mkdirSync(ciDestDir);

    const badgeConfig = {
        label,
        message,
        color,
        style,
    }
    
    const svg = makeBadge(badgeConfig)
    writeFileSync(join(ciDestDir, name), svg);
}

const getNumColor = (num) => {
 if (num < 1) return 'green';
 if (num > 10) return 'orange';
 if (num > 5) return 'yellow';
}

const syncBadges = async() => {
    const rootPkgPath = resolve(process.cwd(), 'package.json');
    const rootPkg = JSON.parse(readFileSync(rootPkgPath).toString());
    const { name = '', version = '', dependencies = {}, devDependencies = {} } = rootPkg;

    // Get version
    createBadge({
        name: 'npm-version-badge.svg',
        label: 'version',
        message: version
    });

    // Get dependencies
    const numDependencies = Object.keys(dependencies).length;
    createBadge({
        name: 'npm-dependencies-badge.svg', 
        label: 'dependencies',
        message: numDependencies.toString(),
        color: getNumColor(numDependencies)
    });

    // Get devDependencies
    const numDevDependencies = Object.keys(devDependencies).length;
    createBadge({
        name: 'npm-devdependencies-badge.svg', 
        label: 'devDependencies',
        message: numDevDependencies.toString(),
        color: getNumColor(numDevDependencies)
    });

    console.log(`\n\n✔️   ${name} v${version}: Badges updated successfully!
    
    # version ${version}
    # dependencies ${numDependencies}
    # devDependencies ${numDevDependencies}\n\n`);
};

module.exports = syncBadges;
