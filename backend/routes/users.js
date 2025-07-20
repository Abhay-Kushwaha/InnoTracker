import express from 'express';
import User from '../models/User.js';
import { auth } from '../middlewares/auth.js';

const router = express.Router();

// Get current user's profile
router.get('/me', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user profile', error: error.message });
    }
});

// Update current user's profile
router.put('/me', auth, async (req, res) => {
    try {
        const updates = req.body;
        // Prevent email/role change if you want
        delete updates.role;
        delete updates.email;
        const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true, runValidators: true }).select('-password');
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error updating user profile', error: error.message });
    }
});

export default router; 