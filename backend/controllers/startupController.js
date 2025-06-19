import Startup from '../models/Startup.js';

// Create a new startup
export const createStartup = async (req, res) => {
    try {
        const startup = new Startup({
            ...req.body,
            createdBy: req.user._id
        });
        await startup.save();
        res.status(201).json(startup);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all startups
export const getStartups = async (req, res) => {
    try {
        const startups = await Startup.find({ createdBy: req.user._id })
            .populate('createdBy', 'name email')
            .sort({ createdAt: -1 });
        res.json(startups);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get startup by ID
export const getStartupById = async (req, res) => {
    try {
        const startup = await Startup.findById(req.params.id)
            .populate('createdBy', 'name email');
        if (!startup) {
            return res.status(404).json({ message: 'Startup not found' });
        }
        res.json(startup);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update startup
export const updateStartup = async (req, res) => {
    try {
        const startup = await Startup.findById(req.params.id);
        if (!startup) {
            return res.status(404).json({ message: 'Startup not found' });
        }
        
        // Check if user is the creator or admin
        if (startup.createdBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized' });
        }

        Object.assign(startup, req.body);
        await startup.save();
        res.json(startup);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete startup
export const deleteStartup = async (req, res) => {
    try {
        const startup = await Startup.findById(req.params.id);
        if (!startup) {
            return res.status(404).json({ message: 'Startup not found' });
        }

        // Check if user is the creator or admin
        if (startup.createdBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized' });
        }

        await startup.remove();
        res.json({ message: 'Startup deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}; 