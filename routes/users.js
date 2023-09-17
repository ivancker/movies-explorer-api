const usersRouter = require('express').Router();
const usersController = require('../controllers/users');
const { validateUpdateUserInfo } = require('../middlewares/validate');

usersRouter.get('/me', usersController.getUserInfo); // get email & name
usersRouter.patch('/me', validateUpdateUserInfo, usersController.updateUserInfo); // update email & name

module.exports = usersRouter;
