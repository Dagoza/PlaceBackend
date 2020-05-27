const mongoose = require("mongoose");
const Place = require("../models/Place"); // Modelo

let favoriteSchema = new mongoose.Schema({
    _user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    _place: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Place',
        required: true
    }
}); 

let FavoritePlace = mongoose.model("FavoritePlace", favoriteSchema);

module.exports = FavoritePlace;
