const User = require('../models/User');
const { hashPassword } = require('../utils/hash');

exports.createUser = async(req,res)=>{
  try{
    const {name,email,password,role,manager_id} = req.body;
    const password_hash = await hashPassword(password);
    const user = await User.create({
      name,email,password_hash,role,manager_id,company_id:req.user.company_id
    });
    res.status(201).json({success:true,data:user,message:'User created'});
  }catch(err){
    console.error(err);
    res.status(500).json({success:false,message:'Failed to create user'});
  }
}

exports.updateUserRole = async(req,res)=>{
  try{
    const {role} = req.body;
    const user = await User.findByPk(req.params.id);
    if(!user) return res.status(404).json({success:false,message:'User not found'});
    user.role = role;
    await user.save();
    res.json({success:true,data:user,message:'Role updated'});
  }catch(err){
    console.error(err);
    res.status(500).json({success:false,message:'Failed to update role'});
  }
}

exports.getUser = async(req,res)=>{
  try{
    const user = await User.findByPk(req.params.id);
    if(!user) return res.status(404).json({success:false,message:'User not found'});
    res.json({success:true,data:user});
  }catch(err){
    console.error(err);
    res.status(500).json({success:false,message:'Failed to fetch user'});
  }
}