import express from 'express';
import cors from 'cors'
import User from '../models/user.model.js';
import Admin from '../models/admin.model.js'
import bcrypt from 'bcryptjs';
import {  signin,  } from '../controllers/auth.controller.js';
import  { body, validationResult } from'express-validator';
const router = express.Router();
import jwt from 'jsonwebtoken';
const JWT_SECRET = 'lallulalkepakode23';


router.post('/employee',  async (req, res) => {
  try {
    const employee = await User.find({ tag: "employ" });
    res.json(employee);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send('An error occurred');
  }
});


















export default router;