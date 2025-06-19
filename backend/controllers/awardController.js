import Award from '../models/Award.js';

// Create a new award
export const createAward = async (req, res) => {
    try {
        const award = new Award({
            ...req.body,
            createdBy: req.user._id
        });
        await award.save();
        res.status(201).json(award);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all awards
export const getAwards = async (req, res) => {
    try {
        let filter = {};
        if (req.query.onlyMine || req.user.role !== 'admin') {
            filter.createdBy = req.user._id;
        }
        const awards = await Award.find(filter)
            .populate('createdBy', 'name email')
            .sort({ dateReceived: -1 });
        res.json(awards);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get award by ID
export const getAwardById = async (req, res) => {
    try {
        const award = await Award.findById(req.params.id)
            .populate('createdBy', 'name email');
        if (!award) {
            return res.status(404).json({ message: 'Award not found' });
        }
        res.json(award);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update award
export const updateAward = async (req, res) => {
    try {
        const award = await Award.findById(req.params.id);
        if (!award) {
            return res.status(404).json({ message: 'Award not found' });
        }
        
        // Check if user is the creator or admin
        if (award.createdBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized' });
        }

        Object.assign(award, req.body);
        await award.save();
        res.json(award);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete award
export const deleteAward = async (req, res) => {
    try {
        const award = await Award.findById(req.params.id);
        if (!award) {
            return res.status(404).json({ message: 'Award not found' });
        }

        // Check if user is the creator or admin
        if (award.createdBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized' });
        }

        await award.remove();
        res.json({ message: 'Award deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}; 