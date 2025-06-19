import Publication from '../models/Publication.js';

// Get all publications
export const getPublications = async (req, res) => {
    try {
        const publications = await Publication.find({ createdBy: req.user._id })
            .populate('createdBy', 'name email department')
            .sort({ createdAt: -1 });
        res.json(publications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new publication
export const createPublication = async (req, res) => {
    try {
        const publicationData = {
            ...req.body,
            createdBy: req.user._id,
            department: req.user.department, // Use user's department
            publicationDate: new Date(req.body.publicationDate)
        };

        // Add current user as author if not already included
        if (!publicationData.authors.includes(req.user.name)) {
            publicationData.authors.unshift(req.user.name);
        }

        // Handle DOI - only include if it has a value
        if (!publicationData.doi || publicationData.doi.trim() === '') {
            delete publicationData.doi;
        }

        // Handle impact factor - only include if it has a value
        if (!publicationData.impactFactor || publicationData.impactFactor <= 0) {
            delete publicationData.impactFactor;
        }

        const publication = new Publication(publicationData);
        const savedPublication = await publication.save();
        await savedPublication.populate('createdBy', 'name email department');
        
        res.status(201).json(savedPublication);
    } catch (error) {
        console.error('Publication creation error:', error);
        res.status(500).json({ 
            message: error.message,
            details: error.errors ? Object.values(error.errors).map(err => err.message) : []
        });
    }
};

// Update a publication
export const updatePublication = async (req, res) => {
    try {
        const publication = await Publication.findOne({
            _id: req.params.id,
            createdBy: req.user._id
        });

        if (!publication) {
            return res.status(404).json({ message: 'Publication not found or unauthorized' });
        }

        const updateData = {
            ...req.body,
            publicationDate: req.body.publicationDate ? new Date(req.body.publicationDate) : publication.publicationDate
        };

        const updatedPublication = await Publication.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        ).populate('createdBy', 'name email department');
        
        res.json(updatedPublication);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a publication
export const deletePublication = async (req, res) => {
    try {
        const publication = await Publication.findOne({
            _id: req.params.id,
            createdBy: req.user._id
        });
        
        if (!publication) {
            return res.status(404).json({ message: 'Publication not found or unauthorized' });
        }
        
        await publication.deleteOne();
        res.json({ message: 'Publication deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single publication
export const getPublication = async (req, res) => {
    try {
        const publication = await Publication.findOne({
            _id: req.params.id,
            createdBy: req.user._id
        }).populate('createdBy', 'name email department');
        
        if (!publication) {
            return res.status(404).json({ message: 'Publication not found or unauthorized' });
        }
        
        res.json(publication);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}; 