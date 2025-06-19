import mongoose from 'mongoose';

const grantSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true
    },
    grantor: {
        type: String,
        required: [true, 'Grantor is required'],
        trim: true
    },
    amount: {
        type: Number,
        required: [true, 'Amount is required'],
        min: [0, 'Amount must be positive']
    },
    status: {
        type: String,
        enum: ['Applied', 'In Progress', 'Approved', 'Rejected'],
        default: 'Applied'
    },
    applicationDate: {
        type: Date,
        required: [true, 'Application date is required']
    },
    approvalDate: {
        type: Date
    },
    department: {
        type: String,
        required: [true, 'Department is required'],
        trim: true
    },
    leadResearcher: {
        type: String,
        required: [true, 'Lead researcher is required'],
        trim: true
    },
    dueDate: {
        type: Date
        // Made optional since it's not always known at application time
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

const Grant = mongoose.model('Grant', grantSchema);
export default Grant; 