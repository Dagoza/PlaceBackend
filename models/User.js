const mongoose = require("mongoose");
const bcrypt = require("mongoose-bcrypt");
const Place = require("../models/Place"); // Modelo
const FavoritePlace = require("../models/FavoritePlace"); // Modelo

let userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },

  name: String,
  admin: {
    type: Boolean,
    default: false,
  },
});

userSchema.post("save", function (user, next) {
  console.log("Ejecutaré el post");

  User.count({}).then((count) => {
    if (count == 1) {
      /* Ejecuta el hook
                user.admin = true;
                user.save.then(next);
            */
      User.update({ _id: user._id }, { admin: true }).then((result) => next());
    } else {
      next();
    }
  });
});

userSchema.virtual('places').get(function(){
  return Place.find({'_user': this._id})
}) // Los virtuales pueden: Obtener datos y enviarlos

userSchema.virtual('favorites').get(function(){
  return FavoritePlace.find({'_user': this._id},{'_place': true})
  .then(favorites =>{
    console.log(favorites);
    let placeIds = favorites.map(fav => fav._place)
    console.log(placeIds);
    return Place.find({"_id": {$in: placeIds} })
  })
}) // Los virtuales pueden: Obtener datos y enviarlos

userSchema.plugin(bcrypt);
let User = mongoose.model("User", userSchema);

module.exports = User;
