var webpack = require("webpack");

module.exports = {
    entry: {
        'polyfills': './showcase/polyfills.js',
        'vendor': './showcase/vendor.js',
        'application': './showcase/application.js'
    },
    output: {
        path: __dirname,
        filename: "./prod/[name].js"
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ['application', 'vendor', 'polyfills']
        }),
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            mangle: {screw_ie8: true, keep_fnames: true},
            compress: {screw_ie8: true},
            comments: false
        })
    ]
};