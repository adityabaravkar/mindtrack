var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.get('/profile', function (req, res, next) {
    console.log("profile");
    User.findOne({unique_id:req.session.userId},function(err,data){
        console.log("data");
        console.log(data);
        if(!data){
            res.redirect('/');
        }else{
            //console.log("found");
            return res.render('', {"name":data.userName,"email":data.email});
        }
    });
});

module.exports = router;