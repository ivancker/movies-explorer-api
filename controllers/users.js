const bcrypt = require('bcryptjs')

const userModel = require('../models/users')
const { signToken } = require('../utils/jwtAuth')

const MONGO_DUPLICATE_KEY_ERROR = 11000
const SALT_ROUNDS = 10;

const NotFoundError = require('../errors/notFoundError') // 404
const BadRequestError = require('../errors/badRequestError') // 400
const ConflictError = require('../errors/conflictError') // 409
const UnauthorizedError = require('../errors/unauthorizedError') // 401