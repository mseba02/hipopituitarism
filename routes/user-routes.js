const express = require('express');
const router = express.Router();

const userController = require('../controlers/user-controller');

// custom routes
// router.get('/', userController.getUsers);
router.post('/me', userController.getMe);
router.post('/signup', userController.signUp);
router.post('/login', userController.login);

// export
module.exports = router;