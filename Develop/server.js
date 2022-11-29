/*I am using Express.js to build my backend server, but I need to import it first and include it as a dependency in my package.json file since it is not built into node.js*/
const express = require('express');

/*This is importing the routes from my routes folder*/
const routes = require('./routes');

/*I need to require the path to my connection.js file which is where I will create my sequelize object.
I will export my sequelize connection at the end of my connection.js file. So, here, I am importing it*/
const sequelize = require('./config/connection');

/*I am creating my Express application*/
const app = express();

/*I am defining the port that I want the application to listen to.
When I deploy my App to Heroku in the cloud, then Heroku has its own ports to use - hence specifying "process.env.PORT". This is where the environment variables will go for Heroku.
But, when I run this program on my local machine, I want to use PORT 3001.*/
const PORT = process.env.PORT || 3001;

/*I am implementing Middleware so that Express.js can properly parse and understand the data and requests I am sending to it in the body.
Some requests might be in JSON and some might be url-encoded.
URL-encoded bodies are what is used when you submit a form. This Middleware will parse the URL-encoded data string into an object containing key-value pairs.*/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//I am turning on my routes.
app.use(routes);

/*This is turning on the connection to my database and server. 
I want to connect to my database before starting my Express.js server. 
Then I want to use sequelize.sync to actually make the connection. 
After my database is connected, I want to start my Express.js server.
I want to use "force: false" so that my data doesn't get dropped on every sync.
If I were to do "force: true", sequelize will actually create my tables for me.
The "sync" part is what creates things.
"force: false" will either add on top or not add anything at all.*/
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening!'));
});