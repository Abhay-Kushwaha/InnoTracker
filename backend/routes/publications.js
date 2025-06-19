import express from 'express';
import { getPublications, getPublication, createPublication, updatePublication, deletePublication } from '../controllers/publications.js';
import { auth } from '../middlewares/auth.js';

const router = express.Router();

// Get all publications for logged-in user
router.get('/', auth, getPublications);

// Get a single publication
router.get('/:id', auth, getPublication);

// Create a new publication
router.post('/', auth, createPublication);

// Update a publication
router.put('/:id', auth, updatePublication);

// Delete a publication
router.delete('/:id', auth, deletePublication);

export default router; 