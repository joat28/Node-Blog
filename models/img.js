const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const schema = new mongoose.Schema({
    base64_Id : String 
});

mongoose.model('posts', schema);

module.exports = mongoose.model('posts');
