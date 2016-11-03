var webpackMerge = require('webpack-merge');
var commonConfig = require('./webpack.common.js');

module.exports = webpackMerge(commonConfig, {
    devServer: {
        historyApiFallback: true,
        stats: 'minimal'
    }
});
