const mongoose = require("mongoose");


const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required:[true, "must provide name"],
        trim: true,
        maxLength: [20, " Name length cannot exceed 20 Characters"]
    },
    completed: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model("Task", TaskSchema)