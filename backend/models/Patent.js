import mongoose from 'mongoose';

const patentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    inventors: [{
        type: String,
        required: true
    }],
    patentNumber: {
        type: String,
        unique: true,
        sparse: true
    },
    filingDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['Filed', 'Pending', 'Granted', 'Rejected'],
        default: 'Filed'
    },
    department: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    relatedPublication: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Publication',
        required: false
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
}, {
    timestamps: true
});

const Patent = mongoose.model('Patent', patentSchema);
export default Patent; 