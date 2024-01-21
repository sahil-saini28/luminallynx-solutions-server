import department from "../models/department.model.js"

export const createdepartment = async(req,res)=>{
  try {
    const { name, description,employid } = req.body;

    // Create a new department based on the Department model
    const newDepartment = new department({
      name,
      description,
      employid // You should validate and assign the manager's ObjectId here
    });

    // Save the new department to the database
    const savedDepartment = await newDepartment.save();

    res.status(201).json(savedDepartment); // Respond with the created department
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};