const moviesRouter = require('express').Router();
const moviesController = require('../controllers/movies');
const { validateAddMovie, validateDeleteMovie } = require('../middlewares/validate');

moviesRouter.get('/', moviesController.getMovies);
moviesRouter.post('/', validateAddMovie, moviesController.addMovie); // country, director, duration, year, description, image, trailer, nameRU, nameEN и thumbnail, movieId
moviesRouter.delete('/:_id', validateDeleteMovie, moviesController.deletetMovie);

module.exports = moviesRouter;
