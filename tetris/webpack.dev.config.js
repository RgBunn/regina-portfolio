const {default:merge}=require('webpack-merge');
const common=require('./webpack.config.js');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports=merge(common,{
    mode:'development',
    output: {
        filename: 'bundle.js',
},
    devServer:{
        port:3666,
        hot:true,
        open:false,
    },
    devtool:'source-map',
    plugins:[
        new MiniCssExtractPlugin({
            filename: "[name].css",
        })
    ]
})