import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Authentication required' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        const user = await User.findById(decoded.userId)
            .select('-password')
            .lean();

        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        if (!user.department) {
            return res.status(400).json({
                message: 'Department is required. Please update your profile with your department information.',
                code: 'DEPARTMENT_REQUIRED'
            });
        }

        // Add last activity timestamp
        await User.findByIdAndUpdate(user._id, {
            $set: { lastActive: new Date() }
        });

        // Add user data to request
        req.user = {
            ...user,
            token // Include token for frontend reference
        };

        next();
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({
                message: 'Invalid or expired token',
                code: 'INVALID_TOKEN'
            });
        }
        console.error('Auth middleware error:', error);
        res.status(500).json({
            message: 'Server error during authentication',
            code: 'AUTH_ERROR'
        });
    }
}; 