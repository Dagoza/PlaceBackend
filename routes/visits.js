const express = require('express');

const visitsController = require('../controllers/VisitsController');
const authenticatorOwner = require('../middlewares/authenticateOwner');
const jwtMiddleware = require('express-jwt');
const secrets = require("../config/secrets");

let router = express.Router();



router.route('/')
.get(jwtMiddleware({secret: secrets.jwtSecret}),
    visitsController.index)
.post(visitsController.create)

router.route('/:visit_id')
.delete(visitsController.find, authenticatorOwner, visitsController.destroy)

module.exports = router;

