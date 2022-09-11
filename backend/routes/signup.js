var express = require('express');
var router = express.Router();
var User = require('../models/user');

// router.get('/signup', function (req, res, next) {
//     return res.render('signup.js');
// });


router.post('/signup', function(req, res, next) {
    console.log(req.body);
    var personInfo = req.body;


    if(!personInfo.email || !personInfo.userName || !personInfo.password || !personInfo.passwordConfirm){
        res.send();
    } else {
        if (personInfo.password == personInfo.passwordConfirm) {

            User.findOne({email:personInfo.email},function(err,data){
                if(!data){
                    var c;
                    User.findOne({},function(err,data){

                        if (data) {
                            console.log("data exists");
                            c = data.unique_id + 1;
                        }else{
                            c=1;
                        }

                        var newPerson = new User({
                            email:personInfo.email,
                            userName: personInfo.userName,
                            password: personInfo.password,
                            passwordConfirm: personInfo.passwordConfirm,
                            unique_id:c,
                        });

                        newPerson.save(function(err, Person){
                            if(err)
                                console.log(err);
                            else
                                console.log('Success');
                        });

                    }).sort({_id: -1}).limit(1);
                    res.send({"Success":"You are registered,You can login now."});
                }else{
                    res.send({"Success":"Email is already used."});
                }

            });
        }else{
            res.send({"Success":"password is not matched"});
        }
    }
});

// router.get('/forgetpass', function (req, res, next) {
//     res.render();
// });
//
// router.post('/forgetpass', function (req, res, next) {
//     //console.log('req.body');
//     //console.log(req.body);
//     User.findOne({email:req.body.email},function(err,data){
//         console.log(data);
//         if(!data){
//             res.send({"Success":"This Email Is not registered!"});
//         }else{
//             // res.send({"Success":"Success!"});
//             if (req.body.password==req.body.passwordConfirm) {
//                 data.password=req.body.password;
//                 data.passwordConf=req.body.passwordConfirm;
//
//                 data.save(function(err, Person){
//                     if(err)
//                         console.log(err);
//                     else
//                         console.log('Success');
//                     res.send({"Success":"Password changed!"});
//                 });
//             }else{
//                 res.send({"Success":"Password does not matched! Both Password should be same."});
//             }
//         }
//     });
//
// });

module.exports = router;