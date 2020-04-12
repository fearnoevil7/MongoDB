console.log('***COMMENT_CONTROLLER***');

var comment = require('../models/comment.js');
const Message = require('../models/message.js');

    module.exports = {

        index: function(req, res) {
            Comment.find()
                .then(data => res.render('index', {comment : data}))
                .catch(err => res.json(err))
        },

        create: function(req, res) {

            
            const newcomment = new comment();
            newcomment.name = req.body.name;
            newcomment.content = req.body.content;
            newcomment.save()

            .then(comment => { console.log( "INITIAL COMMENT" + comment);
                Message.findOne({_id: req.params.id})
                .then(message => { console.log("INITial MESSAGE" + message);
                    message.comments.push(comment)
                    res.redirect("/")
                })
            })
            .catch(err => {
                console.log(err);
                for (var key in err.errors) {
                    req.flash('registration', err.errors[key].message);
                }

                res.redirect('/');
            })
            .catch(err => {
                console.log(err);
                for (var key in err.errors) {
                    req.flash('registration', err.errors[key].message);
                }

                res.redirect('/');
            })
        }

    }


