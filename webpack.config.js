module.exports = {
  entry: {
    main: __dirname + "/public/js/main.js"
  },
  output: {
    path: __dirname + "/public/dist",//打包后的文件存放的地方
    filename: "js/[name].bundle.js",//打包后输出文件的文件名
    publicPath: "/dist/"
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
                "env", "react"
            ]
          }
        },
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
        loader: "file-loader?name=/front/[name]-[hash].[ext]"
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: "file-loader?name=/images/[name]-[hash].[ext]"
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
  }
}