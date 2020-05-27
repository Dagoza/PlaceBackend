const mongoose = require("mongoose");
const randomstring = require('randomstring');

function assginRandomAndUniqueValueToField(app, field, next){
    const randomString = randomstring.generate(20);
    let searchCriteria = {};
    searchCriteria[field]= randomString;

    Application.count(searchCriteria).then(
        count =>{
            if(count > 0) return assginRandomAndUniqueValueToField(app,field,next);

            app[field] = randomString;
            next();
        }
    )
}

// Controlar quiénes acceden a la aplicación
let applicationSchema = new mongoose.Schema({
    applicationId: { //String aleatorios
        type: String,
        required: true,
        unique: true
    },
    secret: {
        type: String,
        required: true,
        unique: true
    },
    origins: String,
    name: String
}); 


applicationSchema.pre('validate', function(next){
    assginRandomAndUniqueValueToField(this, 'applicationId', ()=>{
        assginRandomAndUniqueValueToField(this, 'secret', next);
    })
})

let Application = mongoose.model("Application", applicationSchema);

module.exports = Application;
