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
        new webpack.ContextReplacementPlugin(
            // The (\\|\/) piece accounts for path separators in *nix and Windows
            /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
            __dirname + 'showcase' // location of your src
        ),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['application', 'vendor', 'polyfills']
        }),
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            mangle: { screw_ie8: true, keep_fnames: true },
            compress: { screw_ie8: true },
            comments: false
        })
    ]
};