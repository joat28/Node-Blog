const mongoose = require('mongoose');


const schema = new mongoose.Schema({

    textfield:{
        type: String,
        required: true
    },
    given_by: {
        type: Schema.Types.Object_Id,
        ref: users
    },
    given_to: {
        type: Schema.Types.Object_Id,
        ref: users
    },
    
});

mongoose.model('comments', schema);

module.exports = mongoose.model('comments');
