module.exports = function(options) {
    let CORsMiddleware = function(req, res, next) {

        if(req.application){
            req.application.origins.split(',').forEach(origin => {
                res.header("Access-Control-Allow-Origin", origin); // ApplicationID con la página 
            });
        }else{
            res.header("Access-Control-Allow-Origin", '*');
        }

        res.header("Access-Control-Allow-Origin", '*');
        res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
        next();
        
    }
    
    CORsMiddleware.unless = require('express-unless')
    return CORsMiddleware;
}