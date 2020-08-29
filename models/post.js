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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    comments:
        [{  
            type: mongoose.Schema.Types.ObjectId,
            ref: 'comments'   
        }],
    image_id: {
        type: String,
        default: "DNE"
    }
    
});

mongoose.model('posts', schema);

module.exports = mongoose.model('posts');
