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
 
export const getalldept = async (req, res) => {
  try {
    const departments = await department.find(); // Fetch all departments from the database
    res.status(200).json(departments); // Respond with the retrieved departments
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
  

export const deletedepartment =  async (req, res) => {
  try {
    const  id  = req.header("id");
    
    await department.findByIdAndDelete(id);
    res.json({ message: 'Department deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}