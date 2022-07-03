# Day 1: Creating Component Applications

> Please ensure that you have checked the prerequisites in the day 0 section of the documentation
 
## Creating a React Application with a Counter

To create a generic react app enter the following commands below in the terminal:

```
npx create-react-app counter-app
cd counter-app
npm run start
```

**Congratualtions you have just created a react app!**

You should see the following in you browser:

![The basic create-react-app GUI](Tutorial_Docs\images\create-react-app_screenshot.png "Basic react GUI")

### Clean Up

The new react app comes with some code that we will not require. Inside of the `src` folder you can delete the `logo.svg`, `App.test.js`, `reportWebVitals.js` and `setupTests.js` files.

In the `index.js` file, remove the lines:
``` javascript
import reportWebVitals from './reportWebVitals';

...

reportWebVitals();
```

This will fix the module not found error caused by deleting the `reportWebVitals.js` file.

Additionally, in the `public` folder you can go ahead and delete all of the files except for `index.html` and `manifest.json`. Remove the unnecessary code from `index.html`, it should look as follows:

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

Next, you can replace all the lines of code inside the `<div className="App"></div>` tags with `<h1>Counter App</h1>`. Your `App.js` file should look like the following:

```javascript
import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
        <h1>Counter</h1>
    </div>
  );
}

export default App;
```

You should see only your heading "Counter App".

### Creating the Counter Component

In our new react app create a folder called `components` in the `src` folder. This is where we will create all our components that will be used by the `App.js` file.
  
In the `components` folder create a new file called `Counter.js`. 
You can copy the following code into the `Counter.js` file:

```javascript
import React, {useState} from 'react';

const Counter = () => {
    const [count, setCount] = useState(0);

    return (
        <div>
            <h3>Counter</h3>
            <p>The count is: {count}</p>
            <button onClick={() => setCount(count + 1)}>
                Increase
            </button>
            <button onClick={() => setCount(count - 1)}>
                Decrease
            </button>
        </div>
    );
};

export default Counter;
```
 
Next, we will need to import the `Counter` component to the `App.js` file to be rendered to the react app. Your `App.js` file should look like the following:
```javascript
import React from 'react';
import './App.css';

//Components
import Counter from './components/Counter';

function App() {
  return (
    <div className="App">
      <h1>Counter App</h1>
      <Counter />
    </div>
  );
}

export default App;
```

Now if you reload the app in your browser you should be able to see the component being displayed and be able to change the value of count by clicking the buttons.

***Great work! That is the first app in the books on to the second!***

## Creating a React Application with a powers of 2 component
Next we will create the second react application with a component that outputs powers of two. Similarly to the previous section, we will create a react app entering the following commands into the terminal:

```
npx create-react-app pow2-app
cd pow2-app
npm run start
```

>Please not that if you have the `counter-app` running it will fail to run the `pow2-app` as there cannot be multiple applications using the same port, in this case port 3000. Please shut `counter-app` before entering the commands above.

And once again we will remove the cluter by deleting the files:

1. `App.test.js`
2. `logo.svg`
3. `reportWebVitals.js`
4. `setupTest.js`
5. `Favicon.ico`
6. `logo192.png`
7. `logo512.png`
8. `robots.txt`

Please ensure that you modify the  `App.js`, `index.js` and `index.html` files in line with the previous section to fix all errors caused by removing the redundant files.

Now we create the `components` folder in the `src` folder of our new react app. Inside the `components` folder create a new file called `Pow2.js`. It should look as follows:
```javascript
import React, {useState} from "react";

const Pow2 = () => {
    const [pow2, setPow2] = useState(1);

    return(
        <div>
            <h3>Powers of 2</h3>
            <p>Power of 2: {Math.pow(2, pow2)}</p>
            <button onClick={() => setPow2(pow2 + 1)}>
                Increase
            </button>
            <button onClick={() => setPow2(pow2 - 1)}>
                Decrease
            </button>
        </div>
    )
}

export default Pow2;
```

Once again the component file should be imported by `App.js` to be rendered to the page. 

```javascript
import React from 'react';
import './App.css';

//Components
import Pow2 from './components/Pow2';

function App() {
  return (
    <div className="App">
      <h1>Pow 2 App</h1>
      <Pow2 />
    </div>
  );
}

export default App;

```

You should now be able to change the power of 2 that is displayed by the component using the buttons.

***Congratulations you have completed the Day 1!***