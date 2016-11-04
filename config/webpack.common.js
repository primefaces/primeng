var webpack = require("webpack");

module.exports = {
    entry: {
        'polyfills': './showcase/polyfills.ts',
        'vendor': './showcase/vendor.ts',
        'application': './showcase/main.ts'
    },
    output: {
        path: __dirname,
        filename: './dist/[name].js',
        chunkFilename: './dist/[id].js'
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
        })
    ]
};