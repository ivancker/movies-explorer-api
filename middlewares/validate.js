const {
  celebrate,
  Joi,
} = require('celebrate');

const emailRegex = /^(.+)@(.+)$/;
const urlRegex = /^(http:\/\/|https:\/\/)(www\.)?([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.[a-zA-Z]{2,}([^\s]*)$/;

const validateSignUp = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().regex(emailRegex),
    password: Joi.string().required().min(8),
    name: Joi.string().required().min(2).max(30),
  }),
});

const validateSignIn = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().regex(emailRegex),
    password: Joi.string().required().min(8),
  }),
});

const validateUpdateUserInfo = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().regex(emailRegex),
    name: Joi.string().required().min(2).max(30),
  }),
});

const validateAddMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(urlRegex),
    trailerLink: Joi.string().required().regex(urlRegex),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().required().regex(urlRegex),
    movieId: Joi.number().required(),
  }),
});

const validateDeleteMovie = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().hex().length(24).required(),
  }),
});

module.exports = {
  validateSignUp,
  validateSignIn,
  validateUpdateUserInfo,
  validateAddMovie,
  validateDeleteMovie,
};
