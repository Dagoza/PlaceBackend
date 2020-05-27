const express = require('express');

const visitsController = require('../controllers/VisitsController');
const placesController = require('../controllers/PlacesController');
const authenticatorOwner = require('../middlewares/authenticateOwner');

let router = express.Router();

router.route('/:id/visits')
.get(placesController.find, visitsController.index)
.post(placesController.find, visitsController.create)

router.route('/:id/visits/:visit_id')
.delete(visitsController.find, authenticatorOwner, visitsController.destroy)

module.exports = router;

