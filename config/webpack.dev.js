var webpackMerge = require('webpack-merge');
var commonConfig = require('./webpack.common.js');

module.exports = webpackMerge(commonConfig, {
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        historyApiFallback: true,
        stats: 'minimal'
    }
});
