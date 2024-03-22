// controllers/authController.js

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Sign up
exports.signUp = async (req, res) => {
    try {
        const { username, password, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, password: hashedPassword, role });
        res.status(201).json({ message: 'User created successfully', user });
      } catch (error) {
        res.status(500).json({ message: 'Error creating user', error: error.message });
      }
};

// Log in
exports.logIn = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
          return res.status(401).json({ message: 'Invalid username or password' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          return res.status(401).json({ message: 'Invalid username or password' });
        }
        const token = jwt.sign({ role: user.role }, process.env.JWT_SECRET);
        res.status(200).json({ message: 'Logged in successfully', token });
      } catch (error) {
        res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};
 
exports.deleteUser = async (req, res) =>{
    try {
        const { userId } = req.params; // Get the userId from the URL parameters
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error: error.message });
    }
}

 


exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ message: 'Error getting users', error: error.message });
    }
};
// Protected route
exports.protectedRoute = (req, res) => {
  res.status(200).json({ message: 'You have accessed the protected route' });
};