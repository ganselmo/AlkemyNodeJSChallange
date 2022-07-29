const Router = require("express");
const { login, register } = require("../../controllers/auth.controller");

const { check } = require('express-validator');
const { validationError } = require("../../middlewares/validationError.middleware");

const router = Router();

router.post('/login', [
    check('email', 'email.required').not().isEmpty(),
    check('email', 'email.not_valid').isEmail(),
    check('password', 'password.required').not().isEmpty()],
    validationError,
    login);

router.post('/register', [
    check('email', 'email.required').not().isEmpty(),
    check('email', 'email.not_valid').isEmail(),
    check('firstName', 'firstName.required').not().isEmpty(),
    check('lastName', 'lastName.required').not().isEmpty(),
    check('password', 'password.required').not().isEmpty(),
    check('password', 'password.too_short').isLength({ min: 8 }),
    check('password', 'password.too_long').isLength({ max: 20 }),
    check('password', 'password.is_weak').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,20}$/),
    validationError
], register);

module.exports = router;