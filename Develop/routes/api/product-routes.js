/*Refer to my category-routes.js" file for more in-depth notes explaining the components of my Javascript routes files.*/

const router = require('express').Router();
const { Product, Category, ProductTag, Tag } = require('../../models');

/*This first route will retrieve all products from the Product model using the GET request method.
This route is not working correctly. See my comments in my models/index.js file since I believe my error is stemming from how my relationship is defined between my Product and Tag models/tables.*/
router.get('/', async (req, res) => {
  try {
    const productData = await Product.findAll({
      include: [{ model: Category }, { model: ProductTag }, { model: Tag }],
    });
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

/*This second route will retrieve a specific product from the Product model using the GET request method.
This route is not working correctly. See my comments in my models/index.js file since I believe my error is stemming from how my relationship is defined between my Product and Tag models/tables.*/
router.get('/:id', async (req, res) => {
  try {
    const productData = await Product.findByPk(req.params.id, {
      include: [{ model: Category }, { model: ProductTag }, { model: Tag }],
    });

    if (!productData) {
      res.status(404).json({ message: 'No product found with that id!' });
      return;
    }

    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

/*This third route will create a new product in the Product model using the POST request method.
I am not clear on why this provided code is not using async-await.*/
router.post('/', (req, res) => {
  //This provide template is what you post in the JSON body when sending the request.
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
  Product.create(req.body)
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

/*This fourth route will update a product in the Product model using the PUT request method.
I am not clear on why this provided code is not using async-await.*/
router.put('/:id', (req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      // find all associated tags from ProductTag
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
      // get list of current tag_ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      // create filtered list of new tag_ids
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      // figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

/*This fifth route will delete a product from the Product model using the DELETE request method and the id of the product that I want to delete.*/
router.delete('/:id', async (req, res) => {
  const productData = await Product.destroy({
    where: {
      id: req.params.id,
    },
  });

  return res.json(productData);
});

module.exports = router;
