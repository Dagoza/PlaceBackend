const Place = require("../models/Place"); // Modelo
const upload = require("../config/upload"); // Subir archivos con configuración de multer
const helpers = require("./helpers")

const validParams = [
    "title",
    "description",
    "acceptsCredtCard",
    "address",
    "openHour",
    "closeHour",
];

function find(req,res, next){ // Middleware (Se distingue por next)
    Place.findOne({slug: req.params.id})
    .then(place => {
        req.place = place;
        req.mainObj = place;
        next(); // Sin valor success
    }).catch(err =>{
        next(err) // Con valor Error
    })
}


function index(req, res) {
    // Todos los lugares
    Place.paginate({},{ page: req.query.page || 1, limit: 8, sort: {_id: -1}}) // Envían después de un ? y se separan &
        .then((docs) => {
            res.json(docs);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
}

function create(req, res, next) {
    // Crea uno nuevo
    const params = helpers.paramsBuilder(validParams,req.body);
    params['_user'] = req.user.id
    console.log(req.user);
    Place.create(params)
        .then((doc) => {
            req.place = doc;
            next();
        })
        .catch((err) => {
            res.status(500).json(err);
        });
}

function show(req, res) {
    // Buscar uno
    res.json(req.place);
}

function update(req, res) {
    /* Ejecuta Hooks
        Place.findById(req.params.id)
        .then(doc => {
        doc.title = req.body.title
        doc.save()
        })
     */
    const params = helpers.paramsBuilder(validParams,req.body);
    req.place = Object.assign(req.place,params);
    // Place.update(
    /*Place.findOneAndUpdate(
        { _id: req.params.id },
        placeParams,
        { new: true } // La respuesta es la ya actualizado
    )*/
    req.place.save()
    .then((doc) => {
            res.json(doc);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
}

function destroy(req, res) {
    // Eliminar uno
    req.place.remove()(req.params.id)
        .then((doc) => {
            res.json({});
        })
        .catch((err) => {
            res.status(500).json(err);
        });
}

function multerMiddleware(){
    return upload.fields([
        {name: 'avatar', maxCount:1},
        {name: 'cover', maxCount:1},
    ])
}

function saveImage(req, res){
    if(req.place){
        const files = ['avatar', 'cover']
        const promises = [];
        files.forEach(imageType=>{
            if(req.files && req.files[imageType]){
                const path = req.files[imageType][0].path;
                promises.push(req.place.updateImage(path, imageType));
            }
        })
        Promise.all(promises).then(results =>{
            console.log(results);
            res.json(req.place);
        }).catch(err=>{
            console.log(err);
            res.json(err);
        })
    }else{
        res.status(422).json({
            error: req.error || "No pudo ser guardado el lugar"
        })
    }
}

module.exports = {
    index,
    create,
    show,
    destroy,
    update,
    find,
    multerMiddleware,
    saveImage
};


/*
Forma global: 
    app.use(next) //Esto indica que antes de cualquier función de respuesta se debe ejecutar este middleware
Por función:
    app.get('/',miMiddleware,function(req,res){
*/