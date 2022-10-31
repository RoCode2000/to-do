const mongoose = require("mongoose")

const ToDoSchema = new mongoose.Schema({
    toDo: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model("ToDo", ToDoSchema)