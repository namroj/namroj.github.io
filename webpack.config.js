const devMode = process.env.NODE_ENV !== 'production'
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
      hash: true
    }),
    new MiniCssExtractPlugin({
      filename: devMode ? './styles/bundle.css' : './styles/bundle.[hash].css'
    })
  ],
  entry: './src/scripts/app.js',
  output: {
    filename: devMode ? 'scripts/bundle.js' : 'scripts/bundle.[hash].js',
    path: path.resolve(__dirname, 'build')
  },
  devServer: {
    port: 2525,
    open: true
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.s[ac]ss$/i,
        exclude: /node_modules/,
        loader: [
          MiniCssExtractPlugin.loader,
          // 'style-loader', // Creates `style` nodes from JS strings
          'css-loader', // Translates CSS into CommonJS
          'sass-loader' // Compiles Sass to CSS
        ]
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: '/fonts/',
              publicPath: '/build/fonts/'
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.scss']
  }
}
