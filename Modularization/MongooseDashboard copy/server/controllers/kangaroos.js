console.log("******* Kangaroo Controller *******")

const Kangaroo = require("../models/kangaroo.js")

module.exports = {
    index: function(req, res){
        Kangaroo.find()
            .then(kangaroos => {
                console.log(kangaroos),
                res.render("index", {kangaroos})
        })
            // .then(saveResult => res.json(saveResult))
            .catch(err => res.json(err));
    },
    
    new: function(req, res){
        res.render("new");
    },

    show: function(req, res){
        res.render("show");
    },

    create: function(req, res){
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
    },

    edit: function(req, res){
        Kangaroo.find({_id: req.params.id})
            .then(kangaroo => {
                console.log("*******Now editing*******"),
                console.log("test"),
                console.log(kangaroo),
                res.render("edit", {kangaroo})
        })
            .catch(err => res.json(err));
    },

    update: function(req, res){
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
    },

    destroy: function(req, res){
        Kangaroo.remove({_id: req.params.id})
        .then(deletedKangaroo => {
            console.log("Kangaroo successfully deleted!!!!!!!")
        })
        .catch(err => {res.json(err)});
        res.redirect("/")
    }
}