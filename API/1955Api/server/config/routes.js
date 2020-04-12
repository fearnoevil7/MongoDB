console.log("*******Routes*******")
const mongoose = require('mongoose')
    const people = require('../controllers/people.js')
module.exports = function(app){
    app.get('/', (req, res) => {
        people.index(req, res);
    });
    app.get('/new/:name', (req, res) => {
        people.create(req, res);
    });
    app.get('/:name', (req, res) => {
        people.show(req, res);
    });
    app.get('/destroy/:name', (req, res) => {
        people.destroy(req, res);
    })
}