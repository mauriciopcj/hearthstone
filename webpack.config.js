const path = require('path');

module.exports = {
  mode: 'development',
  
  entry: './js/main.mjs',
  
  output: {
    filename: 'main.js',
    path: path.resolve('dist')
  },
  module: {
    rules: [
      // {  
      //   test: /\.js$/,  
      //   use: 'babel-loader'  
      // },
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" }
        ]
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: false, // webpack@1.x
              disable: true, // webpack@2.x and newer
            },
          },
        ],
      }
    ]
  }
};