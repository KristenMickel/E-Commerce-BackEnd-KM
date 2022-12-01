/*I am creating my sequelize model/table for my product tags.
To be honest, I was not initially certain purpose the product tags served in this assignment since the Category model/table already organizes the products according to category.
But, if I look up "product tags" in relation to E-Commerce sites, "product tags" appear to be keywords for product identification when searching for items.*/

const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

//This creates my Tag model/table.
class Tag extends Model {}

//I am initializing/setting up my Tag model.
Tag.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    tag_name: {
      type: DataTypes.STRING //This creates the product classification (i.e. "tag") name for the different products.
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'tag',
  }
);

module.exports = Tag;
