

# E-Commerce Website (Backend Work)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://www.gnu.org/licenses/MIT)

## Table of Contents
- [Description](#Description)
- [Installation](#Installation)
- [Usage](#Usage)
- [Tests](#Tests)
- [Features](#Features)
- [Contribution](#Contribution)
- [Email](#Email)
- [License](#License)

## Description
This assignment was to create the backend for an E-Commerce website using Express.js and Sequelize. Accordingly, it was necessary to create and seed the database models, containing the site’s products, as well as, how to categorize the different items available for sale. Tags were also required in order to aid and facilitate product searches. For the backend work, it was necessary to create GET, POST, PUT, and DELETE methods in order to be able to retrieve, create, update, and remove items from the database models. The reason for using Sequelize is that it is a promise-based ORM that deals with management versions of SQL databases, which makes it easier to handle exceptions and asynchronous functions. Using an ORM in general is a good practice since an ORM can map object syntax into a database schema and prevent the user from having to mix SQL and Javascript together in their programs. While I was able to get my POST, PUT, and DELETE request methods to work, I had trouble with my GET methods for the Product and Tag tables. Unlike my Catgory able, were my GET methwere successuethds fol, I think the relationship set-up between my Product and Tag tables is incorrect – hence leading to my inability to use the GET method for them.

## Installation
You will need to have Node.js, Express.js, Sequelize, and MySQL2 installed in order to run this program.

## Usage
Upon first run, you need to source the database schema.sql file in the db folder, then seed the database while in the main folder but referencing the seeds folder, run "npm i", and then run "node server.js" to start the server. Then, navigate to Insomnia or Postman and try executing the different GET, POST, PUT, and DELETE methods that I have saved for each model.

## Tests
I do not have any tests set up for this program.

## Features
See the Description section above.

## Contribution
To contribute, please contact questions@gmail.com.

## Email
To ask questions, please contact questions@gmail.com.

## Github
My GitHub account name is KristenMickel.

## License
Licensed under the [MIT](https://choosealicense.com/licenses/mit/) license
        