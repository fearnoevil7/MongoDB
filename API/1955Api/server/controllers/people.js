console.log("******People_Controller")

const Person = require('../models/person.js')

module.exports = {
    index: function(req, res){
        Person.find()
            .then(person=> res.json(person))
            .catch(err => res.json(err));
    },
    create: function(req, res){
        Person.create(req.params)
            .then(data => {res.redirect('/')})
            .catch(err => res.json(err));
    },
    show: function(req, res){
        Person.findOne({name: req.params.name})
            .then(person => res.json(person))
            .catch(err => res.json(err));
    },
    destroy: function(req, res){
        const person = req.params;
        Person.findOne({name: person.name}).then(destroyPerson => {
            Person.remove(destroyPerson).then(data => {res.redirect('/')})
            .catch(err => res.json(err))
            .catch(err => res.json(err));
        })
    }
}