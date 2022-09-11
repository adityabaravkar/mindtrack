const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    email:{
        type: String,
        required:true
    },
    userName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    passwordConfirm: {
        type: String,
        required: true,
    },
    unique_id:{
        type: Number,
        required:true
    }
});

module.exports = mongoose.model('User', userSchema);