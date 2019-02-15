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
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'dist/[hash].[ext]',
            },
          }
        ],
      }
    ]
  }
};
