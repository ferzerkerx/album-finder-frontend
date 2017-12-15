const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const Assets = require('./assets');

module.exports = {
    entry: {
        app: "./src/app.js",
        controllers: "./src/controllers.js",
        services: "./src/services.js",
    },
    output: {
        path: __dirname + "/build/js/",
        filename: "[name].bundle.js"
    },
    plugins: [
      new CopyWebpackPlugin(
        Assets.map(asset => {
          return {
            from: path.resolve(__dirname, `./node_modules/${asset}`),
            to: path.resolve(__dirname, './build/npm')
          };
        })
      ),
      new webpack.DefinePlugin({
        "APP_URL": JSON.stringify("http://127.0.0.1:8080")
      }),
    ]
};