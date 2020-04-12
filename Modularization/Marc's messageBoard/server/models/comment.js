console.log('***COMMENT_MODEL***');

const mongoose = require('mongoose');

    const CommentSchema = new mongoose.Schema({
        name: { type: String, required: [true, "Posts must have a title"] },
        content: { type: String, required: [true, "Posts must have content"] },
    }, { timestamps: true })
const Comment= mongoose.model('Comment', CommentSchema);

module.exports = Comment
