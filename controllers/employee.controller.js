import Employee from "../models/employee.model.js";


//Get all employees
export const getallemployees = async (req, res) => {
  try {
    const allEmployees = await Employee.find();
    res.json(allEmployees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

}
 // Create a new employee
  export const createmployee = async (req, res) => {
  try {
    const newEmployee = new Employee(req.body);
    
    await newEmployee.save();
    res.json(newEmployee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
  
 
}
export const deleteemployee = async (req, res) => {
  try {
    const { id  }= req.param;
    
    await Employee.findByIdAndDelete(id);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
 
export const updateemployee=  async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id)
    const updatedUser = await Employee.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}