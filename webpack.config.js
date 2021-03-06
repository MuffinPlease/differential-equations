const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: 'main.js'
    },
    resolve: {
        extensions: ['.js'],
        alias: {
            '@templates' : path.resolve(__dirname,'src/templates/'),
            '@styles' : path.resolve(__dirname,'src/styles/'),
            '@images' : path.resolve(__dirname,'src/assets/images/'),
            '@pages' : path.resolve(__dirname,'src/pages/'),
            '@articles' : path.resolve(__dirname,'src/articles/'),
            '@utils' : path.resolve(__dirname,'src/utils/'),
            '@router' : path.resolve(__dirname,'src/router'),
        }
    },
    module: {
        rules: [{
            test: /\.js?$/,
            exclude: /node_module/,
            use:{
                loader: 'babel-loader'
            }
        },
        {
            test: /\.html$/,
            use: {
                loader: 'html-loader'
            }
        },
        {
            test: /\.css$/i,
            use:[MiniCssExtractPlugin.loader, 
            'css-loader'],
        },
    ],
    },
    devServer: {
        static: 
        {
          directory: path.join(__dirname, "dist"),
          watch: true,
        },
        watchFiles: path.join(__dirname, "./**"), 
        compress: true,
        historyApiFallback: true,
        port: 3006,
        open: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: './src/pages/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin(),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname,"src","assets/images"),
                    to: "assets/images"
                }
            ]
        }),
    ],
}