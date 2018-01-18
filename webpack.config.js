module.exports = {
  entry: {
    edit: __dirname + "/public/js/edit.js"
  },
  output: {
    path: __dirname + "/public",//打包后的文件存放的地方
    filename: "dist/js/[name].bundle.js"//打包后输出文件的文件名
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
            loader: "css-loader"
          }
        ]
      },
      {
        test: /\.(eot|woff|woff2|svg|ttf)([\?]?.*)$/,
        loader: "file-loader?name=/dist/front/[name]-[hash].[ext]"
      }
    ]
  },
  resolve: {
    alias: {
      vue: "vue/dist/vue.js"
    }
  }
}