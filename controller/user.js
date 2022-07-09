var mongoose = require('mongoose');
var userModel = mongoose.model('userModel')
var bcrypt = require('bcryptjs');

// For signup user
exports.createUser = async(req,res)=>{
    try {
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(req.body.password, salt);
        if(!req.body.phoneNo)
        req.body.phoneNo=0;
        var reqquestBody = new userModel(req.body);
        req.body.password = hash;
        reqquestBody.save(function(err,success){
            if(err)
                res.json({
                    message : err,
                    code : 401,
                    status : "fail"
                })
            else
                res.json({
                    message : "User's data saved successfully.",
                    code : 200,
                    status : "success"
                })
        })        
    } catch (error) {
        res.json({
            message : error,
            code : 401,
            status : "fail"
        })
    }
}

// To get all users list
exports.getUser = async(req,res)=>{
    try {
        const dataList = await userModel.find();
        res.json({
            message : "User List",
            raws : dataList,
           code : 200,
           status : "success"
        })        
    } catch (error) {
        res.json({
            message : error,
            code : 401,
            status : "fail"
         })
    }
}

// To update the user by user id
exports.updateUser = async(req,res) => {
    try {
        userModel.updateOne(
            {_id : req.body.userId},
            {
                firstName : req.body.name,
                lastName : req.body.lastName,
                email : req.body.email,
                phoneNo : req.body.phoneNo,
            }, 
            function(err,docs){
                if(err){
                    res.json({
                        message : err,
                        code : 401,
                        status : "fail"
                     })
                } else {
                    res.json({
                        data : docs,
                        messsage : "Data update successfully",
                        code : 200
                    })
                }
            }
        )
    } catch (error) {
        res.json({
            message : error,
            code : 401,
            status : "fail"
         })
    }
}

// To delete the user by userid
exports.deleteUser = async(req,res) =>{
    try {
        userModel.deleteOne({_id: req.body.userId}, function(err,suc){
            if(err){
                res.json({
                    data : err,
                    messsage : "Inernal Error",
                    code : 401
                })
            } else {
                res.json({
                    data : suc,
                    messsage : "Data deleted successfully",
                    code : 200
                })
            }
        })
    } catch (error) {
        res.json({
            message : error,
            code : 401,
            status : "fail"
         })
    }
}