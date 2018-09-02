var path = require("path");
// var webpack = require("webpack");
// var BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
var OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

// var isProd = process.argv.join("").indexOf("production") !== -1;

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
        test: /\.(png|jpg|jpeg|gif)$/,
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
            presets: [
              [
                "@babel/preset-env",
                {
                  useBuiltIns: false
                }
              ]
            ],
            plugins: [
              "@babel/plugin-syntax-dynamic-import",
              "@babel/plugin-transform-runtime",
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
    contentBase: "./dist",
    compress: true,
    port: 8081,
    proxy: {
      "*": "http://localhost:8080"
    }
  },
  plugins: [
    // new BundleAnalyzerPlugin(),
    new MiniCssExtractPlugin(),
    new OptimizeCSSAssetsPlugin()
    // new webpack.IgnorePlugin(/process/),
    // new webpack.IgnorePlugin(/regexparam/),
    // new webpack.IgnorePlugin(/babel/)
  ]
};
