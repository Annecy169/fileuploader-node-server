var path = require("path");
var multer = require("multer");
var express = require('express')
var cors = require('cors');
var app = express()

app.use(cors());

const storage = multer.diskStorage({
    destination: "./uploads/",
    filename: function(req, file, cb){
        cb(null,"FILE-" + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits:{fileSize: 1000000},
});

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', function(req, res, next) {
    
});

app.post('/upload', upload.single('myImage'), function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "POST");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    console.log("Request ---", req.body);
    console.log("Request file ---", req.file);
    res.send("Successful");
})

app.listen(8000)