const mongoose = require('mongoose')
const validator = require('validator')

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: Stryng,
    required: true,
  },
  description: {
    type: Stryng,
    required: true,
  },
  image: {
    type: Stryng,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Такого URL не бывает',
    },
  },
  trailerLink: {
    type: Stryng,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Такого URL не бывает',
    },
  },
})

module.exports = mongoose.model('movie', movieSchema)