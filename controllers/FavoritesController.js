const FavoritePlace = require("../models/FavoritePlace"); // Modelo
const User = require("../models/User"); // Modelo
const helpers = require("./helpers")

const validParams = [
    "_place"
];

function find(req,res, next){ // Middleware (Se distingue por next)
    FavoritePlace.findById(req.params.id)
    .then(favorite => {
        req.favorite = favorite;
        req.mainObj = favorite;
        next(); // Sin valor success
    }).catch(next)
}

function index(req,res){
    if(!req.fullUser) return res.json({})
    req.fullUser.favorites.then(places =>{
        res.json(places);
    }).catch(err=>{
        res.json(err);
    })
}

function create(req,res, next){
    const params = helpers.paramsBuilder(validParams,req.body);
    params['_user'] = req.user.id;
    FavoritePlace.create(params)
    .then(favorite => 
        res.json(favorite))
    .catch(error =>{
        res.status(422).json({error});
    })
}

function destroy(req,res){
    req.favorite.remove()
    .then(doc => 
        res.json({}))
    .catch(error =>{
        res.status(500).json({error});
    })
}

module.exports= {
    create,
    destroy,
    index,
    find
}