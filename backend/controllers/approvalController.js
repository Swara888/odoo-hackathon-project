const ExpenseApproval = require('../models/ExpenseApproval');
const Expense = require('../models/Expense');

exports.pendingApprovals = async(req,res)=>{
  try{
    const approvals = await ExpenseApproval.findAll({
      where:{approver_id:req.user.id,status:'Pending'},
      include: [{ model: Expense }]
    });
    res.json({success:true,data:approvals});
  }catch(err){
    console.error(err);
    res.status(500).json({success:false,message:'Failed to fetch approvals'});
  }
}

exports.approveExpense = async(req,res)=>{
  try{
    const approval = await ExpenseApproval.findByPk(req.params.id);
    if(!approval) return res.status(404).json({success:false,message:'Approval not found'});
    approval.status = 'Approved';
    await approval.save();
    // TODO: move to next approver or mark expense approved
    res.json({success:true,data:approval,message:'Expense approved'});
  }catch(err){
    console.error(err);
    res.status(500).json({success:false,message:'Failed to approve expense'});
  }
}

exports.rejectExpense = async(req,res)=>{
  try{
    const approval = await ExpenseApproval.findByPk(req.params.id);
    if(!approval) return res.status(404).json({success:false,message:'Approval not found'});
    approval.status = 'Rejected';
    await approval.save();
    // TODO: mark expense rejected
    res.json({success:true,data:approval,message:'Expense rejected'});
  }catch(err){
    console.error(err);
    res.status(500).json({success:false,message:'Failed to reject expense'});
  }
}