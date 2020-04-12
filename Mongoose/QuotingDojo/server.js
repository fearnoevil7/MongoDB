const express = require("express");
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('express-flash');
mongoose.connect('mongodb://localhost/quotingDojo_db', {useNewUrlParser: true});
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 2, maxlength: 25 },
    quote: {type: String, required: true },
    created_at: {type: Date, default: Date.now},
})
const User = mongoose.model('User', UserSchema);
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

app.get('/', (req, res) => {
    res.render("index");
});
app.get('/quotes', (req, res) => {
    console.log("*******!!!!!!!*******")
    User.find()
        .then(users => {
            console.log(users),
            res.render("home", {users})
    })
        .catch(err => res.json(err));
});

app.post('/quotes', (req, res) => {
    const user = new User();
    user.name = req.body.name;
    user.quote = req.body.quote;
    // user.created_at = req.body.created_at;
    console.log("Success!!!!!!!")
    console.log("Yay!!!!!!!!")
    console.log(req.body)
    user.save()
        .then(newUserData => console.log('user created: ', newUserData))
        .catch(err => console.log(err))
    res.redirect('/quotes');
});










app.listen(8000, () => console.log("listening on port 8000"));