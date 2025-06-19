import Grant from '../models/Grant.js';

// Get all grants for the logged-in user
export const getGrants = async (req, res) => {
    try {
        const grants = await Grant.find({ createdBy: req.user._id })
            .populate('createdBy', 'name email department')
            .sort({ createdAt: -1 });
        res.json(grants);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single grant
export const getGrant = async (req, res) => {
    try {
        const grant = await Grant.findOne({
            _id: req.params.id,
            createdBy: req.user._id
        }).populate('createdBy', 'name email department');

        if (!grant) {
            return res.status(404).json({ message: 'Grant not found or unauthorized' });
        }

        res.json(grant);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new grant
export const createGrant = async (req, res) => {
    try {
        const grantData = {
            ...req.body,
            createdBy: req.user._id,
            applicationDate: new Date(req.body.applicationDate)
        };

        // Handle optional dates with proper validation
        if (req.body.dueDate && req.body.dueDate.trim() !== '' && req.body.dueDate !== 'undefined') {
            const dueDate = new Date(req.body.dueDate);
            if (!isNaN(dueDate.getTime())) {
                grantData.dueDate = dueDate;
            }
        }

        if (req.body.approvalDate && req.body.approvalDate.trim() !== '' && req.body.approvalDate !== 'undefined') {
            const approvalDate = new Date(req.body.approvalDate);
            if (!isNaN(approvalDate.getTime())) {
                grantData.approvalDate = approvalDate;
            }
        }

        const grant = new Grant(grantData);
        const savedGrant = await grant.save();
        await savedGrant.populate('createdBy', 'name email department');

        res.status(201).json(savedGrant);
    } catch (error) {
        console.error('Grant creation error:', error);
        res.status(500).json({ 
            message: error.message,
            details: error.errors ? Object.values(error.errors).map(err => err.message) : []
        });
    }
};

// Update a grant
export const updateGrant = async (req, res) => {
    try {
        const grant = await Grant.findOne({
            _id: req.params.id,
            createdBy: req.user._id
        });

        if (!grant) {
            return res.status(404).json({ message: 'Grant not found or unauthorized' });
        }

        const updateData = {
            ...req.body
        };

        // Handle dates with proper validation
        if (req.body.applicationDate) {
            const applicationDate = new Date(req.body.applicationDate);
            if (!isNaN(applicationDate.getTime())) {
                updateData.applicationDate = applicationDate;
            }
        }

        if (req.body.dueDate && req.body.dueDate.trim() !== '' && req.body.dueDate !== 'undefined') {
            const dueDate = new Date(req.body.dueDate);
            if (!isNaN(dueDate.getTime())) {
                updateData.dueDate = dueDate;
            }
        } else if (req.body.dueDate === '' || req.body.dueDate === 'undefined') {
            updateData.dueDate = undefined; // Remove the field if empty string
        }

        if (req.body.approvalDate && req.body.approvalDate.trim() !== '' && req.body.approvalDate !== 'undefined') {
            const approvalDate = new Date(req.body.approvalDate);
            if (!isNaN(approvalDate.getTime())) {
                updateData.approvalDate = approvalDate;
            }
        } else if (req.body.approvalDate === '' || req.body.approvalDate === 'undefined') {
            updateData.approvalDate = undefined; // Remove the field if empty string
        }

        const updatedGrant = await Grant.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        ).populate('createdBy', 'name email department');

        res.json(updatedGrant);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a grant
export const deleteGrant = async (req, res) => {
    try {
        const grant = await Grant.findOne({
            _id: req.params.id,
            createdBy: req.user._id
        });

        if (!grant) {
            return res.status(404).json({ message: 'Grant not found or unauthorized' });
        }

        await grant.deleteOne();
        res.json({ message: 'Grant deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}; 