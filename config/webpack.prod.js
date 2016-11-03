var webpackMerge = require('webpack-merge');
var commonConfig = require('./webpack.common.js');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

module.exports = webpackMerge(commonConfig, {
    devtool: 'source-map',
    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
          beautify: false,
          mangle: {screw_ie8: true, keep_fnames: true},
          compress: {screw_ie8: true},
          comments: false
        }),
        new webpack.DefinePlugin({
            'process.env': {
            'ENV': JSON.stringify(ENV)
        }
    })
    ]
});
