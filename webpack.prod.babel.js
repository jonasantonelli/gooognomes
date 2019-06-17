import webpack from 'webpack';
import path from 'path';
import miniCssExtractPlugin from 'mini-css-extract-plugin';
import optimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import { InjectManifest } from 'workbox-webpack-plugin';
import HtmlCriticalWebpackPlugin from 'html-critical-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import merge from 'webpack-merge';

import common from './webpack.config.babel';
import packageJSON from './package.json';


const imagesRegex = /\.(jpe?g|png|svg|gif|ico)$/;
const styleRegex = /\.(sa|sc|c)ss$/;
const styleRules = () => {
  return [
      miniCssExtractPlugin.loader,
      'css-loader',
      {
          loader: 'postcss-loader',
          options: {
              sourceMap: false,
              ident: 'postcsss',
              plugins: () => [
                  require('postcss-import')({skipDuplicates: true}),
                  require('autoprefixer')(packageJSON.autoprefixer),
                  require('cssnano')()
              ]
          }
      },
      'sass-loader'
  ]
};

module.exports = merge(common, {
    devtool: false,

    mode: 'production',

    performance: {
        hints: 'warning'
    },


    module: {
      rules: [
      // CSS && Sass
      {
        test: styleRegex,
        use: styleRules()
      },
      {
        test: imagesRegex,
        use: [
          {
            loader: 'file-loader',
            options: {
              publicPath: './'
            }
          }
        ]
      }

    ]
    },

    output: {
      filename: '[name].[hash].js',
      sourceMapFilename: '[name].js.map',
      path: path.resolve(__dirname, 'public/build'),
      publicPath: '/build',
      chunkFilename: '[name].[chunkhash].js'
    },

    optimization: {
      minimize: true,
      nodeEnv: 'production',
      minimizer: [
        new UglifyJsPlugin({
          cache: true,
          parallel: true,
          sourceMap: true
        })
      ],
      runtimeChunk: 'single',
      splitChunks: {
        chunks: 'all',
        maxSize: 185000,
        cacheGroups: {
          vendors: {
            maxSize: 155000,
            name: 'vendor',
            test: /[\\/]node_modules[\\/]/
          },
        }
      }
    },

    plugins: [
      new CleanWebpackPlugin(),
      new optimizeCSSAssetsPlugin({
        cssProcessor: require('cssnano'),
        cssProcessorOptions: {discardComments: {removeAll: true}},
        canPrint: false
      }),
      new InjectManifest({
        swDest: path.resolve(__dirname, 'public/sw.js'),
        swSrc: path.resolve(__dirname, 'template/sw.js'),
      }),
      new HtmlWebpackPlugin({
        filename: path.resolve(__dirname, 'public/index.html'),
        template: path.resolve(__dirname, 'template/index.html'),
        cache: false,
        hash: true,
        templateParameters: {
            basename: '/',
            hash: '[chunkhash]'
        }
      }),
      new HtmlCriticalWebpackPlugin({
        base: path.resolve(__dirname, './public'),
        src: 'index.html',
        dest: 'index.html',
        inline: true,
        minify: true,
        extract: true,
        penthouse: {
            blockJSRequests: false,
        }
      }),
      new MiniCssExtractPlugin({
        filename: "[name].[hash].css",
        chunkFilename: "[name].[hash].css"
      }),
    ]
});
