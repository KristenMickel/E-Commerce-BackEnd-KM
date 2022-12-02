/*I am creating my sequelize model/table for my different products.*/

const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

/*I am creating a new class "Product" by extending the "Model" class from sequelize.
This lets me create a new model called "Product".*/
class Product extends Model {}

//I am initializing/setting up my Product model.
Product.init(
  {
    //"id" will be my primary key. See my "Category.js" file for more explanatory notes.
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(10, 2), //This column will be of the sequelize decimal data type and can display up to a total of 10 numerical places, 2 of which will be decimals (the scale) and 8 of which will be integers (or the position).
      allowNull: false,
      validate: {
        isDecimal: true,
      },
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false, 
      defaultValue: 10, //This is a sequelize option that defaults the value for this column to 10 if no values are entered for it. In sequelize, missing values will automatically be set to "null" unless you specify a value for them like I did here.
      validate: {
        isNumeric: true, //This is one type of sequelize validation. Per the sequelize documentation, model validators allow you to specify format/content/inheritance validations for each attribute of the model. You can call validate() to manually validate an instance. In this case, I am manually validating that the "stock" values are of a numeric data type.
      },
    },
    /*This column will store a reference of the 'id' column in the Category model/table.
    This is one component needed in sequelize to do what is essentially a JOIN between tables in regular SQL.
    In this part of the Product.js model file, I am establishing the "category_id" column in the Product model/table as a foreign key that references the "id" column in the Category model/table. 
    In regular SQL, this would be part of the construction that says something like "SELECT * FROM Category JOIN Product ON Category.id = Product.category_id".*/
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'category',
        key: 'id',
        unique: true
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;

