import webpack from 'webpack';
import config from 'config';
import path from 'path';
import fs from 'fs';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import miniCssExtractPlugin from 'mini-css-extract-plugin';
import lodashModuleReplacementPlugin from 'lodash-webpack-plugin';

import packageJSON from './package.json';

const jsRegex = /\.(js|jsx)$/;
const jsRules = () => {
  return [
      {
        loader: 'babel-loader',
        options: {
            plugins: [
              'lodash',
              ['@babel/plugin-transform-spread', {
                'loose': true
              }],
              '@babel/plugin-syntax-dynamic-import'
            ],
            presets: [
              '@babel/preset-react',
              '@babel/preset-env'
            ]
          }
      },
      'eslint-loader'
    ]
};

fs.writeFileSync(path.resolve(__dirname, 'build/client.json'), JSON.stringify(config))

export default {
    node: {
        fs: 'empty'
    },

    resolve: {
        modules: [path.resolve(__dirname, 'node_modules')] || [],
        extensions: ['*', '.js', '.jsx'],
        alias: {
          config: path.resolve(__dirname, 'build/client.json')
        }
    },

    entry: ['./src/index.jsx'],

    output: {
        filename: '[name].js',
        sourceMapFilename: '[name].js.map',
        path: path.resolve(__dirname, './build'),
        publicPath: './build/'
    },

    module: {
      rules: [
        // JS
        {
          test: jsRegex,
          exclude: /node_modules/,
          use: jsRules()
        }
      ]
    },

    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/](react|react-dom|react-router-dom|react-redux|classnames|prop-types|lodash|axios|)[\\/]/,
            name: 'vendor',
            chunks: 'all'
          }
        }
      }
    },

    plugins: [
      new lodashModuleReplacementPlugin({
          caching: true,
          collections: true,
          shorthands: true,
          paths: true,
      }),
      new miniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[name].css"
      })
    ],

}
