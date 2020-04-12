console.log("*******Person_Model*******")

const mongoose = require('mongoose')
    const PersonSchema = new mongoose.Schema({
        name: {type: String, required: true, minlength: 1, maxlength: 25},
    })
    const Person = mongoose.model('Person', PersonSchema);
module.exports = Person