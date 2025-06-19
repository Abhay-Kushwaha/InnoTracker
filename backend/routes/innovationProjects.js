import express from 'express';
import { 
    createInnovationProject, 
    getInnovationProjects, 
    getInnovationProjectById, 
    updateInnovationProject, 
    deleteInnovationProject 
} from '../controllers/innovationProjectController.js';
import { auth } from '../middlewares/auth.js';

const router = express.Router();

// Apply auth middleware to all routes
router.use(auth);

// Innovation Project routes
router.post('/', createInnovationProject);
router.get('/', getInnovationProjects);
router.get('/:id', getInnovationProjectById);
router.put('/:id', updateInnovationProject);
router.delete('/:id', deleteInnovationProject);

export default router; 