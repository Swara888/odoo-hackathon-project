const express = require('express');
const app = express();
require('dotenv').config();
const sequelize = require('./config/db');
const { errorMiddleware } = require('./middleware/errorMiddleware');

app.use(express.json());

app.use('/api/auth',require('./routes/authRoutes'));
app.use('/api/users',require('./routes/userRoutes'));
app.use('/api/expenses',require('./routes/expenseRoutes'));
app.use('/api/approvals',require('./routes/approvalRoutes'));

// Error handler must come last
app.use(errorMiddleware);

sequelize.sync({alter:true}).then(()=>console.log('DB synced'));
module.exports = app;