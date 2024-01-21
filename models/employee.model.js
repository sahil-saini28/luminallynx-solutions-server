import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password : {
    type : String,
    required: true,
  },
  position: {
    type: String,
    
  },
  isManager: {
    type: Boolean,
    default: false,
  },
  dateOfBirth: {
    type: Date,
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
  },
  phoneNumber: {
    type: String,
  },
  hireDate: {
    type: Date,
    default: Date.now,
  }, 
  avatar:{
    type: String,
    default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  },

},
{ timestamps: true }
);

const Employee = mongoose.model('Employee', employeeSchema);

export default Employee;
