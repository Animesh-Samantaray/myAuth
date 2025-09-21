import express from 'express';
import { register , login , logout, sendVerifyOtp, verifyEmail, changePassword, sendResetOtp, resetPassword, isVerified } from '../controllers/authController.js';
import userAuth from '../middleware/userAuth.js';
const authRouter = express.Router();

authRouter.post('/register',register);
authRouter.post('/login',login);
authRouter.post('/logout',logout);
authRouter.post('/send-verify-otp', userAuth,sendVerifyOtp);
authRouter.post('/verify-email', userAuth,verifyEmail);
authRouter.post('/change-password' , changePassword);
authRouter.post('/isverified' , userAuth,isVerified);
authRouter.post('/send-reset-otp' , userAuth,sendResetOtp);
authRouter.post('/reset-password' , userAuth,resetPassword);

export default authRouter;