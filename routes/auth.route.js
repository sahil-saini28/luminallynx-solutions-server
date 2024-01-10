import express from 'express';
import User from '../models/user.model.js';
import Admin from '../models/admin.model.js'
import bcrypt from 'bcryptjs';
import {  signin,  } from '../controllers/auth.controller.js';
import  { body, validationResult } from 'express-validator';
const router = express.Router();
import jwt from 'jsonwebtoken';
const JWT_SECRET = 'lallulalkepakode23';



router.post('/singup', [
  body('username', 'Enter a valid name').isLength({ min: 3 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password must be at least 5 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);
    user = await User.create({
      username: req.body.username,
      password: secPass,
      email: req.body.email
    });

    const data = {
      user: {
        id: user.id
      }
    };

    const authtoken = jwt.sign(data, JWT_SECRET);
   const  success= true;
    console.log(authtoken);

    res.json({ success, authtoken });
  } catch (error) { 
    console.error('Error:', error.message);
    res.status(500).send('An error occurred');
  }
});

router.post("/signin", signin);




router.post("/signup/manager", [
  body('username', 'Enter a valid name').isLength({ min: 3 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password must be at least 5 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);
    user = await Admin.create({
      username: req.body.username,
      password: secPass,
      email: req.body.email
    });

    const data = {
      user: {
        id: user.id
      }
    };

    const authtoken = jwt.sign(data, JWT_SECRET);
   const  success= true;
    console.log(authtoken);

    res.json({ success, authtoken });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send('An error occurred');
  }
});

router.post("/signin/manager", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    let user = await Admin.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Try valid email and password' });
    }

    const passwordCompare = await bcrypt.compare( password, user.password);
    if (!passwordCompare) {
      return res.status(400).json({ error: 'Try with valid credentials' });
    }

    const data = {
      user: {
        id: user.id
      }
    }

    const authtoken = jwt.sign(data, JWT_SECRET);
    const success= true;
    res.json({success, authtoken})
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send('An error occurred');
  }
});





export default router;