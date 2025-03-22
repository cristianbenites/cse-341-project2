const router = require('express').Router();

const moviesController = require('../controllers/movies');
const { movieValidationRules, validate } = require('../validator/movieValidator');

router.get('/movies', moviesController.getAll);
router.get('/movies/:id', moviesController.getById);
router.post('/movies', movieValidationRules(), validate, moviesController.store);
router.put('/movies/:id', movieValidationRules(), validate, moviesController.update);
router.delete('/movies/:id', moviesController.deleteMovie);

module.exports = router;
