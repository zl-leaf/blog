var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var webpack = require('webpack');

var hotMiddlewareScript = "webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true";
var cdnHost = 'http://res.yipzale.me';
var devHost = 'http://dev-blog.yipzale.me:9080';

module.exports = {
  context: __dirname,
  entry: {
    main: [
      // hotMiddlewareScript,
      path.resolve(__dirname, "./public/js/main.js"),
    ]
  },
  output: {
    path: path.resolve(__dirname, "./public/dist"),
    filename: "js/[name].bundle.js",
    publicPath: process.env.NODE_ENV == 'production' ? cdnHost + "/dist/" : devHost + "/dist/"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader?name=/css/[name]-[hash].[ext]"
          }
        ]
      },
      {
        test: /\.(eot|woff|woff2|svg|ttf)([\?]?.*)$/,
        loader: "file-loader?name=front/[name]-[hash].[ext]"
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: "file-loader?name=images/[name]-[hash].[ext]"
          },
          {
            loader: 'image-webpack-loader',
            options: {
              optipng: {
                optimizationLevel: 7,
              },
              gifsicle: {
                interlaced: false,
              },
              pngquant: {
                quality: "65-90",
                speed: 4
              },
              mozjpeg: {
                quality: 65
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // new webpack.optimize.OccurrenceOrderPlugin(),
    // new webpack.HotModuleReplacementPlugin(),
    // new webpack.NoEmitOnErrorsPlugin()
  ]
}