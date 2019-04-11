const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    description : {
        type : String,
        trim : true,
        required : true,
    },
    completed : {
        type : Boolean,
        default : false,

    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required : true,
        // this is table name
        ref : 'users'
    }
})



const Task = mongoose.model('tasks',taskSchema)
module.exports = Task