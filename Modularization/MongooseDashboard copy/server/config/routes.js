console.log("*******routes*******")


const mongoose = require('mongoose')
    // Kangaroo = mongoose.model('Kangaroo')
    const kangaroos = require("../controllers/kangaroos.js")
module.exports = function(app){
    app.get('/', (req, res) => {
        kangaroos.index(req, res);
    });
    app.get('/kangaroos/new', (req, res) => {
        kangaroos.new(req, res);
    })
    app.get('/kangaroos/:id', (req, res) => {
        kangaroos.show(req, res);
    });
    
    app.post('/kangaroos', (req, res) => {
        kangaroos.create(req, res);
    });
    app.get("/kangaroos/edit/:id", (req,res) => {
        kangaroos.edit(req, res);
    });
    app.post('/kangaroos/update/:id', (req, res) => {
        kangaroos.update(req, res);
    })
    app.post('/kangaroos/destroy/:id', (req, res) => {
        kangaroos.destroy(req, res);
    })
}