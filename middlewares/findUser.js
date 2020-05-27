const User = require("../models/User"); // Modelo

module.exports = function(req,res,next){
    console.log(req.user)
    if(req.user){
        User.findById(req.user.id).then(
            user => {
                req.fullUser = user;
                next();
            }
        )
    }else{
        next();
    }  
}