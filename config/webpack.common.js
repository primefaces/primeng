var webpack = require("webpack");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var helpers = require('./helpers');

module.exports = {
    entry: {
        'polyfills': './showcase/polyfills.ts',
        'vendor': './showcase/vendor.ts',
        'app': './showcase/main.ts'
    },
    
    resolve: {
      extensions: ['.ts', '.js']
    },
    
    module: {
        loaders: [
            {
                test: /\.ts$/,
                loaders: ['ts-loader']
            }
        ]
    },
    
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor', 'polyfills']
        })
    ]
};