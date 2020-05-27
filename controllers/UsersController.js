const User = require("../models/User"); // Modelo
const helpers = require("./helpers")

const validParams = [
    "email",
    "name",
    "password"
];

function create(req,res, next){
    let params = helpers.paramsBuilder(validParams, req.body)
    User.create(params)
    .then(user =>{
        req.user = user;
        next();
    }).catch(error =>{
        console.log(error);
        res.status(422).json({error})
    })
}

function destroyAll(req,res){
    User.remove({}).then(r => res.json({}))
}

function myPlaces(req,res){
    User.findById(req.user.id).then(
        user => {
            user.places.then(places =>{
                res.json(places);
            })
        }
    ).catch(err=>{
        res.json(err);
    })
}

module.exports= {
    create,
    destroyAll,
    myPlaces
}