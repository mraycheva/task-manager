# Overview

A React application making use of class and functional components and Redux for users and tasks management.

The application has the following features:
* **CRUD** operations with the entities;
* **filtering** (searching) of the entities;
* **authentication** and **authorization**.

The user roles being granted and their corresponding rights are:
* **non-authenticated**: can register and login;
* **non-admin** (default authenticated) - can:
    * view and filter all the users and tasks;
    * create tasks;
    * update and delete their own tasks;
* **admin** (authenticated) - can do everything the non-admin user can, plus:
    * create, update and delete users (upon user deletion all the tasks of the user being deleted are deleted as well);
    * update and delete other users' tasks.
##

## Exploiting the application

In order **to start the application** run the first two of the commands listed below.

There are several options for **obtaining credentials** to log in the system:
* register via the application's UI;
* manually add a record with the desired user's information in the
`db/db.json` file or
* use the credentials of one of the sample users already provided there.

Note: users created upon registration are non-admin.
They could be promoted to admins only by other admin users
or, alternatively, manually in the `db/db.json` file.
Another way of exploring the admin panel would be
to edit the `loggedUser`'s `admin` property in the local storage of your browser.  

##
###### This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm run json-server`

Runs a JSON server which uses a JSON file instead of a database for data persistence.<br />
Open [http://localhost:3005](http://localhost:3005) to view it in the browser.

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
