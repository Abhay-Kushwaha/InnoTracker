import mongoose from 'mongoose';

const startupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    founders: [{
        type: String,
        required: true
    }],
    description: {
        type: String,
        required: true
    },
    industry: {
        type: String,
        required: true
    },
    stage: {
        type: String,
        enum: ['Idea', 'MVP', 'Early Stage', 'Growth', 'Established'],
        default: 'Idea'
    },
    funding: {
        type: Number,
        default: 0
    },
    launchDate: {
        type: Date
    },
    department: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive', 'Acquired', 'Closed'],
        default: 'Active'
    },
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

const Startup = mongoose.model('Startup', startupSchema);
export default Startup; 