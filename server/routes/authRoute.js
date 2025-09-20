import express from 'express';
import { register , login , logout, sendVerifyOtp, verifyEmail, changePassword } from '../controllers/authController.js';
import userAuth from '../middleware/userAuth.js';
const authRouter = express.Router();

authRouter.post('/register',register);
authRouter.post('/login',login);
authRouter.post('/logout',logout);
authRouter.post('/send-verify-otp', userAuth,sendVerifyOtp);
authRouter.post('/verify-email', userAuth,verifyEmail);
authRouter.post('/change-password' , changePassword);
export default authRouter;