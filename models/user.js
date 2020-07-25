const mongoose = require('mongoose');
const Schema =  mongoose.Schema;



const schema = new mongoose.Schema({

    email:{
        type: String,
        unique: true,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    personal: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'posts'
    }]
});

mongoose.model('users', schema);

module.exports = mongoose.model('users');
