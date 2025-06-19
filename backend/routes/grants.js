import express from 'express';
import { getGrants, getGrant, createGrant, updateGrant, deleteGrant } from '../controllers/grantController.js';
import { auth } from '../middlewares/auth.js';

const router = express.Router();

// Get all grants for logged-in user
router.get('/', auth, getGrants);

// Get a single grant
router.get('/:id', auth, getGrant);

// Create a new grant
router.post('/', auth, createGrant);

// Update a grant
router.put('/:id', auth, updateGrant);

// Delete a grant
router.delete('/:id', auth, deleteGrant);

export default router; 