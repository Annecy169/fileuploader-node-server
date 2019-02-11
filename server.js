//This is the API for the file server
var path = require("path"),
    multer = require("multer"),
    fs = require('fs'),
    http = require('http'),
    https = require('https'),
    express = require('express'),
    cors = require('cors')

var port = 3001

var options = {
    key: fs.readFileSync('./fileserver.xander.pro.key'),
    cert: fs.readFileSync('./fileserver.xander.pro.crt'),
};

var app = express()
app.use(cors());

var server = https.createServer(options, app).listen(port, function(){
    console.log("Express server listening on port " + port);
});



const storage = multer.diskStorage({
    destination: "./uploads/",
    filename: function(req, file, cb){
        cb(null,"FILE-" + Date.now() + "-" + file.originalname); 
        //path.extname(file.originalname) for just file extension 
    }
});

const upload = multer({
    storage: storage,
    limits:{fileSize: 2000000}, //upload up to 2mb
});

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', function(req, res, next) {
    res.setTimeout(120000, function(){
        console.log('Request has timed out.');
            res.send(408);
    });

    res.send("No API Here");
    res.end();
});

app.post('/upload', upload.single('myImage'), function (req, res, next) {
    res.setTimeout(120000, function(){
        console.log('Request has timed out.');
            res.send(408);
    });

    console.log("Request ---", req.body);
    console.log("Request file ---", req.file);
    res.send("Successful");
    res.end();
})
