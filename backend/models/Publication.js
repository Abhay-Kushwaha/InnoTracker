import mongoose from 'mongoose';

const publicationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true
    },
    authors: [{
        type: String,
        required: [true, 'At least one author is required'],
        trim: true
    }],
    journal: {
        type: String,
        required: [true, 'Journal is required'],
        trim: true
    },
    doi: {
        type: String,
        unique: true,
        sparse: true,
        trim: true
    },
    publicationDate: {
        type: Date,
        required: [true, 'Publication date is required']
    },
    impactFactor: {
        type: Number,
        min: [0, 'Impact factor must be positive']
    },
    department: {
        type: String,
        required: [true, 'Department is required'],
        trim: true
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

// Ensure the DOI index is properly configured
publicationSchema.index({ doi: 1 }, { unique: true, sparse: true });

const Publication = mongoose.model('Publication', publicationSchema);
export default Publication; 