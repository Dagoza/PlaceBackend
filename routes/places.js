const express = require('express');

let router = express.Router();

const placesController = require('../controllers/PlacesController')
const authenticatorOwner = require('../middlewares/authenticateOwner');

router.route('/')
.get(placesController.index)
.post(placesController.multerMiddleware(),placesController.create, placesController.saveImage)

router.route('/:id') // Con wildcard
    .get(placesController.find,authenticatorOwner, placesController.show)
    .put(placesController.find,authenticatorOwner, placesController.update)
    .delete(placesController.find, authenticatorOwner, placesController.destroy)


module.exports = router;

