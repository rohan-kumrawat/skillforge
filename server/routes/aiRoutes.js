import { Router } from 'express';
import { generateLearningPath } from '../controllers/aiController.js';
import { authMiddleware } from '../utils/authMiddleware.js';

const router = Router();

// Authenticated Route: सिर्फ JWT Token वाले Users AI Use कर सकते हैं
router.post('/generate-path', authMiddleware, generateLearningPath);

export default router;