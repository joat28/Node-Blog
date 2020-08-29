const mongoose = require('mongoose');
const Schema =  mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');
const findOrCreate = require('mongoose-findorcreate')



const schema = new mongoose.Schema({
    google_id:{
        type: String
    },

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
    personal: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'posts'
        }],
    
    createdOn: { type: Date, default: Date.now },
});

schema.plugin(passportLocalMongoose);
schema.plugin(findOrCreate)
mongoose.model('users', schema);

module.exports = mongoose.model('users');
