const router = require('express').Router();

const booksController = require('../controllers/books');
const { bookValidationRules, validate } = require('../validator/bookValidator');

router.get('/books', booksController.getAll);
router.get('/books/:id', booksController.getById);
router.post('/books', bookValidationRules(), validate, booksController.store);
router.put('/books/:id', bookValidationRules(), validate, booksController.update);
router.delete('/books/:id', booksController.deleteBook);

module.exports = router;
