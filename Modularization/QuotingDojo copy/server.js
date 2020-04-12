const express = require("express");
const app = express();
const mongoose = require('./server/config/mongoose');
const session = require('express-session');
const flash = require('express-flash');
// mongoose.connect('mongodb://localhost/quotingDojo_db', {useNewUrlParser: true});
app.use(flash());
app.use(session({
    secret: 'encrypt',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 600000}
}))
app.use(express.static(__dirname + "/static"));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.urlencoded({extended: true}));

require('./server/config/routes.js')(app)








app.listen(8000, () => console.log("listening on port 8000"));