const express = require('express');
const router = express.Router();
const { createUser, updateUserRole, getUser } = require('../controllers/userController');
const { authMiddleware } = require('../middleware/authMiddleware');
const { roleMiddleware } = require('../middleware/roleMiddleware');

router.post('/',authMiddleware,roleMiddleware(['Admin']),createUser);
router.put('/:id/role',authMiddleware,roleMiddleware(['Admin']),updateUserRole);
router.get('/:id',authMiddleware,getUser);

module.exports = router;