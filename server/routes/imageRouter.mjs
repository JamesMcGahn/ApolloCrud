import express from 'express';
import protect from '../middleware/protect.mjs';
import { createImages } from '../controllers/blogImageController.mjs';

const router = express.Router();

router.route('/blog/:slug').post(protect, createImages);

export default router;
