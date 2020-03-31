const path = require('path');
const fs = require('fs');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const { BadgeFactory } = require('gh-badges')

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

(async() => {
try {
    const rootPkgPath = path.resolve(process.cwd(), 'package.json');
    const rootPkg = JSON.parse(fs.readFileSync(rootPkgPath).toString());
    const { version = '0.0.0', dependencies = {}, devDependencies = {} } = rootPkg;

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

    // Get outdated dependencies WIP
    // const { stdout, stderr } = await exec('yarn outdated --json --long');
    
    // let outdatedData = {};
    // let numOutdated = 0;
    // if( stderr.trim().length > 0) {
    //     throw new Error(stderr);
    // } else if( stdout.trim().length > 0) {
    //     outdatedData = JSON.parse(stdout);
    //     numOutdated = outdatedData.major.length + outdatedData.minor.length + outdatedData.patch.length;
    // }
    // createBadge({
    //     name: 'npm-outdated-dependencies-badge.svg',
    //     text: ['outdated', `${numOutdated}`],
    //     color: getNumColor(numOutdated)
    // });
    
} catch (err) {
    throw err;
}
})();
