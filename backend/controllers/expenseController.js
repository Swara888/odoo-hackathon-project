const Expense = require('../models/Expense');

exports.submitExpense = async(req,res)=>{
  try{
    const {amount,currency,category,description,date} = req.body;
    const expense = await Expense.create({
      employee_id:req.user.id,
      amount,
      currency,
      category,
      description,
      date
    });
    res.status(201).json({success:true,data:expense,message:'Expense submitted'});
  }catch(err){
    console.error(err);
    res.status(500).json({success:false,message:'Failed to submit expense'});
  }
}

exports.myExpenses = async(req,res)=>{
  try{
    const expenses = await Expense.findAll({where:{employee_id:req.user.id}});
    res.json({success:true,data:expenses});
  }catch(err){
    console.error(err);
    res.status(500).json({success:false,message:'Failed to fetch expenses'});
  }
}