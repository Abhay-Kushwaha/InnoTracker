import express from 'express';
import { getPatents, getPatent, createPatent, updatePatent, deletePatent } from '../controllers/patentController.js';
import { auth } from '../middlewares/auth.js';

const router = express.Router();

// Get all patents for logged-in user
router.get('/', auth, getPatents);

// Get a single patent
router.get('/:id', auth, getPatent);

// Create a new patent
router.post('/', auth, createPatent);

// Update a patent
router.put('/:id', auth, updatePatent);

// Delete a patent
router.delete('/:id', auth, deletePatent);

export default router; 