const router = require('express').Router();
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const usersController = require('../controllers/users');
const auth = require('../middlewares/auth');
const { validateSignUp, validateSignIn } = require('../middlewares/validate');
const NotFoundError = require('../errors/notFoundError'); // 404

router.post('/signup', validateSignUp, usersController.createUser); // email, password & name
router.post('/signin', validateSignIn, usersController.loginUser); // email, password -> return JWT

router.use('/users', auth, usersRouter);
router.use('/movies', auth, moviesRouter);

router.use(auth, () => {
  throw new NotFoundError('Запрашиваемая страница не существует');
});

module.exports = router;
