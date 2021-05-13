const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
module.exports = {
  entry: './src/client/index.ts',
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  // 将打包文件输出到dist文件夹
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(jpg|png|gif|bmp|jpeg)$/,//正则表达式匹配图片规则
        use: {
          loader: 'url-loader',
          options: {
            limit: 8192,//限制打包图片的大小：
            //如果大于或等于8192Byte，则按照相应的文件名和路径打包图片；如果小于8192Byte，则将图片转成base64格式的字符串。
            name: 'images/[name]-[hash:8].[ext]',//images:图片打包的文件夹；
            //[name].[ext]：设定图片按照本来的文件名和扩展名打包，不用进行额外编码
            //[hash:8]：一个项目中如果两个文件夹中的图片重名，打包图片就会被覆盖，加上hash值的前八位作为图片名，可以避免重名。
            esModule: false
          }
        }
      },
      {
        test: /\.html$/,
        // 处理html文件的img图片（负责引入img，从而能被url-loader进行处理）
        use: {
          loader: 'html-loader',
        },
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      // 使用babel解析js
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      // 将js中的css抽出来
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
    // 将处理后的js以及css置入html中
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/client/html/index.html',
    }),
  ],
};