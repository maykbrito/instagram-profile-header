const path = require('path')

module.exports = {
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'instagram-box.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { 
            loader: "css-loader", 
            options: {
              import: true,
            } 
          }
        ]
      },
    ],
  },
};