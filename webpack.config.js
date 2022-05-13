const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WorkboxPlugin = require('workbox-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const fs = require('fs');

var config = { 
    entry: path.resolve('./src/index.js'), 
    externals: {
        moment: 'moment'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx?)$/,
                exclude: /(node_modules|bower_components)/,
                use: ['babel-loader']
            },
            {
                test: /\.(scss|css)$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }, 
            {
                test: /\.(jpe?g|png|gif|ico)$/,
                use: [{
                  loader: 'url-loader',
                  options: {
                    limit: 10000
                  }
                }]
            },
            {
                test: /\.(eot|svg|ttf|woff2?|otf)$/,
                use: 'file-loader'
            }   
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            chunks: 'async',
            cacheGroups: {
                commons: {
                  test: /[\\/]node_modules[\\/]/,
                  name: 'ext',
                  chunks: 'all'
                }
            }
        }
    },
    output: {
        filename: "[name].[fullhash].js",
        chunkFilename: '[id].bundle.js',
        publicPath: '/' 
    },
    
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
          hash: true,
          template: 'public/index.html',
        //  favicon: 'public/favicon.ico'
        })
        
      ],
    devServer: {       
        compress: true,
        hot: true,
        port: 3000,
        static: {
            directory: path.resolve(__dirname, 'app'),
          },
        historyApiFallback: true,        
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*'           
        }
    }
}

module.exports = (env, argv) => {
    config.devtool = argv.mode === 'production'? false: 'source-map';

    config.plugins.push(new WorkboxPlugin.GenerateSW({ 
        // https://webpack.js.org/guides/progressive-web-application/
        // these options encourage the ServiceWorkers to get in there fast
        // and not allow any straggling "old" SWs to hang around
        exclude: [/\.(?:png|jpg|jpeg|svg)$/],

        clientsClaim: true,
        skipWaiting: true,
        runtimeCaching: [{
            urlPattern: /\.(?:png|jpg|jpeg|svg|js|ttf|woff|eot|map|txt)$/,
            handler: 'CacheFirst',
            options:{
                cacheName:'release-5'
            }
        }]
    }))

    config.plugins.push(
        new webpack.DefinePlugin({
            'process.env.BASEURL_MODE': JSON.stringify(argv.mode)
        })

        
    );

    return config;
} 
