import express from 'express';

import bcrypt from 'bcryptjs';
import {  signin,  } from '../controllers/auth.controller.js';
import  { body, validationResult } from 'express-validator';
const router = express.Router();
import jwt from 'jsonwebtoken';
const JWT_SECRET = 'lallulalkepakode23';
import department from "../models/department.model.js"
import {createdepartment} from '../controllers/department.controller.js'


router.post('/creatdepartment',createdepartment);


router.get('/getalldepartment', async (req, res) => {
  try {
    const departments = await department.find(); // Fetch all departments from the database
    res.status(200).json(departments); // Respond with the retrieved departments
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.get('/department:id', async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findById(id); // Fetch employee by ID from the database

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.status(200).json(employee); // Respond with the retrieved employee
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.put('/department/:id',  async (req, res) => {
  const { name, description,  } = req.body;

  // Create a newNote object with the updated fields
  const newNote = {};
  if (title) newNote.title = title;
  if (description) newNote.description = description;
  if (tag) newNote.tag = tag;

  try {
    let notes = await Notes.findById(req.params.id);

    if (!notes) {
      return res.status(404).send("Not Found");
    }

    if (notes.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    // Use findOneAndUpdate() with proper parameters to update the note
    notes = await department.findOneAndUpdate(
      { _id: req.params.id }, // Specify the conditions to find the note by its ID
      { $set: newNote }, // Set the updated fields using $set
      { new: true } // Set { new: true } to return the updated note
    );

    res.json({ notes });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send('An error occurred');
  }
});




export default router;