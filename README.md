# Overview

This project is for the Tutorfly internship coding challenge. It is a functioning react application of a calculator. To get started run `yarn start` and go to [http://localhost:3000](http://localhost:3000). Then click any buttons to run the calculator functionality.

Some interesting features I implimented beyond the requirements:

Comprehensive edge case handling: The calculator is designed not to allow the user to input unparseable mistakes. This includes but is not limited to: preventing adding a decimal point when the current number is a decimal, preventing a close paren when there is no open parenthetical to close, preventing back to back operators, preventing pasting (see below) expressions that break any of these rules, preventing a close paren following an operator or an open paren following a number, preventing evaluating an expression with open parentheticals, or one that ends in an operator.

Parentheses and order of operations: The calculator is designed to evaluate any sequence of numbers, operators and parentheses that makes sense. It correctly evaluates expressions by first evaluating parentheses, then multiplication and division, and finally addition and subtraction.

Clear and Delete: As you might expect clear (AC), clears the value on screen to 0. DEL deletes the entire most recent term. If there is only one term it behaves the same as AC.

Trig Operations & Constants: The constants for pi and e are buttons so the user may insert them like a number into any expression. Sin, cos, and tangent are implimented, and there is a radian / degree button to switch which angle measure these use.

Copy & Paste: If at any time the user wants to copy what is on the calculator screen they may do so with the copy button. This will be remembered through clearing, and until the next time the user wishes to copy. At any time the user may paste what they have in memory. This will allow the user to more quickly use the calculator and save needed values.

Code that can be easily added to: Due to the implimentation of the stateList and stateItem classes, new functionality can easily be added. Any new binary operators, such as ^ (exponents), % (modulus), C (combinations), P (permutations) etc. can be added to the list of buttons, to the dictionary of operators, to the operation order, and to the evalBinOp function, and voila! It can be used on the calculator. Similarly singular operators such as log10, ln, can be added to these same places with its evaluation in the evalUniOp function and it will work too! operators that do not follow simple op x, or x op y, would require slightly more work, but could also be added with relative ease.

## Credit

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
