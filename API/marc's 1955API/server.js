const express = require("express");
const app = express();

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/riot', { useNewUrlParser: true });

const PersonSchema = new mongoose.Schema({
    name: String,
}, { timestamps: true })

const Person = mongoose.model('Person', PersonSchema);

app.use(express.json());


app.get('/', (req, res) => {
    Person.find()
        .then(person => res.json(person))
        .catch(err => res.json(err));
})

app.get('/:name', (req, res) => {
    Person.findOne({name: req.params.name})
        .then(person => res.json(person))
        .catch(err => res.json(err));
})


app.get('/new/:name', (req, res) => {
    // const name = req.params.person;
    // const person = new Person();
    // person.name = name;
    // person.save()
    console.log(req.params);
    Person.create(req.params)

        .then(data => {res.redirect('/')})
        .catch(err => res.json(err));
        
})

app.get('/destroy/:name', (req, res) => {
    console.log(req.params);

    const person = req.params;
    Person.findOne({name: person.name}).then(destroyPerson => { 
        Person.remove(destroyPerson).then(data => { res.redirect('/')})})

        // .then(data => {console.log('********' + data + '***'), res.redirect('/')})
        .catch(err => res.json(err))
        .catch(err => res.json(err));
})


app.listen(8000, () => console.log("listening on port 8000"));

