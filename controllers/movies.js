const movieModel = require('../models/movies');

const BadRequestError = require('../errors/badRequestError'); // 400
const NotFoundError = require('../errors/notFoundError'); // 404
const ForbiddenError = require('../errors/forbiddenError'); // 403

const getMovies = (req, res, next) => {
  const owner = req.user._id;
  movieModel
    .find({ owner })
    .then((movies) => {
      res.status(200).send(movies);
    })
    .catch((err) => {
      next(err);
    });
};

const addMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  const owner = req.user._id;
  const createdAt = Date().now;
  movieModel
    .create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      nameRU,
      nameEN,
      thumbnail,
      movieId,
      owner,
      createdAt,
    })
    .then((movie) => {
      res.status(201).send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании фильма'));
      } else {
        next(err);
      }
    });
};

const deletetMovie = (req, res, next) => {
  movieModel
    .findById(req.params._id)
    .orFail(() => new NotFoundError('Фильма с таким id не существует'))
    .then((data) => {
      if (data.owner.toString() !== req.user._id.toString()) {
        throw new ForbiddenError('Чужие фильмы нельзя удалять');
      }
      movieModel.findByIdAndDelete(req.params._id)
        .then(() => res.status(200).send({ message: 'Фильм удален' }))
        .catch((err) => {
          if (err.name === 'CastError') {
            next(new BadRequestError('Переданы некорректные данные'));
          } else {
            next(err);
          }
        });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getMovies,
  addMovie,
  deletetMovie,
};
