console.log('****CONTROLLERS*****');


const Task = require('../models/task.js');


module.exports = {

    index: function(req, res) {
        Task.find()
            .then(data =>  res.json({tasks: data}))
            .catch(err => {
                console.log("We have an error!", err);
                for (var key in err.errors) {
                    req.flash('registration', err.errors[key].message);
                }
                res.json(err.errors[key].message);
            });
    },

    show: function(req, res) {
        Task.findOne({_id: req.params.id})
            .then(task => res.json(task))
            .catch(err => {
                console.log("We have an error!", err);
                for (var key in err.errors) {
                    req.flash('registration', err.errors[key].message);
                }
                res.json(err.errors[key].message);
            });
    },

    
    create: function(req, res) {
        console.log(req.body);
        Task.create(req.body)
            
            .then(data => {res.json(data)})
            .catch(err => {
                // console.log("We have an error!", err);
                for (var key in err.errors) {
                    req.flash('registration', err.errors[key].message);
                }
                res.json(err.errors[key].message);
            });
    },

    update: function(req, res) {
        Task.update({_id: req.params.id},
            {$set: {title: req.body.title, description: req.body.description, completed: req.body.completed}})
            .then(data => res.json(data))
            
            .catch(err => {
                console.log("We have an error!", err);
                for (var key in err.errors) {
                    req.flash('registration', err.errors[key].message);
                }
                res.json(err.errors[key].message);
            });
    },


    destroy: function(req, res) {

        Task.findOne({_id: req.body.id}).then(destroyTask => { 
            Task.remove(destroyTask)
                .then(data => { res.json(data)})})
    
                .catch(err => {
                    console.log("We have an error!", err);
                    for (var key in err.errors) {
                        req.flash('registration', err.errors[key].message);
                    }
                    res.json(err.errors[key].message);
                })

                .catch(err => {
                    console.log("We have an error!", err);
                    for (var key in err.errors) {
                        req.flash('registration', err.errors[key].message);
                    }
                    res.json(err.errors[key].message);
                });
    }
}
