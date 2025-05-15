import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: [true, 'Please add a task title'],
    },
    description: {
        type: String,
    },
    status: {
        type: String,
        enum: ['pending', 'completed'],
        default: 'pending',
    }, 
    timestamps: true
    
});

const Task = mongoose.model('Task', taskSchema);

export default Task; 