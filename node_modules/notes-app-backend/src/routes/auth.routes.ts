import { Router } from 'express';
import { signup, verifyOTP, googleAuth } from '../controllers/auth.controller';

const router = Router();

router.post('/signup', signup);
router.post('/verify-otp', verifyOTP);
router.post('/google', googleAuth);

export default router;
