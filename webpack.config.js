const path = require('path')
const NodeExternals = require('webpack-node-externals')

module.exports = {
  entry: './src/file_explorer/index.js',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'react-keyed-file-browser.js',
    library: 'react-keyed-file-browser',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /.*\.sass*/,
        loader: ['style-loader', 'css-loader', 'sass-loader'],
        include: path.join(__dirname, '/src/file_explorer'),
      },
    ],
  },
  externals: NodeExternals(),
}
