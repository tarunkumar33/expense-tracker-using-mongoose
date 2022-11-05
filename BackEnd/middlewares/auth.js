const jwt=require('jsonwebtoken');
const User=require('../models/user');

exports.authenticate=async (req,res,next)=>{
    try{
        console.log('Auth');
        const {id}=jwt.verify(req.headers.authorization,process.env.TOKEN_SECRET);
        const userRes=await User.findById(id);
        req.user=userRes;
        console.log('req.user:', req.user);
        console.log('Auth successful');
        next();
    }
    catch(err) {
        console.log(err);
        return res.status(401).json({success: false})
      }
}