const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

//This creates my Tag model/table.
class Tag extends Model {}

//This creates the fields/columns for my Tag model/table.
Tag.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    tag_name: {
      type: DataTypes.STRING
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
