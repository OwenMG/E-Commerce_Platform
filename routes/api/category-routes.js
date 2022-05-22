const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoriesAll = await Category.findAll(
      {include: Product}
    );
    res.status(200).json(categoriesAll);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: Product
    })
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    await Category.create(req.body)
    .then((newCategory) => {
      res.json(newCategory);
    })
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    await Category.update(
      {
        category_name: req.body.category_name
      },
      {
        where: {
          id: req.params.id
        },
      }
    )
    .then((updatedBook)=> {
      res.json(updatedBook);
    })
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    Category.destroy({
      where: {
        id: req.params.id
      }
    })
    .then((deletedProduct)=>{
      res.json(deletedProduct);
    })
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
