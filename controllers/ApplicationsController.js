const Application = require("../models/Application"); // Modelo
const helpers = require("./helpers")

const validParams = [
    "origins",
    "name"
];

function find(req,res, next){
    Application.findById(req.params.id)
    .then(application => {
        req.application = application;
        req.mainObj = application;
        next();
    }).catch(next) 
}

function index(req,res){
  
}

function create(req,res, next){
    const params = helpers.paramsBuilder(validParams,req.body);

    Application.create(params)
    .then(application => 
        res.json(application))
    .catch(error =>{
        res.status(422).json({error});
    })
}

function destroy(req,res){
    req.application.remove()
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