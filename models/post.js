const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const schema = new mongoose.Schema({

    textfield:{
        blogTitle:{
            type: String,
            default: "Blog of " + Date.now(),
        },
        blogContent: {
            type:String,
            required: true
        }
    },
    author: {
       // type:String
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    // image: {
    //     default:null
    // }
});

mongoose.model('posts', schema);

module.exports = mongoose.model('posts');
