const express = require("express");
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('express-flash');
mongoose.connect('mongodb://localhost/random_db', {useNewUrlParser: true});
const KangarooSchema = new mongoose.Schema({
    packname: { type: String, required: true, minlength: 2, maxlength: 25 },
    name: {type: String, required: true, minlength: 2, maxlength: 25},
    age: {type: Number, required: true},
})
const Kangaroo = mongoose.model('Kangaroo', KangarooSchema);
app.use(session({
    secret: 'encrypt',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 60000},
}))
app.use(express.static(__dirname + "/static"));
app.set("view engine", 'ejs');
app.set('views', __dirname + '/views');
app.use(express.urlencoded({extended: true}));
app.get('/', (req, res) => {
    Kangaroo.find()
        .then(kangaroos => {
            console.log(kangaroos),
            res.render("index", {kangaroos})
    })
        // .then(saveResult => res.json(saveResult))
        .catch(err => res.json(err));
});
app.get('/kangaroos/new', (req, res) => {
    res.render("new");
});
app.get('/kangaroos/:id', (req, res) => {
    res.render("show");
});

app.post('/kangaroos', (req, res) => {
    const kangaroo = new Kangaroo();
    kangaroo.name = req.body.name;
    kangaroo.age = req.body.age;
    kangaroo.packname = req.body.packname;
    console.log(req.body)
    kangaroo.save()
    .then(newKangarooData => console.log('kangaroo created: ', newKangarooData))
    // console.log("Success!!!!!!!");
    // console.log("Yay!!!!!!!!");
    // console.log(req.body)
        .catch(err => console.log(err))
    res.redirect('/');
});
app.get("/kangaroos/edit/:id", (req,res) => {
    Kangaroo.find({_id: req.params.id})
        .then(kangaroo => {
            console.log("*******Now editing*******"),
            console.log("test"),
            console.log(kangaroo),
            res.render("edit", {kangaroo})
    })
        .catch(err => res.json(err));
});
app.post('/kangaroos/update/:id', (req, res) => {
    Kangaroo.findOne({_id: req.params.id})
        .then(kangaroo => {
            kangaroo.name = req.body.name;
            kangaroo.age = req.body.age;
            kangaroo.packname = req.body.packname;
            return kangaroo.save();
        })
        .then(saveResult => res.json(saveResult))
        .catch(err => res.json(err));
        res.redirect("/kangaroos/edit/" + req.params.id)
})
app.post('/kangaroos/destroy/:id', (req, res) => {
    Kangaroo.remove({_id: req.params.id})
    .then(deletedKangaroo => {
        console.log("Kangaroo successfully deleted!!!!!!!")
    })
    .catch(err => {res.json(err)});
    res.redirect("/")
})









app.listen(8000, () => console.log("listening on port 8000"));