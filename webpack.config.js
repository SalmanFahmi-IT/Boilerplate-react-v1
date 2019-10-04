// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');


// We'll refer to our source and dist paths frequently, so let store the here
const PATH_SOURCE = path.join(__dirname, './src');
const PATH_DIST = path.join(__dirname, './dist');

// Export a configuration object
module.exports = env => {
    
    const environment = env.environment;
    const isProduction = environment === 'production';
    const isDevelopment = environment === 'development';

    return{
            // Tell a webpack to do some optimization for our environment( development
        // or production ). Webpack will enable  certain plugins and set
        // 'process.env.MODE_ENV according to the environment we specify 
        mode: environment,
        
        // The point or points to enter the application. This is where Webpack will
        // start. We generally have one entry point per HTML page. For single-page
        // applications, this means one entry point. For traditional multi-page apps,
        // we may have multiple entry points.
        devServer: {
            contentBase: PATH_DIST,
            host: 'localhost',
            port: 9000,
            historyApiFallback: true,
            overlay: {
                errors: true,
                warnings: true
            }
        },
        entry: [
            path.join(PATH_SOURCE, './index.js')
        ],
        output: {
            path: PATH_DIST,
            filename: 'js/[name].[hash].js'
        },
        module:{
            rules:[
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use:{ 
                        loader: 'babel-loader',
                        options:{
                            presets: [
                                ["@babel/preset-env", { // Pass a config object to the preset
                                debug: true, // Output the targets/plugins used when compiling
                                
                                // NEW CODE:
                            
                                //Configure how @babel/preset-env handles polyfills from core-js
                                useBuiltIns: 'usage',
                            
                                //Specify the core-js version. Must match the version in package.json
                                corejs: 3
                            
                                //Specify which environments we support / target. (We have chosen to specify
                                // targets in .browserslistrc, so there is no need to do it here)
                                // targets: "";
                                // END CODE
                                }],
                                // The react preset includes several plugins that are required to write
                                // a React app. For example, it transforms JSX:
                                // <div> -> React.createElement('div')                            
                                "@babel/preset-react"
                            ],
                        }
                    }
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.join(PATH_SOURCE, './index.html')
            }),
            new CleanWebpackPlugin(),
        ]
    }
    
};