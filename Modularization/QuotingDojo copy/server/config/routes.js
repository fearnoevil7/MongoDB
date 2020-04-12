console.log("*******routes*******")
const mongoose = require('mongoose')
    // User = mongoose.model('User')
    const quotes = require("../controllers/quotes.js")
module.exports = function(app){
    app.get('/', (req, res) => {
        quotes.index(req, res);
    });
    app.get('/quotes', (req, res) => {
        quotes.show(req, res);
    });
    
    app.post('/quotes', (req, res) => {
        quotes.create(req, res);
    });

}
