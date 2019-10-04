// babel.config.js
const presets = [
    ["@babel/preset-env", { // Pass a config object to the preset
    debug: true, // Output the targets/plugins used when compiling
    
    // NEW CODE:

    //Configure how @babel/preset-env handles polyfills from core-js
    usebuiltins: 'usage',

    //Specify the core-js version. Must match the version in package.json
    corejs: 3

    //Specify which environments we support / target. (We have chosen to specify
    // targets in .browserslistrc, so there is no need to do it here)
    // targets: "";
    // END CODE
    }]
];     

const plugins = [];

// Export a config objects
module.exports = { presets, plugins }; 