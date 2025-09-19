import bcrypt from 'bcryptjs';
import usermodel from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import cookie from 'cookie-parser';
import transporter from '../config/nodemailer.js';
export const register = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.json({ success: false, message: 'Missing Details' });
    }

    try {
        const existingUser = await usermodel.findOne({ email });
        if (existingUser) {
            return res.json({ success: false, message: 'User already registered on this email' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new usermodel({
            name,
            email,
            password: hashedPassword
        });
        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

       const mailOptions = {
  from: process.env.SENDER_EMAIL,
  to: email,
  subject: `🎉 Welcome to Our Platform, ${name}!`,
  text: `Hi ${name},

        Welcome aboard! Your account has been successfully created with the email: ${email} ✅

        Thanks & Regards,  
        Animesh`
        }

        await transporter.sendMail(mailOptions);
        return res.json({success:true , message:'User registered successfully 😊'})
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.json({ success: false, message: 'Email & Password are required' });
    }

    try {
        const user = await usermodel.findOne({ email: email });
        if (!user) {
            return res.json({ success: false, message: 'User does not exist, plz register...' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({ success: false, message: 'Incorrect Password' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.json({success:true , message:'User logged in successfully 😊'})
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};


export const logout = async(req,res)=>{
    try{
        res.clearCookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict'
        }) ;
        res.json({success:true , message:'Logged Out Successfully'})
    }
    catch(error){
        return res.json({ success: false, message: error.message })
    }
}
export const sendVerifyOtp= async(req,res)=>{
    try{
        const {userId} = req.body;

        const user = await usermodel.findById(userId);

        if(user.isAccountVerified){
            return res.json({success:false , message:'Account already verified'});
        }
        const otp = String(Math.floor(1000000*Math.random()));

        user.verifyOtp = otp;
        user.verifyOtpExpireAt=Date.now()+24*60*60*1000;

        await user.save();
            const mailOptions = {
            from:process.env.SENDER_EMAIL,
            to:email,
            subject:'Verification otp sent',
            text:`Hii ${user.name} , Your verification otp is : ${otp}
            `
        }
        await transporter.sendMail(mailOptions);
        return res.json({success:true , message:'verification otp sent on email '})

    }
    catch(err){
        res.json({success:false , message:err.message});
    }
} 

export default verifyAmail=async(req,res)=>{
    const {userId,otp}  = req.body;

    if(!user || !otp){
        return res.json({success:false , message:'Missing Verification Detaails'});
    }

    const user = usermodel.findById(userId);

    if(!user){
        return res.json({success:false , message:'User doesnot exist'});
    }

    if(user.verifyOtp=='' || user.verifyOtp!=otp){
        return res.json({success:false , message:'Invalid otp'});
    }

    if(user.verifyOtpExpireAt < Date.now()){
        return res.json({success:false , message:'Otp has been expired'});
    }

    user.isAccountVerified=true;
    user.verifyOtp='';
    user.verifyOtpExpireAt=0;
    await user.save();
    return res.json({success:true , message:'User verified successfully'});

}