const User = require('../models/User');
const Company = require('../models/Company');
const { hashPassword, comparePassword } = require('../utils/hash');
const { generateToken } = require('../utils/jwt');

exports.signup = async(req,res)=>{
  try{
    const {name,email,password,company_name,default_currency} = req.body;
    const company = await Company.create({name:company_name,default_currency});
    const password_hash = await hashPassword(password);
    const admin = await User.create({name,email,password_hash,role:'Admin',company_id:company.id});
    const token = generateToken(admin);
    res.status(201).json({success:true,data:{token,user:admin},message:'Company and Admin created'});
  }catch(err){
    console.error(err);
    res.status(500).json({success:false,message:'Signup failed'});
  }
}

exports.login = async(req,res)=>{
  try{
    const {email,password} = req.body;
    const user = await User.findOne({where:{email}});
    if(!user) return res.status(400).json({success:false,message:'Invalid credentials'});
    const isMatch = await comparePassword(password,user.password_hash);
    if(!isMatch) return res.status(400).json({success:false,message:'Invalid credentials'});
    const token = generateToken(user);
    res.json({success:true,data:{token,user},message:'Login successful'});
  }catch(err){
    console.error(err);
    res.status(500).json({success:false,message:'Login failed'});
  }
}