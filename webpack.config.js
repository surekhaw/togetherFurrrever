const path = require('path');

module.exports = {
  entry: './client/src/index.jsx',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'client', 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        // query: {
        //   presets: ['env', 'react'],
        // }
      },
      // {
      //   test: /\.(jpe?g|png|gif|svg)$/i,
      //   loader: 'file-loader',
      //   options: {
      //     name: '/public/icons/[name].[ext]'
      //   }
      // },
      // {
      //   test: /\.css$/,
      //   use: [
      //     { loader: 'style-loader' },
      //     { loader: 'css-loader'
      //     }
      //   ]
      // }
    ]
  }
};