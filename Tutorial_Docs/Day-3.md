# Sharing Components using Module Federation

## Module Federation Plug-in
The [ModuleFederationPlugin](https://webpack.js.org/plugins/module-federation-plugin/) allows applications to provide or consume components/modules from other independent apps at runtime.<sup>[1]</sup>  

This is the plug-in we will be using to create the micro frontend. Unlike the Html plug-in, this plug-in requires no installation. At the beginning of your `webpack.config.js` files in both the `counter-app` & `pow2-app` add the following lines:

```javascript
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const deps = require("./package.json").dependencies;
...
```

The first line declares the plug-in and the second retrieves the dependencies of the build which are required when sharing modules. More on this later.

Next in the `plugins` section in `module.exports` we need to specify the behaviour for the `counter-app` & `pow2-app`. These applications will be sharing the `Counter` and `Pow2` components respectively, this is the behaviour we will be defining in the webpack config file.

First for the `counter-app`, we want to add the code below:

```javascript
plugins: [
    new ModuleFederationPlugin({
        name: 'counter',
        filename: "remoteEntry.js",
        library: { type: 'var', name: 'counter' },
        exposes: {
            "./Counter": "./src/components/Counter.js"
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
```

Examining the code we can see that the module federation plug-in takes a few parameters. `name` can be any value, it describes the name of this shared module and will be referenced by the container when consuming the shared content. `filename` is the name of the manifest that module federation creates to expose all the modules being shared by the application. `library` refers to the `remoteEntry.js` file to ensure it is accessed properly. `exposes` is an object that lists all the different modules that will be shared in the `remoteEntry.js` file that can be consumed by the container application. Finally, `shared` specifies the versions of shared libraries between the remote app exposing content and the container app consuming content.

We will now do something similar for the `webpack.config.js` file for `pow2-app`. The only difference being the `name`. `library` and `exposes` props.

```javascript
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
```

### Bootstrap.js

Perfect our two apps are exposing the functionality for the container application to consume. The next step is to create the `bootstrap.js` file for both of applications. The `bootstrap.js` file is need to avoid `shared module not available for eager consumption error`. Read more about it [here](https://webpack.js.org/concepts/module-federation/#uncaught-error-shared-module-is-not-available-for-eager-consumption).   

Create a `bootstrap.js` file in the `src` file of both the `counter-app` & `pow-app` directories. Copy & paste the code in `index.js` into `bootstrap.js`. Both `bootstrap.js` files should look as follows:

```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

And then the we will import `bootstrap` into both of the `index.js` files and they should look as follows:

```javascript
import("./bootstrap");
```

Finally it is time to create the `container-app`. You may experience some deja-vu with the next steps.

## Creating Container App

First create a new react app in you `root` directory called `container-app`.

```
npx create-react-app container-app
```

Now it's clean-up time. Inside of the `src` folder you can delete the `logo.svg`, `App.test.js`, `reportWebVitals.js` and `setupTests.js` files.

In the `index.js` file, remove the lines:

``` javascript
import reportWebVitals from './reportWebVitals';

...

reportWebVitals();
```

Now we can delete the files we don't need in `public`, which is everything except the `index.html` and `manifest.json`. Ensure you remove the unnecessary code from `index.html`, it should look as follows:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>React App</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>
```

Next, you can replace all the lines of code inside the `<div className="App"></div>` tags with `<h1>Container App</h1>`. Your `App.js` file should look like the following:

```javascript
import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
        <h1>Container</h1>
    </div>
  );
}

export default App;
```

You should see only your heading "Counter App" when you run the application.

## Consuming Shared Modules in the Container App

We are going to need webpack in the container application to access the module federation plug-in.

```
npm install webpack webpack-cli html-webpack-plugin --save-dev
```

Now we can create the `webpack.config.js` file for the the `contain-app`. 

```javascript
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const deps = require("./package.json").dependencies;

module.exports = {
    entry: "/src/index.js",
    output: {
      publicPath: "http://localhost:8080/",
    },
    resolve: {
      extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
    },
    devServer: {
      open: true,
      port: 8080,
      historyApiFallback: true,
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx|js|jsx)$/,
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
        name: 'example',
        filename: "remoteEntry.js",
        exposes: {},
        remotes: {
            counter: "counter@http://localhost:3000/remoteEntry.js",
            pow2: "pow2@http://localhost:3001/remoteEntry.js"
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
```

As can be seen above the container will run on port 8080. The major changes to this config file are within the `ModuleFederationPlugin`, the container does not expose anything, however it contains two `remotes`. These `remotes` are out two react applications, the `container-app` hooks into the `remoteEntry` manifests of our `counter` and `pow2` applications and will have access to the content exposed by them. This is how the container application is able to collate all the content and give a single page feel to the user despite it being composed of multiple applications.

There are still a few packages we need to install, the `babel` packages and loaders.

```
npm install @babel/preset-env @babel/preset-react babel-loader
npm install css-loader file-loader html-webpack-plugin style-loader --save-dev
```

Now we can begin to write the code in the `App.js` file of our `container-app` to display the components we have consumed for the other applications. The modules are imported using lazy load as importing modules via module federation is an asynchronous operation.

```javascript
import React, {Suspense} from 'react';
import './App.css';

const CounterComponent = React.lazy(() => import("counter_app/Counter"));
const Pow2Component = React.lazy(() => import("pow2_app/Pow2"));

function App() {
  return (
    <div className="App">
      <h1>Container App</h1>
      <Suspense fallback={"Loading..."}>
        <CounterComponent />
        <Pow2Component />
      </Suspense>
    </div>
  );
}

export default App;
```

As with both the `container-app` & the `pow2-app` a `bootstrap.js` file needs to be created containing the contents of `index.js`. Additionally, as before the `index.js` file should import the `bootstrap.js` file.

Ensure you modify the `package.json` to use the devserver in line with the other two previous applications. You can now run you application and your frontend should contain the two components from the other two applications you have created. Please note that the `counter` and `pow2` applications must be running for the `container` to correctly display the content.

**CONGRATULATIONS! YOU HAVE JUST BUILT A MFE!**

## Sources
[1] https://webpack.js.org/plugins/module-federation-plugin/

