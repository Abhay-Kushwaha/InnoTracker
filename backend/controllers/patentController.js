import Patent from '../models/Patent.js';

// Get all patents for the logged-in user
export const getPatents = async (req, res) => {
    try {
        const patents = await Patent.find({ createdBy: req.user._id })
            .populate('createdBy', 'name email department')
            .populate('relatedPublication', 'title authors journal publicationDate')
            .sort({ createdAt: -1 });
        res.json(patents);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single patent
export const getPatent = async (req, res) => {
    try {
        const patent = await Patent.findOne({
            _id: req.params.id,
            createdBy: req.user._id
        }).populate('createdBy', 'name email department')
          .populate('relatedPublication', 'title authors journal publicationDate');

        if (!patent) {
            return res.status(404).json({ message: 'Patent not found or unauthorized' });
        }

        res.json(patent);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new patent
export const createPatent = async (req, res) => {
    try {
        const patentData = {
            ...req.body,
            createdBy: req.user._id,
            filingDate: new Date(req.body.filingDate)
        };

        const patent = new Patent(patentData);
        const savedPatent = await patent.save();
        await savedPatent.populate('createdBy', 'name email department');
        await savedPatent.populate('relatedPublication', 'title authors journal publicationDate');

        res.status(201).json(savedPatent);
    } catch (error) {
        console.error('Patent creation error:', error);
        res.status(500).json({ 
            message: error.message,
            details: error.errors ? Object.values(error.errors).map(err => err.message) : []
        });
    }
};

// Update a patent
export const updatePatent = async (req, res) => {
    try {
        const patent = await Patent.findOne({
            _id: req.params.id,
            createdBy: req.user._id
        });

        if (!patent) {
            return res.status(404).json({ message: 'Patent not found or unauthorized' });
        }

        const updatedPatent = await Patent.findByIdAndUpdate(
            req.params.id,
            { ...req.body, createdBy: req.user._id },
            { new: true }
        ).populate('createdBy', 'name email department')
         .populate('relatedPublication', 'title authors journal publicationDate');

        res.json(updatedPatent);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a patent
export const deletePatent = async (req, res) => {
    try {
        const patent = await Patent.findOne({
            _id: req.params.id,
            createdBy: req.user._id
        });

        if (!patent) {
            return res.status(404).json({ message: 'Patent not found or unauthorized' });
        }

        await patent.deleteOne();
        res.json({ message: 'Patent deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}; 