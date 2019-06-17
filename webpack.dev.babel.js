import webpack from 'webpack';
import merge from 'webpack-merge';
import miniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';
import errorOverlayPlugin from 'error-overlay-webpack-plugin';
import postcssNormalize from 'postcss-normalize';
import cleanWebpackPlugin from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WorkboxPlugin from 'workbox-webpack-plugin';
import common from './webpack.config.babel';
import packageJSON from './package.json';

const styleRegex = /\.(sa|sc|c)ss$/;
const imagesRegex = /\.(jpe?g|png|svg|gif|ico)$/;
const styleRules = () => {
  return [
    miniCssExtractPlugin.loader,
    'css-loader',
    {
        loader: 'postcss-loader',
        options: {
            sourceMap: true,
            ident: 'postcsss',
            plugins: () => [
                require('postcss-import')({skipDuplicates: true}),
                require('autoprefixer')(packageJSON.autoprefixer),
                require('cssnano')()
            ]
        }
    },
    'sass-loader'
  ];
}

module.exports = merge(common, {
    mode: 'development',

    watch: false,

    watchOptions: {
      ignored: /node_modules/
    },

    devtool: 'inline-source-map',

    optimization: {
        splitChunks: {
            chunks: 'all',
            name: true,
            minChunks: 1,
            cacheGroups: {
                vendor: {
                    minChunks: 1,
                    chunks: 'all',
                    name: 'vendor',
                    test: /[\\/]node_modules[\\/]/,
                    enforce: true
                },
            }
        }
    },

    module: {
        rules: [
          // Styles
          {
            test: styleRegex,
            use: styleRules()
          },
          // Images
          {
            test: imagesRegex,
            loader: 'file-loader?name=[name].[ext]'
          },
        ]
    },

    plugins: [
      new errorOverlayPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new WorkboxPlugin.InjectManifest({
          swDest: 'sw.js',
          swSrc: './template/sw.js'
      }),
      new HtmlWebpackPlugin({
        filename: path.resolve(__dirname, 'dist/index.html'),
        template: path.resolve(__dirname, 'template/index.html'),
        favicon: 'public/favicon.ico',
      })
    ],

    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].[hash].js',
      chunkFilename: '[name].[chunkhash].js',
      publicPath: '/'
    },

    devServer: {
      port: 5150,
      historyApiFallback: true,
      open: true,
      contentBase: path.join(__dirname, 'dist'),
      publicPath: '/'
    }

});
