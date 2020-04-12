console.log("*******Task_Model*******");


const mongoose = require('mongoose')

    const TaskSchema = new mongoose.Schema({
        title: { type: String, required: [true, "Task must have title"], minlength: [3, "Tasks must have atleast 3 characters"]},
        description: { type: String},
        completed: {type: Boolean, default: false}
    }, { timestamps: true })
    const Task = mongoose.model('Task', TaskSchema);

module.exports = Task