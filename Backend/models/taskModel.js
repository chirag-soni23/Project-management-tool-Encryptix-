const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    projectId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'project',
        required:true
    },
    name:{
        type:String,
        require:true
    },completed:{
        type:Boolean,
        default:false
    }
},{timestamps:true});

module.exports = mongoose.model('tasks',taskSchema);