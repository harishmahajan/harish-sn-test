var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var server = require('http');
var con = require('./config')
var fs = require('fs');
app.use(bodyParser.json({
    limit:'50mb'
}))
server.createServer(app);
var model_patth = __dirname + '/model';
fs.readdirSync(model_patth).forEach(function(file){
    if(~file.indexOf('.js'))
        require(model_patth+'/'+file)
})
var enableCORS = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, token, authorization, Content-Length, X-Requested-With, *');
    if ('OPTIONS' === req.method) {
      res.sendStatus(200);
    } else {
      next();
    }
  };
  
  app.all("/*", function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, token, authorization, Content-Length, X-Requested-With, *');
    next();
  });
  app.use(enableCORS);
  app.use(express.static('./assets'));
app.get('/', function (req, res) {
    res.sendfile(__dirname + '/index.html');
  });
require('./route')(app);

app.listen(3000,function(e,r){
    console.log("Server is running 3000");
})
exports.mainserver = app;
