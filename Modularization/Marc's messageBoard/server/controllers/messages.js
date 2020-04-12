
    const Message = require('../models/message.js');
    module.exports = {
        index: function(req, res) {
            Message.find()
                .then(data =>  res.render("index", {messages : data}))
                .catch(err => {
                    console.log("We have an error!", err);
                    for (var key in err.errors) {
                        req.flash('registration', err.errors[key].message);
                    }
                    res.redirect('/');
                });
        },

        create: function(req, res) {
            const message = new Message();
            message.name = req.body.name;
            message.field =req.body.field;
            message.save()
                .then(data => res.redirect('/', {message : data}))

                .catch(err => {
                    console.log(err);
                    for (var key in err.errors) {
                        req.flash('registration', err.errors[key].message);
                    }

                    res.redirect('/');
                })
        },
    }
