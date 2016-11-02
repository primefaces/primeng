var webpack = require("webpack");

module.exports = {
    entry: {
        'polyfills': './showcase/polyfills.ts',
        'vendor': './showcase/vendor.ts',
        'application': './showcase/main.ts'
    },
    output: {
        path: __dirname,
        filename: "./prod/[name].js",
        chunkFilename: "./prod/[id].js"
    },
    
    resolve: {
        extensions: ['', '.ts', '.js']
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