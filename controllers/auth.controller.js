import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { body, validationResult } from 'express-validator';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';
const JWT_SECRET = 'lallulalkepakode23';
// export const signup = async (req, res, next) => {
//   const { username, email, password } = req.body;
//   // const hashedPassword = bcryptjs.hashSync(password, 10);
//   const newUser = new User({ username, email, password});
//   try {
    
  

//     let user = await User.findOne({ email: req.body.email });
//     if (user) {
//       return res.status(400).json({ error: 'User already exists' });
//     }

//     const salt = await bcrypt.genSalt(10);
//     const secPass = await bcrypt.hash(req.body.password, salt);
//     user = await User.save({
//       name: req.body.name,
//       password: secPass,
//       email: req.body.email
//     });

//     const data = {
//       user: {
//         id: user.id
//       }
//     };

//     const authtoken = jwt.sign(data, JWT_SECRET);
//     success= true;
//     console.log(authtoken);

//     res.json({ success, authtoken });
//   } catch (error) {
//     console.error('Error:', error.message);
//     res.status(500).send('An error occurred');
//   }
// };

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
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
};




























export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;
      res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          req.body.name.split(' ').join('').toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = newUser._doc;
      res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};

export const signOut = async (req, res, next) => {
  try {
    res.clearCookie('access_token');
    res.status(200).json('User has been logged out!');
  } catch (error) {
    next(error);
  }
};
