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
        res.clearCookie('token', {
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
        const {userId} = req.user;

        const user = await usermodel.findById(userId);

        if(user.isVerified){
            return res.json({success:false , message:'Account already verified'});
        }
        const otp = String(Math.floor(100000 + Math.random() * 900000));

        user.verifyOtp = otp;
        user.verifyOtpExpireAt=Date.now()+60*1000;

        await user.save();
            const mailOptions = {
            from:process.env.SENDER_EMAIL,
            to:user.email,
            subject:'Verification otp sent',
            text:`Hii ${user.name} , Your verification otp is : ${otp}
            `
        }
        await transporter.sendMail(mailOptions).then(info => console.log('Email sent:', info))
    .catch(err => console.log('Error sending email:', err));
        return res.json({success:true , message:'verification otp sent on email '})

    }
    catch(err){
        res.json({success:false , message:err.message});
    }
} 



export const verifyEmail=async(req,res)=>{
     const { otp  } = req.body;      
    const { userId } = req.user;    

    if(!userId || !otp){
        return res.json({success:false , message:'Missing Verification Details'});
    }

    const user = await usermodel.findById(userId);
   
    if(!user){
        return res.json({success:false , message:'User doesnot exist'});
    }

    if(user.isVerified){
        return res.json({success:false , message:'User already verified'});
    }

    if(user.verifyOtp=='' || user.verifyOtp!=otp){
        return res.json({success:false , message:'Invalid otp'});
    }

    if(user.verifyOtpExpireAt < Date.now()){
        return res.json({success:false , message:'Otp has been expired'});
    }

    user.isVerified=true;
    user.verifyOtp='';
    user.verifyOtpExpireAt=0;
    await user.save();

    return res.json({success:true , message:'User verified successfully'});
}


export const changePassword = async(req,res)=>{
    const {email , oldPassword, newPassword} = req.body;

    if(!email || !oldPassword || !newPassword){
        return res.json({success:flase , message:'email , otp , password required'});   
    }

    try{
        const user = await usermodel.findOne({email});
        if(!user){
            return res.json({success:false , message:'User not found'});
        }

        if(!user.isVerified){
            return res.json({success:false , message:'You are not verified'});
        }

            const k =await bcrypt.compare(oldPassword , user.password);
        if(!k){
                return res.json({success:false , message:'Wrong password'});

        }
        const hashedPassword = await bcrypt.hash(newPassword,10);
        user.password = hashedPassword;
        await user.save();
        return res.json({success:true , message:'Password Changed'});
       

    }
    catch(err){
        res.json({success:false ,message:err.message});
    }
}

export const sendResetOtp= async(req,res)=>{
    try{
        const {userId} = req.user;

        const user = await usermodel.findById(userId);

        if(!user.isVerified){
            return res.json({success:false , mesage:'You are not verified user '})
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000));

        user.resetOtp = otp;
        user.resetOtpExpireAt=Date.now()+60*1000;

        await user.save();
            const mailOptions = {
            from:process.env.SENDER_EMAIL,
            to:user.email,
            subject:'Password reset otp sent',
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

export const resetPassword = async(req,res)=>{
    const {userId} = req.user;
    const {newPassword , otp} = req.body;

    if(!otp || !newPassword){
        return res.json({success:false , message:'Missing Verification Details'});
    }

    try{
    const user = await usermodel.findById(userId);
    if(!user){
        return res.json({success:false , message:'User doesnot exist'});
    }

    const hashedPassword = await bcrypt.hash(newPassword , 10);
    if(Date.now() > user.resetOtpExpireAt){
                return res.json({success:false , message:'otp expired'});
    }

    user.password = hashedPassword;
    user.resetOtp='';
    user.resetOtpExpireAt=0;

    await user.save();

    res.json({success:true , message:'Password changed '})
    }
    catch(err){
        res.json({success:false , message:err.message});
    }
}