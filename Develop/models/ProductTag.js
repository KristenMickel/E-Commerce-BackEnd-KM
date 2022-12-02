/*I am essentially creating what would be considered a "mapping table" in SQL but in sequelize.
This mapping table maps the ids between two of the three main tables in order to make it easier to JOIN the data they contain.*/

const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

/*I am creating a new class "ProductTag" by extending the "Model" class from sequelize.
This lets me create a new model called "ProductTag".*/
class ProductTag extends Model {}

//I am initializing/setting up my ProductTag model.
ProductTag.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    /*This column will store a reference of the 'id' column in the Product model/table.*/
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'product',
        key: 'id',
        unique: false
      }
    },
    /*This column will store a reference of the 'id' column in the Tag model/table.*/
    tag_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'tag',
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
    modelName: 'product_tag',
  }
);

module.exports = ProductTag;
