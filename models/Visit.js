const mongoose = require("mongoose");
const Place = require("../models/Place"); // Modelo
const mongoosePaginate = require('mongoose-paginate'); // Mostrar resultados con cursores por páginas

const REACTIONS = ['like', 'love', 'disappintment','yummy','anger','disgust']

let visitSchema = new mongoose.Schema({
    _user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    _place: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Place',
        required: true
    },
    observation: String,
    reaction:{
        type: String,
        enum: REACTIONS
    }
     
}); 

visitSchema.statics.forUser = function(userId, page){
    return Visit.paginate({"_user": userId},{page:page,limit:5, sort: {"_id": -1}})
}

visitSchema.plugin(mongoosePaginate);
let Visit = mongoose.model("Visit", visitSchema);

module.exports = Visit;
