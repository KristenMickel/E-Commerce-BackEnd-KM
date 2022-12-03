/*Refer to my category-routes.js" file for more in-depth notes explaining the components of my Javascript routes files.*/

const router = require('express').Router();
const { Tag, ProductTag, Product } = require('../../models');

/*This first route will retrieve all tags from the Tags model using the GET request method.
This route is not working correctly. See my comments in my models/index.js file since I believe my error is stemming from how my relationship is defined between my Product and Tag models/tables.*/
router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{ model: ProductTag }, { model: Product }],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

/*This second route will retrieve a specific tag from the Tag model using the GET request method.
This route is not working correctly. See my comments in my models/index.js file since I believe my error is stemming from how my relationship is defined between my Product and Tag models/tables.*/
router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: ProductTag }, { model: Product }],
    });

    if (!tagData) {
      res.status(404).json({ message: 'No tag found with that id!' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

/*This third route will create a new tag in the Tag model using the POST request method.*/
router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create({
      tag_name: "Snow gear"
  });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

/*This fourth route will update a tag in the Tag model using the PUT request method.*/
router.put('/:id', async (req, res) => {
  try {
    const tagData = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!tagData[0]) {
      res.status(404).json({ message: 'No tag with this id!' });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

/*This fifth route will delete a tag from the Tag model using the DELETE request method and the id of the tag that I want to delete.*/
router.delete('/:id', async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!tagData) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
