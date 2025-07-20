import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: true,
        minlength: [6, 'Password must be at least 6 characters']
    },
    role: {
        type: String,
        enum: ['student', 'faculty', 'college', 'government'],
        required: true
    },
    collegeId: {
        type: String,
        required: function () {
            return this.role !== 'government';
        },
        trim: true
    },
    collegeName: {
        type: String,
        trim: true
    },
    branch: {
        type: String,
        required: function () {
            return ['student', 'faculty'].includes(this.role);
        },
        trim: true
    },
    state: {
        type: String,
        trim: true
    },
    city: {
        type: String,
        trim: true
    },
    rollNumber: {
        type: String,
        required: function () {
            return ['student'].includes(this.role);
        },
        trim: true
    },
    contactNumber: {
        type: String,
        trim: true
    },
    lastActive: {
        type: Date,
        default: Date.now
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    if (!this.password) return next(); // Skip hashing if password is not set (for govt)
    try {
        this.password = await bcrypt.hash(this.password, 12);
        next();
    } catch (error) {
        next(error);
    }
});

// Method to check password
userSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        return await bcrypt.compare(candidatePassword, this.password);
    } catch (error) {
        throw new Error('Error comparing passwords');
    }
};

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;
