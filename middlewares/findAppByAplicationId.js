const Application = require("../models/Application"); // Modelo

module.exports = function(req,res,next){
    if(req.application) return next(); // Si ya se buscó una application sigue
    const applicationId =  req.headers.application;
    if(!applicationId) return next();
    
    Application.findOne({applicationId}).then(
        app => {            
            if(!app) return next(new Error("Aplicacion inválida"));
            req.application = app;

            req.validRequest = req.application.origins.split(',').find(
                origin => {
                    origin = origin.replace(/\s/g,'')
                    return origin == req.headers.origin;
                }
            )

            next();
        }
    ).catch(next)
}