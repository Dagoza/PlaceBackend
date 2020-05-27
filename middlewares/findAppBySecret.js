const Application = require("../models/Application"); // Modelo

module.exports = function(req,res,next){
    if(req.xhr) return next(); // si es AJAX seguir
    const secret =  req.headers.secret;
    if(!secret) return next();
    
    Application.findOne({secret}).then(
        app => {            
            if(!app) return next(new Error("Aplicacion inválida"));
            req.application = app;
            req.validRequest = true;
            next();
        }
    ).catch(next)
}