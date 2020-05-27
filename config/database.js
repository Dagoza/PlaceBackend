const mongoose = require('mongoose');

const dbName = "places_api"

module.exports = {
    connect: () =>{ mongoose.connect('mongodb://localhost:27017/'+dbName, 
    {useNewUrlParser: true, useUnifiedTopology: true})},
    dbName,
    connection: ()=>{
        console.log('Conectando...')
        if(mongoose.connection){
            console.log('Conectado');
            return mongoose.connection;
        }
        console.log('Conectado');
        return this.connect();
    }
}