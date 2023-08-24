const {
  celebrate,
  Joi,
} = require('celebrate')

const emailRegex = /^(.+)@(.+)$/
const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/

const validateSignUp = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().regex(emailRegex),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    // about: Joi.string().min(2).max(30),
    // avatar: Joi.string().regex(urlRegex),
  }),
})

const validateSignIn = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().regex(emailRegex),
    password: Joi.string().required().min(8),
  }),
})

const validateUpdateUserInfo = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().regex(emailRegex),
    name: Joi.string().required().min(2).max(30),
  }),
})

const validateAddMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(urlRegex),
    trailer: Joi.string().required().regex(urlRegex),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().required().regex(urlRegex),
    movieId: Joi.number().required(),
  }),
})

const validateDeleteMovie = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().hex().length(24).required(),
  }),
})

module.exports = {
  validateSignUp,
  validateSignIn,
  validateUpdateUserInfo,
  validateAddMovie,
  validateDeleteMovie,
}
