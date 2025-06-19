import express from 'express';
import { createStartup, getStartups, getStartupById, updateStartup, deleteStartup } from '../controllers/startupController.js';
import { auth } from '../middlewares/auth.js';

const router = express.Router();

// Apply auth middleware to all routes
router.use(auth);

// Startup routes
router.post('/', (req, res, next) => { req.body.createdBy = req.user._id; next(); }, createStartup);
router.get('/', getStartups);
router.get('/:id', getStartupById);
router.put('/:id', updateStartup);
router.delete('/:id', deleteStartup);

export default router; 