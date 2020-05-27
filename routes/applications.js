const express = require('express');

const applicationsController = require('../controllers/ApplicationsController');
const authenticateAdmin = require('../middlewares/authenticateAdmin');
const findUser = require('../middlewares/findUser');
const jwtMiddleware = require('express-jwt');
const secrets = require("../config/secrets");

let router = express.Router();

router.all('*', jwtMiddleware({secret: secrets.jwtSecret}), findUser, authenticateAdmin)

router.route('/')
.get(applicationsController.index)
.post(applicationsController.create)

router.route('/:id')
.delete(applicationsController.find, applicationsController.destroy)

module.exports = router;

