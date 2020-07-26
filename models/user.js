const mongoose = require('mongoose');
const Schema =  mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');



const schema = new mongoose.Schema({

    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type: String,
        unique: true,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    // password: {
    //     type: String,
    //     required: true
    // },
    personal: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'posts'
    }]
});

schema.plugin(passportLocalMongoose);
mongoose.model('users', schema);

module.exports = mongoose.model('users');
