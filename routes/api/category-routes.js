const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = Category.findAll({
      include: [Product]
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = Category.findOne({ 
      where: {id: req.params.id}, 
      include: [Product]
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

router.post('/', (req, res) => {
  // create a new category
  try {
    const newCategory = Category.create(req.body);
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // updates category by id
	try {
		let updatedCategory = Category.update({
				where: {id: req.params.id,},
			}
		);

		if (!updatedCategory) {
			res.status(404).json({ message: 'No category found with that ID' });
			return;
		}

		res.status(200).json(updatedCategory);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  try {
    let deletedCategory = Category.destroy({
      where: { id: req.params.id }
    });
    if (!deletedCategory) {
      res.status(404).json({ message: 'No category with this id!' });
      return;
    }
    res.status(200).json(deletedCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
