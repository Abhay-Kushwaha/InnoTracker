import InnovationProject from '../models/InnovationProject.js';

// Create a new innovation project
export const createInnovationProject = async (req, res) => {
    try {
        const project = new InnovationProject({
            ...req.body,
            createdBy: req.user._id
        });
        await project.save();
        res.status(201).json(project);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all innovation projects
export const getInnovationProjects = async (req, res) => {
    try {
        const projects = await InnovationProject.find({ createdBy: req.user._id })
            .populate('createdBy', 'name email')
            .sort({ createdAt: -1 });
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get innovation project by ID
export const getInnovationProjectById = async (req, res) => {
    try {
        const project = await InnovationProject.findById(req.params.id)
            .populate('createdBy', 'name email');
        if (!project) {
            return res.status(404).json({ message: 'Innovation project not found' });
        }
        res.json(project);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update innovation project
export const updateInnovationProject = async (req, res) => {
    try {
        const project = await InnovationProject.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ message: 'Innovation project not found' });
        }
        
        // Check if user is the creator or admin
        if (project.createdBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized' });
        }

        Object.assign(project, req.body);
        await project.save();
        res.json(project);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete innovation project
export const deleteInnovationProject = async (req, res) => {
    try {
        const project = await InnovationProject.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ message: 'Innovation project not found' });
        }

        // Check if user is the creator or admin
        if (project.createdBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized' });
        }

        await project.remove();
        res.json({ message: 'Innovation project deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}; 