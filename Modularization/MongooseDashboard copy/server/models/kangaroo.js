console.log("*******Kangaroo_Model*******")
const mongoose = require("mongoose")
    const KangarooSchema = new mongoose.Schema({
        packname: { type: String, required: true, minlength: 2, maxlength: 25 },
        name: {type: String, required: true, minlength: 2, maxlength: 25},
        age: {type: Number, required: true},
    })
    const Kangaroo = mongoose.model('Kangaroo', KangarooSchema);
module.exports = Kangaroo