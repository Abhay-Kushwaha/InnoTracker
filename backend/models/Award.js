import mongoose from 'mongoose';

const awardSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    recipient: {
        type: String,
        required: true
    },
    awardType: {
        type: String,
        enum: ['Research', 'Innovation', 'Teaching', 'Service', 'Other'],
        required: true
    },
    awardingBody: {
        type: String,
        required: true
    },
    dateReceived: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
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

const Award = mongoose.model('Award', awardSchema);
export default Award; 