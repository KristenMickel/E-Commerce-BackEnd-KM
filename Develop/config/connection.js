/*This set-up comes from the ORM Module mini-project + GitHub documentation.*/

/*I am creating my sequelize object which is my database connection.
The first thing I need to do when using sequelize is to import it.
"Sequelize" is a created as a class here - hence the capitalization.*/
const Sequelize = require('sequelize');

/*I am enabling access to the variables saved in my .env file. 
This .config finds the .env file, reads it, and then attachs an object called "env" to the process object.
Process is an object that exists in node - same concept as "window" in the browser.*/
require('dotenv').config();

/*I have to use let so that my values defined inside of the conditional block below do not exist outside of it.*/
let sequelize;

/*This is using environment variables to connect to the database.
Per the GitHub documentation on the JawsDB add-on (for MySQL), it makes a new remote database on Heroku and tells the app to connect to that one when deployed but still use the local database when running locally. 
So, when the app is deployed, it will have access to Heroku's process.env.JAWSDB_URL variable and use that value to connect. Otherwise, it will continue using the localhost configuration.
This conditional block below creates a new Sequelize object and either sets it to the JawsDB if deployed on Heroku or it sets it to the variables used for the database name, username, and password in the .env file if running on your local machine.*/
if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306
    }
  );
}

/*I am exporting my sequelize connection which I will then import into my server.js file*/
module.exports = sequelize;