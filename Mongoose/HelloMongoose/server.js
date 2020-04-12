const express = require("express");
const app = express();
const mongoose = require('mongoose');
app.use(express.static(__dirname + "/static"));
app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
mongoose.connect('mongodb://localhost:8000/test_db', {useNewUrlParser: true});
const UserSchema = new mongoose.Schema({
    name: String,
    age: Number,
})
const User = mongoose.model('User', UserSchema);

app.get("/", (req, res) => {
    User.find()
        .then(data => res.render("index", {users: data}))
        .catch(err => res.json(err));
    res.render("index");
})
app.post('/create', (req, res) => {
    const user = new User();
    user.name = req.body.name;
    user.age = req.body.age;
    user.save()
        .then(newUserData => console.log('user created: ', newUserData))
        .catch(err => console.log(err));
    console.log("Success!!!!!!!")
    console.log(req.body)
    res.redirect('/');
})



app.listen(8000, () => console.log("listening on port 8000"));