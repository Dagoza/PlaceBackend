const User = require("../models/User"); // Modelo

module.exports = function(req,res,next){
    if(req.fullUser && req.fullUser.admin) return next();
        
    next(new Error('No tiene permisos de admin'));
}