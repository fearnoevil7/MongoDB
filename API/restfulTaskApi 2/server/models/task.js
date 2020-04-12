console.log('***MESSAGE_MODEL***');



const mongoose = require('mongoose')

    const TaskSchema = new mongoose.Schema({
        title: { type: String, required: [true, "Blogs must have a title"], minlength: [3, "Titles must have at least 3 characters"] },
        description: { type: String},
        completed: {type: Boolean, }
    }, { timestamps: true })
    const Task = mongoose.model('Task', TaskSchema);


module.exports = Task

