# AD Server API

-   receives offer request
-   finds the offer
-   creates click object
-   creates traffic object

## To Run the Project

-   Clone the Github Repository
-   ensure node and npm are installed
-   Run "npm install" to install all the dependancies
-   Run "npm start" to run the server

## Optional

-   to run the dev script i.e. "npm run dev" insted of "npm start," you need to install nodemon as a dev dependancy, which watches and restarts the server on changes.

## ENVIRONMENT VARIABLES (set them in ".env" file or load them in the environment)

PORT=5000 (specify the port where to run the app)
NODE_ENV=development (used to configure logging)
LOGGING_LEVEL=debug (could be: debug,info,error,warning, etc. refer to winston logger documentation)
HANDLE_UNEXPECTED_EXCEPTIONS_IN_LOGGER=false (Refer to winston logger documentation)
