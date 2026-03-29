const express = require('express');
const router = express.Router();
const { submitExpense,myExpenses } = require('../controllers/expenseController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.post('/',authMiddleware,submitExpense);
router.get('/my',authMiddleware,myExpenses);

module.exports = router;