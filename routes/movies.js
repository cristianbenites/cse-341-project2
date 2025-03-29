const router = require('express').Router();
const { isAuthenticated } = require('../middleware/authenticate');

const moviesController = require('../controllers/movies');
const { movieValidationRules, validate } = require('../validator/movieValidator');

router.get('/movies', moviesController.getAll);
router.get('/movies/:id',  moviesController.getById);
router.post('/movies', isAuthenticated, movieValidationRules(), validate, moviesController.store);
router.put('/movies/:id', isAuthenticated, movieValidationRules(), validate, moviesController.update);
router.delete('/movies/:id', isAuthenticated, moviesController.deleteMovie);

module.exports = router;
