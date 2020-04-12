console.log("*******Server*******");

const express = require("express");
const app = express();
const mongoose = require('./server/config/mongoose.js');
// const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/restfultask_db', {useNewUrlParser: true});
const flash = require('express-flash');
const session = require('express-session');
app.use(flash());
app.use(session({
    secret: 'encrypt',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 60000}
}))

app.use(express.static(__dirname + "/static"));
app.set('view engine', 'ejs');
app.set('views', __dirname + "/views");
// app.use(express.urlencoded({edtended: true}))
app.use(express.json());

require("./server/config/routes.js")(app);

app.listen(8000, () => console.log("listening on port 8000"));