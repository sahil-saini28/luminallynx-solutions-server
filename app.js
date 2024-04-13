import cors from 'cors'
import employee from './routes/employee.routes.js'
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
// import userRouter from './routes/user.route.js';

import authRouter from './routes/auth.route.js';
// import listingRouter from './routes/listing.route.js';
// import cookieParser from 'cookie-parser';
// import path from 'path';
import departmentRouter from './routes/department.routes.js'
dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log('Connected to MongoDB!');
  })
  .catch((err) => {
    console.log(err);
  });

const app = express()
const port = 4000
app.use(express.json())
app.use(cors());

app.use('/api/auth', authRouter);

app.use('/api/v1/dept', departmentRouter);

app.use('/api/v1',employee)

app.post('/',(req,res)=>{
  // let {tu}= req.body
  res.json(req.body);
} )


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})