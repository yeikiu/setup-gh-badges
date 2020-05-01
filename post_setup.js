const setup = () => {
    const { name, version } = require('./package');
    console.log(`\n\n✔️   ${name} v${version} installed successfully!
    
    > You can run 'npx sync-badges' within your project now\n\n`)
};

setup();