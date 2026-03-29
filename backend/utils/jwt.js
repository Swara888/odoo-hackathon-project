const jwt = require('jsonwebtoken');
const generateToken = (user)=> jwt.sign({id:user.id,role:user.role,company_id:user.company_id},process.env.JWT_SECRET,{expiresIn:'12h'});
module.exports = {generateToken};