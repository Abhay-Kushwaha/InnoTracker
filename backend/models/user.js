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
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters']
    },
    role: {
        type: String,
        enum: ['researcher', 'admin', 'faculty'],
        default: 'researcher'
    },
    department: {
        type: String,
        required: [true, 'Department is required'],
        trim: true
    },
    designation: {
        type: String,
        trim: true
    },
    profileImage: {
        type: String
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
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    try {
        this.password = await bcrypt.hash(this.password, 12);
        next();
    } catch (error) {
        next(error);
    }
});

// Update timestamps
userSchema.pre('save', function(next) {
    this.updatedAt = new Date();
    next();
});

// Method to check password
userSchema.methods.comparePassword = async function(candidatePassword) {
    try {
        return await bcrypt.compare(candidatePassword, this.password);
    } catch (error) {
        throw new Error('Error comparing passwords');
    }
};

// Virtual for full name
userSchema.virtual('fullName').get(function() {
    return `${this.name}`;
});

// Method to get public profile
userSchema.methods.toPublicJSON = function() {
    return {
        id: this._id,
        name: this.name,
        email: this.email,
        department: this.department,
        role: this.role,
        designation: this.designation,
        profileImage: this.profileImage,
        contactNumber: this.contactNumber
    };
};

// Check if model exists before creating
const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;