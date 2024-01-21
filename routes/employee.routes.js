import express from 'express';
import Employee from '../models/employee.model.js'
import {createmployee, getallemployees, deleteemployee,updateemployee} from '../controllers/employee.controller.js'
const router = express.Router();




// Employees Routes
router.post('/employee',createmployee );
router.get('/employees', getallemployees);
router.delete('/employee/:id', deleteemployee);
router.put('/employee/:id', updateemployee
  // Update an employee by ID (Managers only)
);

router.put('/employees/:id',(req, res) => {
   // Get employee details by ID
});

// Filter Employees Routes
router.get('/employees/filter/location', (req, res) => {
  // Filter employees by location
});

router.get('/employees/filter/name/:order', (req, res) => {
  // Filter employees by name in ascending or descending order
});

















export default router;