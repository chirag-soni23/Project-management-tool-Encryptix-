const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    deadline:{
        type:Date,
        required:true
    },
},{timestamps:true});

module.exports = mongoose.model('project',projectSchema);