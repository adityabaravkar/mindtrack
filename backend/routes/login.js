var express = require('express');
var router = express.Router();
var User = require('../models/user');
//
// router.get('/login', function (req, res, next) {
//     return res.render('login.js');
// });

router.post('/login', function (req, res, next) {
    //console.log(req.body);
    User.findOne({email:req.body.email},function(err,data){
        if(data){

            if(data.password==req.body.password){
                console.log("password matched");
                //req.session.userId = data._id;
                //console.log(req.session.userId);
                res.status(200);
                res.send({"Success":"Success!"});

            }else{
                res.status(401);
                res.send({"Success":"Wrong password!"});
            }
        }else{
            res.status(201);
            res.send({"Success":"This Email Is not registered!"});
        }
    });
});

router.get('/logout', function (req, res, next) {
    console.log("logout")
    if (req.session) {
        // delete session object
        req.session.destroy(function (err) {
            if (err) {
                return next(err);
            } else {
                return res.redirect('/');
            }
        });
    }
});

module.exports = router;