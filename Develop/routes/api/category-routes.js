/*I don't technically need Express to run Sequelize because it runs in node.
Express is what you use to make a server and node is what you use to run JS outside of the browser.
Sequelize will run in node so you don't need express.*/

/*For all of my routes, I use async-await. Per class, this is superior because, when we don't use async-await and we work with a Promise, then we have to use ".then". But, we don't know when our methods will finish - so, with ".then", we are just telling our program that when the method it is running finishes, then run this next function. But, that can get to be confusing when there are multiple layers, each with a ".then", and you can end up having something run before another function that it should not come before. But, when we use async-await, we are forcing Javascript to run like other languages do and to run things in sequential order.
Putting the "async" keyword in front of the function makes it an asynchronous function. Then, putting "await" inside of the function is saying to "wait until this is done before you move onto the next line", which forces Javascript to wait until each line is done.
When we use ".then", it's because we don't know when the function will finish executing since it's essentially giving us back a Promise, and you can think of a Promise as a value that will be available at some point in the future but we don't know when. So, we are saying that "when you are done, execute this" and the way we do that is to put a ".then".*/

const router = require('express').Router();

/*Here, I am using object destructuring to import my two related models by name.
It is cleaner to do this on one line instead of having two lines of "require".*/
const { Category, Product } = require('../../models');

/*This first route will retrieve all categories from the Category model using the GET request method.
This route is equivalent to saying "SELECT * FROM Category" in regular SQL.
This route also does the equivalent of a JOIN to the Product model/table via "include" so that when you select a specific category, you should also get the products assigned to that category back in your results.*/
router.get('/', async (req, res) => {
  //Use try-catch to handle the errors.
  try {
    //This stores the categoryData in a variable once the Promise is resolved.
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });
    //200 status means the request was successful.
    res.status(200).json(categoryData);
  } catch (err) {
    //500 status refers to an internal server error.
    res.status(500).json(err);
  }
});

/*This second route will retrieve a specific category from the Category model using the GET request method.
This route is equivalent to adding a conditional WHERE clause to your SELECT statement like "SELECT * FROM Category WHERE {condition}".*/
router.get('/:id', async (req, res) => {
  try {
    //This is finding a single category by its primary key.
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

/*This third route will create a new category in the Category model using the POST request method.
This is equivalent to doing an "INSERT INTO" in regular SQL where a new row will get added to the Catgory model containing the details of the new category that you enter into the JSON body of your request.
Sequelize will take the data that I provide and will create the INSERT INTO statement for me, adding the data I give it into the Category table as an object.*/
router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

/*This is an alternative way to create a category. You can either add the details of the new product you want to add in the JSON body of the request you send or you can add them here as shown below.*/
router.post('/sweater', async (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create({
      category_name: "Sweaters"
  });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

/*This fourth route will make an update to an existing category in the Category model using the PUT request method and the id of the category that I want to change.
This is equivalent to saying "UPDATE Category SET {column you want to change} = {value you want to change it to} WHERE {condition that needs to be met}" like "UPDATE Category SET category_name = 'Blue sweaters' WHERE id = 4".*/
router.put('/:id', async (req, res) => {
  try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!categoryData[0]) {
      res.status(404).json({ message: 'No category with this id!' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

/*This fifth route will delete a category from the Category model using the DELETE request method and the id of the category that I want to delete.*/
router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
