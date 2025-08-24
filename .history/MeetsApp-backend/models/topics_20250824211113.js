import mongoose from 'mongoose';

const topicSchema=new mongoose.Schema({
    name:{type:String, required:true, unique:true},
    description:{type:String},
    cr
})