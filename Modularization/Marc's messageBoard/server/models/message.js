console.log('***MESSAGE_MODEL***');

const comments = require('../models/comment.js');
console.log(comments);
const mongoose = require('mongoose')
    const MessageSchema = new mongoose.Schema({
        name: { type: String, required: [true, "Blogs must have a title"], minlength: [3, "Titles must have at least 3 characters"] },
        field: { type: String, required: [true, "Posts must have content"] },
        comments: [comments.schema]
    }, { timestamps: true })
    const Message = mongoose.model('Message', MessageSchema);
module.exports = Message
