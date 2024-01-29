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
    type: Array,
    default: [], // Default value for the array (optional)
  },
  
  // Any other fields you want for your department
});

const Department = mongoose.model('Department', departmentSchema);




export default Department;