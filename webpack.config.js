var path = require("path");
var webpack = require("webpack");
var BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
var OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
var OfflinePlugin = require("offline-plugin");

module.exports = {
  entry: "./src/frontend/main.js",
  output: {
    path: __dirname + "/dist",
    publicPath: "/",
    filename: "main.js"
  },
  resolve: {
    alias: {
      wigly: path.resolve(__dirname, "node_modules/wigly/dist/es6.js")
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {}
          },
          "css-loader"
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|woff2)$/,
        use: [
          {
            loader: "file-loader",
            options: {}
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            plugins: [
              "@babel/plugin-syntax-dynamic-import",
              "@babel/plugin-proposal-object-rest-spread",
              [
                "@babel/plugin-transform-react-jsx",
                {
                  pragma: "h"
                }
              ]
            ]
          }
        }
      }
    ]
  },
  devServer: {
    disableHostCheck: true,
    contentBase: "./dist",
    compress: true,
    port: 8081,
    proxy: {
      "*": "http://0.0.0.0:8080"
    }
  },
  plugins: [
    new OfflinePlugin({
      externals: ["/discover", "/discover/", "/rate", "/rate/", "/account", "/account/", "/"],
      responseStrategy: "network-first"
    }),
    new MiniCssExtractPlugin(),
    // new BundleAnalyzerPlugin(),
    new OptimizeCSSAssetsPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        IMGUR_KEY: JSON.stringify(process.env.IMGUR_KEY)
      }
    })
  ]
};
