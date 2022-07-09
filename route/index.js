var user = require('../controller/user');
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
module.exports = function(app){
    app.post("/addUser", jsonParser ,user.createUser)
    app.get("/userList",user.getUser)
}
