const path = require('path')

module.exports = {
  entry: './src/scripts/main.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'build')
  },
  resolve: {
    extensions: ['.js']
  },
  devServer: {
    port: 8000,
    inline: true
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
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader'
        ]
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'build/fonts/'
            }
          }
        ]
      }
    ]
  }
}
