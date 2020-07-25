const dburl = process.env.DB_URL;
const mongoose = require('mongoose');
console.log(dburl);


// CONNECTING TO MONGODB SERVER WITH MONGOOSE
mongoose.connect(dburl,
    {useNewUrlParser:true, useUnifiedTopology:true},
    function(error,link){
        assert.equal(error, null,'Failed to connect to DB');
        console.log('Connected to DB');
    });