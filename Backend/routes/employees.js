const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

router.post('/add', employeeController.addEmployee);
router.put('/update', employeeController.updateEmployee);
router.delete('/delete/:id', employeeController.deleteEmployee);
router.get('/:id', employeeController.getEmployee);
router.get('/', employeeController.getAllEmployees);

module.exports = router;
