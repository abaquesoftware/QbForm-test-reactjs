const path = require('path')
const webpack = require('webpack')

let config = {
  mode: 'development',
  entry: './src/main.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    publicPath: '/dist/'
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    /*
    alias: {
      React: path.resolve(__dirname, '../node_modules')
    }
    */
  },
  module: {
    rules: [
      {
        test: /\.tsx?/,
        loader: 'tslint-loader',
        enforce: 'pre',
        exclude: [ "/node_modules/"]
      },
      {
        test: /\.tsx?/,
        loader: 'ts-loader',
        exclude: [/node_modules/]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    })
  ],
  /*
  externals: {
    "react": "React",
    "react-dom": "ReactDOM",
  },
  */  
  devServer: {
    compress: false,
    historyApiFallback: true,
    port: 9000,
    host: "0.0.0.0",
    index: "index.html",
    contentBase: path.join(__dirname, 'webserver'),
    //historyApiFallBack: true,
    // progress: true,
    //hot: true,
    //inline: true,
    // https: true,
    /*
    proxy: { 
      "/api/**": {
        target: "http://127.0.0.1:8000/",
        "secure": false,
        "changeOrigin": true
      } 
    }
    */
  },
}

module.exports = config
