/*This file is the other part needed to JOIN the models/tables besides the "references" in the model files.
For relational database management systems, like MySQL, you need to define the relationships between the tables.
In this file, I am able to better define those relationships such as one-to-one, one-to-many, and many-to-many.
Category has a one-to-many relationship with Product because each Category can include many Products but each Product will only have one Category.
Product appears to have a many-to-many relationship with ProductTag because each Product has multiple ProductTags and each ProductTag has multiple Products.
Tag is just an informational table with static, preset values - hence needing a ProductTag table.*/

/*Here, I am importing the 4 models/tables that will contain the data for my E-Commerce site.*/
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

/*Products belongsTo Category: "belongsTo" is equivalent to "hasOne".
This is saying that each Product will have/belong to a single Category.*/
Product.belongsTo(Category, {
  foreignKey: 'category_id',
});

/*Many Products can be classified under one Category - hence using "hasMany" for Category because it will have many Products.*/
Category.hasMany(Product, {
  foreignKey: 'category_id', //This foreign key matches what I used in the "references" section in the Product.js file.
  onDelete: 'CASCADE', //This is saying that when I delete a Category, I should delete the associated Products.
});

/*As I mentioned above, each Product can have many Tags via the ProductTags model/table, so "belongToMany" should be used.
I believe I have an error here that is preventing my Product GET routes from working, perhaps something to do with the Unique Constraint.*/
Product.belongsToMany(Tag, {
  through: {
    model: ProductTag, //This format was used in the Mini-Project for the ORM module. It appears to be necessary when you use a mapping table.
    unique: false
  },
  /*An alias is typically used to re-name a column, particularly a column formed via an aggregate function.*/
  as: 'Product_Tags'
});

/*As I mentioned above, each Tag can have many Products via the ProductTags model/table, so "belongToMany" should be used.
I believe I have an error here that is preventing my Product GET routes from working, perhaps something to do with the Unique Constraint.*/
Tag.belongsToMany(Product, {
  through: {
    model: ProductTag,
    unique: false
  },
  as: 'Tag_Products'
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
