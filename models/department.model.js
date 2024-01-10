import mongoose  from "mongoose";

const departmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  employid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee' // Reference to the employee who manages this department
  },
  // Any other fields you want for your department
});

const Department = mongoose.model('Department', departmentSchema);




export default Department;