// const movieModel = require('../models/movies');

// const BadRequestError = require('../errors/badRequestError'); // 400
// const NotFoundError = require('../errors/notFoundError'); // 404
// const ForbiddenError = require('../errors/forbiddenError'); // 403

// const getMovies = (req, res, next) => {
//   movieModel
//     .find({})
//     .then((movies) => {
//       res.status(200).send(movies);
//     })
//     .catch((err) => {
//       next(err);
//     })
// }

// const addMovie = (req, res, next) => {
//   const { country, director, duration, year, description, image, trailer, nameRU, nameEN, thumbnail } = req.body
//   const owner = req.user._id
//   const createdAt = Date().now
//   movieModel
//     .create({
//       country,
//       director,
//       duration,
//       year,
//       description,
//       image,
//       trailer,
//       nameRU,
//       nameEN,
//       thumbnail,
//       owner,
//       createdAt,
//     })
//     .then((movie) => {
//       res.status(201).send(movie)
//     })
//     .catch((err) => {
//       if (err.name === 'ValidationError') {
//         next(new BadRequestError('Переданы некорректные данные при создании карточки'))
//       } else {
//         next(err);
//       }
//     })
// }

// module.exports = {
//   getMovies,
//   addMovie,
//   // createCard,
//   // deleteCard,
//   // likeCard,
//   // dislikeCard,
// };