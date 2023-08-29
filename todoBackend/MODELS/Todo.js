const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    completed:{
        type:Boolean,
        default:false
    }
}, {timestamps:true}); //timestamps is basically used to have 2 properties by default 
//that is createdAt and updatedAt

const Todo = mongoose.model('Todo',todoSchema);
module.exports = Todo;