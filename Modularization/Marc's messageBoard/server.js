console.log('***SERVER***');

const express = require("express");
const app = express();

app.use(express.static(__dirname + "/client/static"));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/client/views');
app.use(express.urlencoded({ extended: true }));

//NOTE Eroors and Session
const flash = require('express-flash');
const session = require('express-session');
app.use(flash());
app.use(session({
    secret: 'keyboardkitteh',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))

//NOTE PULLING IN MONGODB
require('./server/config/mongoose.js');

//NOTE PULLING IN CONTROLLERS
require('./server/config/routes.js')(app);
require('./server/controllers/messages.js');
require('./server/controllers/comments.js');


app.listen(8000, () => console.log("listening on port 8000"));