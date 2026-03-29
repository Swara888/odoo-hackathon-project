const express = require('express');
const router = express.Router();
const { pendingApprovals, approveExpense, rejectExpense } = require('../controllers/approvalController');
const { authMiddleware } = require('../middleware/authMiddleware');
const { roleMiddleware } = require('../middleware/roleMiddleware');

router.get('/pending',authMiddleware,roleMiddleware(['Manager','Admin']),pendingApprovals);
router.post('/:id/approve',authMiddleware,roleMiddleware(['Manager','Admin']),approveExpense);
router.post('/:id/reject',authMiddleware,roleMiddleware(['Manager','Admin']),rejectExpense);

module.exports = router;