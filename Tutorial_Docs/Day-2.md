# Running Application with Webpack's Dev-Server

## Overview
In this section we will change our `counter-app` and `pow2-app` to run using the dev server from webpack 5.

## Webpack 5
[Webpack](https://webpack.js.org/concepts/) is a *static module* bundler, meaning it collates static assets or modules into collections called bundles which are used to serve content. Webpack takes an *entry* point, e.g. index.js in react and begins building a dependency graph based on the libraries and modules the *entry* requires.<sup>[1]</sup>


### Webpack Installation
The commands below install the webpack core package, the webpack-cli package which is required to call webpack commands from the terminal and the dev-server to run applications locally. 

> **Ensure all subsequent installs are done in both of your applications.**

```
npm install webpack --save
npm install webpack-cli webpack-dev-server --save-dev
```

> ---save-dev denotes packages that are needed for development that will not be required to deploy the application<sup>[2]</sup>

Additionally, we need to install the HtmlWebpackPlugin which is used to HTML files that inlcude all of the Webpack bundles.

```
npm install html-webpack-plugin --save-dev
```

Finally, we install the various webpack loaders. The loaders are used to bundle different type of content that are not enabled by default, more infor on this later.

```
npm install css-loader file-loader html-webpack-plugin style-loader --save-dev
```

### Webpack Config File
After installing all of the packages we need to create a config file for webpack which will define the behaviour of webpack.  

Create a `webpack.config.js` file in both the `counter-app` & `pow2-app` directories. The sample code is provided below.

> The `webpack.config.js` must be located in the root of the `counter-app` & `pow2-app` directories, not in any other sub folder such as `src`, `public` etc.

> Please ensure the port number used in the two `webpack.config.js` files is not the same. You will receive an error if you try to run both applications on the same port. Furthermore, the port number must be same within the file for the `publicPath` & `port` properties.

```javascript
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "/src/index.js",
    output: {
      publicPath: "http://localhost:3000/", //The port value should be different in each of the files
    },
    resolve: {
      extensions: [".jsx", ".js", ".json"],
    },
    devServer: {
      open: true,
      port: 3000, //different values for each file and should correspond to the one above
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
      new HtmlWebpackPlugin({
          template: "./public/index.html"
      })
    ]
  };
```

Let's break this down section by section, starting with the plug-in declared at the start.  

First we include  the [HTML plug-in](https://webpack.js.org/plugins/html-webpack-plugin/), this plug-in simplifies the creation of HTML files to serve to your webpack bundle.
```javascript
const HtmlWebpackPlugin = require("html-webpack-plugin");
```

Next, we have the `modules.exports` object, this object has various option which can be found [here](https://webpack.js.org/configuration/).  

Firstly there is a field for [entry](https://webpack.js.org/concepts/#entry). This field specifies which where webpack begins its dependency graph, branching out to the files and libraries the entry point depends on. By default it is `./src/index.js`, meaning it could be left out, however including enhances readability of the project.

[Output](https://webpack.js.org/concepts/#output) details where the final bundles should be emitted to be consumed. In this case we are emitting the bundles to our local host.

[Resolve](https://webpack.js.org/configuration/resolve/) is used to handle the case where there are multiple files with the same name of different file type. The array denotes the priority to which this file should be resoved too, with file extensions at the front of the array having a greater priority. E.g. if there were two files called `Counter.jsx` and `Counter.js` only `Counter.jsx` would be bundled.  

[DevServer](https://webpack.js.org/configuration/dev-server/) is used as a local development environment to test applications. Setting `open` to `true` ensures that the browser is automatically openned when the devServer starts running. `port` specifies which port to use whilst running on the localhost and `historyApiFallback` serves the `index.html` in place of 404 errors.

[Module](https://webpack.js.org/configuration/module/) determines how the different modules of the project will behaviour via a set of rules. We will explore these rules in more detail later.

Finally, [plugins](https://webpack.js.org/configuration/plugins/) is used to specify plugin behaviour and extend the capabilities of webpack. More info on this section later.

```javascript
module.exports = {
    entry: "/src/index.js",
    output: {
      publicPath: "http://localhost:3000/", //The port value should be different in each of the files
    },
    resolve: {
      extensions: [".jsx", ".js", ".json"],
    },
    devServer: {
      open: true,
      port: 3000, //different values for each file and should correspond to the one above
      historyApiFallback: true,
    },
    module: {
      rules: [
        ...
      ],
    },
    plugins: [
      ...
    ]
  };
```
Now let's analyse the code in `module`. As previously mentioned, module controls the behaviour of the various modules via declared rules within an array.  

Each rule contains a `test` which is a regex for file extensions, if the test is successful then the subsequent rules within the object will be applied.  

The first rule applies to all `js` or `jsx` files not in the `node_modules` directory. These files will be loaded with the babel transpiler which depend on the babel presets that we will install and explore in the next section.

Different file types require different loaders to be bundled correctly using webpack, the next two rules ensure the appropriate loader is being applied to css files and image files.

```javascript
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
```

Finally, we have the plugin section, this is where we implement the [HtmlWebpackPlugin](https://github.com/jantimon/html-webpack-plugin/blob/main/README.md) we defined at the beginning of the file. It takes an object with one attribute, `template`, which specifies a html file that should be used as a sample structure for the bundle.

```javascript
plugins: [
    new HtmlWebpackPlugin({
        template: "./public/index.html"
    })
]
```

## Babel
As seen in the `webpack.config.js` file we made use of the Babel transpiler.  

The role of Babel is to convert the latest JavaScript code & features to a backwards compatible version of JavaScript that work with the current and older browser enviornments.<sup>[3][4]</sup>  
This also applies to JSX, which React is written in.

### Babel Installation
The command below installs the preset environment, which is responsible for converting ES6 to backwards compatible JS amongst other features. 
Additionally, the preset react converts the JSX code to backwards compatible JS and the babel-loader uses the presets to transpile and serve different JavaScript flavors and supersets.

> **Ensure all subsequent installs are done in both of your applications.**

```
npm install @babel/preset-env @babel/preset-react babel-loader
```

### Babel Config File
We will create a .babelrc file configuration file. The .babelrc file contains the information behind how code will be transpilled from what has been writted to backwards compatible JS. This is done by providing a full set of the plugins and presets that is intended for use, which we installed previously.

Create a `.babelrc` file in your `root` directory in both the `counter-app` and `pow2-app`. That file should contain the following code:

```json
{
    "presets": ["@babel/preset-react", "@babel/preset-env"],
    "plugins": [["@babel/transform-runtime"]]
}
```

.babelrc is a file-relative configuration file, meaning independent configurations for subsections of an applications can be facilitated through the use of multiple .babelrc files.

## Running Dev Server
Now that we have configured both Babel and Webpack we are ready to run our application on the dev server. To utilise the webserver when the command `npm run start` is run the `start` property in the `scripts` object inside of the `package.json` file needs to be modified. By default it looks like the following:

```json
"scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
},
```

This code denotes what commands are run when `npm run [start | build | test | eject]` are run. To change `npm run start` to use the dev server the following line:

```javascript
 "start": "react-scripts start",
```

Should be changed to:

```javascript
"start": "webpack serve --mode development",
```

[Mode](https://webpack.js.org/configuration/mode/) by default is production, however we are testing this locally, therefore we set mode to development. This can also be specified directly in the `webpack.config.js` file.

## Test

You should now be able to run both applications on the dev server concurrently! I chose to run mine on ports 3000 & 3001. Just open the CLI and `npm run start` in both the `counter-app` & `pow2-app` directories.

## Sources
[1] https://webpack.js.org/concepts/  
[2] https://dev.to/jha/save-and-save-dev-why-you-should-know-the-difference-j7p  
[3] https://babeljs.io/docs/en/    
[4] https://blog.devgenius.io/reactjs-introduction-to-babel-and-jsx-642e420952c9  
[5] https://babeljs.io/docs/en/config-files
