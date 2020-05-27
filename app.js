var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require('cookie-parser'); // Leer cookies del navegador
var logger = require('morgan'); // Registrar en log todas las peticiones que llegan

const db = require("./config/database"); //Base de datos
const places = require("./routes/places") // Rutas
const users = require("./routes/users") // Rutas
const sessions = require("./routes/sessions") // Rutas
const favorites = require("./routes/favorites") // Rutas
const visits = require("./routes/visits") // Rutas
const visitsPlaces = require("./routes/visitsPlaces") // Rutas
const applications = require("./routes/applications") // Rutas
const jwtMiddleware = require('express-jwt') // Manejo de sesión con JWT
const secrets = require('./config/secrets');
const findAppBySecret = require('./middlewares/findAppBySecret');
const findAppByApplicationId = require('./middlewares/findAppByAplicationId');
const authApp = require('./middlewares/authApp')();
const allowCORs = require('./middlewares/allowCORs')();


db.connect();

var app = express();


app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(findAppBySecret); // Para uso desde postman 
app.use(findAppByApplicationId);// Para uso desde aplicaciones, se refuerza con CORS
app.use(authApp.unless({method: 'OPTIONS'}));
app.use(allowCORs.unless({path: '/public'}));

app.use(
  jwtMiddleware({secret: secrets.jwtSecret})
  .unless({path:['/sessions','/users'], method: ['GET','OPTIONS']})
)

app.use('/places', places);
app.use('/places', visitsPlaces);
app.use('/applications', applications);
app.use('/users', users);
app.use('/sessions', sessions);
app.use('/favorites', favorites);
app.use('/visits', visits);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(err);
});

module.exports = app;
