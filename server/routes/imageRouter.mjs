import express from 'express';
import protect from '../middleware/protect.mjs';
import { updateImages } from '../controllers/blogImageController.mjs';

const router = express.Router();

router.route('/blog/:slug').put(protect, updateImages);

export default router;
