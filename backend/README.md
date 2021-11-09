# Hot Takes #

This is the back-end server for Hot Takes project.

### Prerequisites ###

You will need to have Node and `npm` installed locally on your machine.

### Installation ###

Clone this repo. From within the project folder, run `npm install`. 
In order for this app to work, you have to use your own mongoDB database, you should therfore :
    -1  Create an `.env` file within a folder called `config` in the root of the project
    -2  Inside the .env file, create the following environment variables: 

        DATABASE_USERNAME = <your-database-username-access>
        DATABASE_PASSWORD = <your-database-password>
        DATABASE_NAME = <your-database-name>

Note: Replace only the values of these variables do not change their names !!!

You can then run the server with `node server`. 
The server should run on `localhost` with default port `3000`. If the
server runs on another port for any reason, this is printed to the
console when the server starts, e.g. `Listening on port 3001`.