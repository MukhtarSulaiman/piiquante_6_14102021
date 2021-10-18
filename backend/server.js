const http = require('http'); // A native module that allows us to send http requests
const app = require('./app');

// Sets the default envirement variable port for the deployement platform otherwise we listen to 3000 port
app.set('port', process.env.PORT || 3000);
// It creates the server for our application
const server = http.createServer(app); 

server.listen(process.env.PORT || 3000);