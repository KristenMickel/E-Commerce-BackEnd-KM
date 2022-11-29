/*I am creating my sequelize model in order to categorize the different products.*/

/*First, I need to require/import the "Model" and "Datatypes" classes from sequelize.*/
const { Model, DataTypes } = require('sequelize');

/*Next, I need to require/import my sequelize database connection according to the set-up in my connection.js file.*/
const sequelize = require('../config/connection.js');

/*I am creating a new class "Category" by extending the "Model" class from sequelize.
This lets me create a new model called "Category".
Each model in sequelize is the equivalent of a table in SQL.*/
class Category extends Model {}

/*"init" comes from the Model class.
By using "init", I am passing everything into my model.
The first parameter I give to it are my columns, which are defined in one object (the first object below).*/
Category.init(
  {
    /*This "id" column will be my primary key.*/
    id: {
      type: DataTypes.INTEGER, //The database data type is an integer because it will not have any decimals.
      allowNull: false, //This will prevent null values from being allowed for this column.
      primaryKey: true, //This makes the "id" column the primary key.
      autoIncrement: true //This makes the integer values increment by 1 with each row created since the "id" values will be automatically created.
    },
    category_name: {
      type: DataTypes.STRING, //This column will be of the string data type since it will contain the category names that products will be assigned to.
      allowNull: false
    }
  },
  /*This second parameter I am giving to it is an object containing my sequelize connection, whether or not I have timestamps, if I want underscores to be used in my column names, and the name for my new model.*/
  {
    sequelize,
    timestamps: false,
    freezeTableName: true, //This prevents an "s" from being added to my table name.
    underscored: true,
    modelName: 'category',
  }
);

//I am exporting my Category model.
module.exports = Category;
