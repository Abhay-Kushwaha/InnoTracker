import mongoose from 'mongoose';

const innovationProjectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    team: [{
        type: String,
        required: true
    }],
    department: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Planning', 'In Progress', 'Completed', 'On Hold'],
        default: 'Planning'
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date
    },
    budget: {
        type: Number,
        default: 0
    },
    impact: {
        type: String,
        required: true
    },
    outcomes: [{
        type: String
    }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const InnovationProject = mongoose.model('InnovationProject', innovationProjectSchema);
export default InnovationProject; 