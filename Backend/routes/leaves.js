const express = require('express');
const router = express.Router();
const leaveController = require('../controllers/leaveController');

router.post('/request', leaveController.requestLeave);
router.put('/update-status', leaveController.updateLeaveStatus);
router.get('/', leaveController.getAllLeaves);

module.exports = router;
