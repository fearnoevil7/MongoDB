console.log("*******MONGOOSE*******")
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/quotingDojo_db', {useNewUrlParser: true});