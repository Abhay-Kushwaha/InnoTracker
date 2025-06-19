import express from 'express';
import { createAward, getAwards, getAwardById, updateAward, deleteAward } from '../controllers/awardController.js';
import { auth } from '../middlewares/auth.js';

const router = express.Router();

// Apply auth middleware to all routes
router.use(auth);

// Award routes
router.post('/', (req, res, next) => { req.body.createdBy = req.user._id; next(); }, createAward);
router.get('/', getAwards);
router.get('/:id', getAwardById);
router.put('/:id', updateAward);
router.delete('/:id', deleteAward);

// Get my awards
router.get('/my/awards', (req, res) => {
    req.query.onlyMine = true;
    return getAwards(req, res);
});

export default router; 