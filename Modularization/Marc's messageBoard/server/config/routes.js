console.log('***ROUTES***');

const messages = require('../controllers/messages.js')

const comments = require('../controllers/comments.js')

module.exports = function(app) {

    app.get('/', function(req, res) {
        messages.index(req, res);
    });

    app.post('/message', function(req, res) {
        messages.create(req, res);
    });

    app.post('/comment/:id', function(req, res) {
        var id = req.params.id;
        comments.create(req, res, id);
    });
}


