const HtmlWebPackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: ['./assets/js/main.js', './assets/sass/style.scss'],
    output: {
        filename: './dist/js/bundle.js',
        path: path.join(__dirname, './')
    },
    devServer: {
        contentBase: './build'
    },
    module: {
        rules: [{
                test: /\.html$/,
                use: [{
                    loader: 'html-loader',
                    options: {
                        minimize: true
                    }
                }]
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: [{
                            loader: 'css-loader',
                            options: {
                                minimize: true,
                            }
                        },
                        {
                            loader: 'postcss-loader'
                        },
                        {
                            loader: 'sass-loader'
                        }
                    ]
                })
            },
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './template/index.html',
            filename: './index.html'
        }),
        new ExtractTextPlugin({
            filename: './dist/css/style.css'
        }),
        new UglifyJSPlugin({
            uglifyOptions: {
                output: {
                    comments: false
                }
            }
        }),
        new MinifyPlugin({}),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            'window.jQuery': 'jquery',
            Popper: ['popper.js', 'default']
        })
    ]
}