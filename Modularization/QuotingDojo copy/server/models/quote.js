console.log("*******Message_Model********")

const mongoose = require('mongoose')
    const UserSchema = new mongoose.Schema({
        name: { type: String, required: true, minlength: 2, maxlength: 25 },
        quote: {type: String, required: true },
        created_at: {type: Date, default: Date.now},
    })
    const User = mongoose.model('User', UserSchema);
module.exports = User