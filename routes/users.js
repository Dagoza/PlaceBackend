const express = require('express');

const usersController = require('../controllers/UsersController')
const sessionsController = require('../controllers/SessionsController')

let router = express.Router();

router.route('/')
// .get(usersController.myPlaces),
.post(usersController.create,
    sessionsController.generateToken,
    sessionsController.sendToken)
// .delete(usersController.destroyAll), por seguridad se quita

module.exports = router;

