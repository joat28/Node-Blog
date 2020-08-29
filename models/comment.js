const mongoose = require('mongoose');
const Schema =  mongoose.Schema


const schema = new mongoose.Schema({

    textfield:{
        type: String,
        required: true
    },
    given_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    given_to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    
});

mongoose.model('comments', schema);

module.exports = mongoose.model('comments');
