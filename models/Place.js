const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate'); // Mostrar resultados con cursores por páginas
const uploader = require("../models/Uploader")
const slugify = require("../plugins/slugjify")
const Visit = require('../models/Visit')

let placeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        unique: true
    },
    description: String,
    acceptsCreditCard: {
        type: Boolean,
        default: false
    },
    address: String,
    coverImage: String,
    avatarImage: String,
    openHour: Number,
    closeHour: Number,
    _user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

placeSchema.methods.updateImage = function (path, imageType) {
    console.log(path);
    return uploader(path)
        .then(secure_url => {
            this.saveImageUrl(secure_url, imageType)
        })
}

placeSchema.methods.saveImageUrl = function (secure_url, imageType) {
    this[imageType + 'Image'] = secure_url;
    return this.save()
}

placeSchema.pre('save', function (next) {
    if (this.slug) return next();
    console.log("Generaré el slug");
    generateSlugAndContinue.call(this, 0, next)
})

placeSchema.virtual('visits').get(function(){
    return Visit.find({"_place":this._id}).sort('-id')
})

placeSchema.statics.validateSlugCount = function (slug) {
    return Place.count({ slug }).then(count => {
        if (count > 0) return false;
        return true;
    })
}

placeSchema.plugin(mongoosePaginate);
let Place = mongoose.model('Place', placeSchema);

function generateSlugAndContinue(count, next) {
    this.slug = slugify(this.title);
    if (count != 0) this.slug = this.slug + "-" + count;
    Place.validateSlugCount(this.slug)
        .then(isValid => {
            if (!isValid) {
                return generateSlugAndContinue.call(this, count + 1, next);
            } else {
                next();
            }
        })
}

module.exports = Place;