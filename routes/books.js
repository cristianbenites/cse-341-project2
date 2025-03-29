const router = require('express').Router();
const { isAuthenticated } = require('../middleware/authenticate');

const booksController = require('../controllers/books');
const { bookValidationRules, validate } = require('../validator/bookValidator');

router.get('/books', booksController.getAll);
router.get('/books/:id', booksController.getById);
router.post('/books', isAuthenticated, bookValidationRules(), validate, booksController.store);
router.put('/books/:id', isAuthenticated, bookValidationRules(), validate, booksController.update);
router.delete('/books/:id', isAuthenticated, booksController.deleteBook);

module.exports = router;
