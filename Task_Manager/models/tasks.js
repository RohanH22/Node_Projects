const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    name: {
        type:String,
        required:[true, 'provide name'], //without name it will not store in dB.
        // To give specfic lenght then use trim with maxlenght like below.
        trim:true,
        maxlength:[30, 'name can  not be more the 30 characters']
    }, 
    completed: {
        type: Boolean,
        //set default to false because when saved to dB we dont what completed to be true.
        default:false
    },
})

module.exports = mongoose.model('Task',TaskSchema)