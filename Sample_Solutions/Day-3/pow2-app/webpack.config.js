const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const deps = require("./package.json").dependencies;

module.exports = {
  entry: "/src/index.js",
  output: {
    publicPath: "http://localhost:3001/", //The port value should be different in each of the files
  },
  resolve: {
    extensions: [".jsx", ".js", ".json"],
  },
  devServer: {
    open: true,
    port: 3001, //different values for each file and should correspond to the one above
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg|ico)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
        name: 'pow2',
        filename: "remoteEntry.js",
        library: { type: 'var', name: 'pow2' },
        exposes: {
            "./Pow2": "./src/components/Pow2.js"
        },
        shared: {
          ...deps,
          react: {
            singleton: true,
            requiredVersion: deps.react
          }
        }
    }),
    new HtmlWebpackPlugin({
        template: "./public/index.html"
    })
  ]
};