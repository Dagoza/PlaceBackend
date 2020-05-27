const Application = require("../models/Application"); // Modelo

module.exports =function (options) {
    let AuthApp = function(req,res,next){
        Application.count({}).then(appCount =>{
            if(appCount > 0 && !req.application) {
                return next(new Error("Una aplicacion es requerida para consumir el API"))
            } // Si se tiene al menos una aplicacion
            if(!req.validRequest) return next(new Error("Origin inválido"));
            next();
        }).catch(next)
     }

     AuthApp.unless = require('express-unless');
     return AuthApp
}

