import mongoose from "mongoose";

const collegeSchema = new mongoose.Schema({
    collegeId: {
        type: String,
        unique: true,
        required: [true, 'College ID is required']
    },
    collegeName: {
        type: String,
        required: [true, 'College Name is required'],
        trim: true
    },
    state: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    address: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

const College = mongoose.models.College || mongoose.model('College', collegeSchema);
export default College;
