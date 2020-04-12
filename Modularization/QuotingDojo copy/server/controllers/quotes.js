console.log("******* Quote Controller *******")

const User = require('../models/quote.js')
module.exports = {
    index: function(req, res){
        res.render("index");
    },

    show: function(req, res){
        console.log("*******!!!!!!!*******")
        User.find()
            .then(users => {
                console.log(users),
                res.render("home", {users})
        })
            .catch(err => res.json(err));
    },

    create: function(req, res){
        const user = new User();
        user.name = req.body.name;
        user.quote = req.body.quote;
        // user.created_at = req.body.created_at;
        console.log("Success!!!!!!!")
        console.log("Yay!!!!!!!!")
        console.log(req.body)
        user.save()
            .then(newUserData => console.log('user created: ', newUserData))
            .catch(err => console.log(err))
        res.redirect('/quotes');
    }
}