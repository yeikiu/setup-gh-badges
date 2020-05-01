const path = require('path');
const fs = require('fs');
const { BadgeFactory } = require('gh-badges');

const bf = new BadgeFactory()

const createBadge = ({
    name, text, color = 'green', template = 'flat', format = 'svg'
}) => {
    // Generate folder to hold badges
    const ciDestDir = path.resolve(process.cwd(), '.ci_badges');
    !fs.existsSync(ciDestDir) && fs.mkdirSync(ciDestDir);

    const badgeConfig = {
        text,
        color,
        template,
        format,
    }
    
    const svg = bf.create(badgeConfig);
    fs.writeFileSync(path.join(ciDestDir, name), svg);
}

const getNumColor = (num) => {
 if (num < 1) return 'green';
 if (num > 10) return 'orange';
 if (num > 5) return 'yellow';
}

const syncBadges = async() => {
    const rootPkgPath = path.resolve(process.cwd(), 'package.json');
    const rootPkg = JSON.parse(fs.readFileSync(rootPkgPath).toString());
    const { name = '', version = '', dependencies = {}, devDependencies = {} } = rootPkg;

    // Get version
    createBadge({
        name: 'npm-version-badge.svg',
        text: ['version', `${version}`]
    });

    // Get dependencies
    const numDependencies = Object.keys(dependencies).length;
    createBadge({
        name: 'npm-dependencies-badge.svg', 
        text: ['dependencies',`${numDependencies}`],
        color: getNumColor(numDependencies)
    });

    // Get devDependencies
    const numDevDependencies = Object.keys(devDependencies).length;
    createBadge({
        name: 'npm-devdependencies-badge.svg', 
        text: ['devDependencies',`${numDevDependencies}`],
        color: getNumColor(numDevDependencies)
    });

    console.log(`\n\n✔️   ${name} v${version}: Badges updated successfully!
    
    # version ${version}
    # dependencies ${numDependencies}
    # devDependencies ${numDevDependencies}\n\n`);
};

module.exports = syncBadges;
