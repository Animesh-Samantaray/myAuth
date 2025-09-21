import usermodel from "../models/userModel.js";

export const getUserData = async(req,res)=>{
    try{
const {userId} = req.user;

const user = await usermodel.findById(userId);
if(!user){
    return res.json({success:false , message: 'User not found '});
}

console.log("req.user in getUserData:", req.user);
console.log("Fetched user:", user);

return res.json({
  success: true,
  userData: {
    name: user.name,
    email: user.email,
    isAccountVerified: user.isVerified,
  }
});

    }
    catch(error){
        return  res.json({success:false , message:error.message});
    }
}