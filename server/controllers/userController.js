// controllers/userController.js
import Donor from '../models/donor.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Register a new donor
// @route   POST /api/users/register
// @access  Public
export const registerUser = async (req, res) => {
  console.log("🟢 Hit /api/users/register with:", req.body);

  try {
    const { name, email, password, bloodGroup, contactNumber, address } = req.body;

    if (!name || !email || !password || !bloodGroup || !contactNumber || !address) {
      console.log("❌ Missing fields");
      return res.status(400).json({ message: 'Please fill in all fields' });
    }

    const existingUser = await Donor.findOne({ email });
    if (existingUser) {
      console.log("⚠️ User already exists");
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new Donor({
      name,
      email,
      password: hashedPassword,
      bloodGroup,
      contactNumber,
      address,
    });

    await newUser.save();
    console.log("✅ User saved to MongoDB:", newUser);

    res.status(201).json({ message: 'User registered successfully' });

  } catch (error) {
    console.error('❌ Registration error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

// @desc    Login user
// @route   POST /api/users/login
// @access  Public
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const donor = await Donor.findOne({ email });
    if (!donor) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, donor.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = generateToken(donor._id);

    res.json({
      _id: donor._id,
      name: donor.name,
      email: donor.email,
      bloodGroup: donor.bloodGroup,
      contactNumber: donor.contactNumber,
      address: donor.address,
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error during login' });
  }
};

// @desc    Get current donor's profile
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = async (req, res) => {
  try {
    const donor = await Donor.findById(req.user.id).select('-password');
    if (!donor) return res.status(404).json({ message: 'User not found' });
    res.json(donor);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error fetching profile' });
  }
};

// @desc    Search donors
// @route   GET /api/users/search?bloodGroup=A+&address=Delhi
// @access  Private
export const searchDonors = async (req, res) => {
  try {
    const { bloodGroup, location } = req.query;
    console.log("🔍 Incoming search:", bloodGroup, location);

    const query = {};
    if (bloodGroup) query.bloodGroup = bloodGroup;
    if (location) query.address = { $regex: new RegExp(location, "i") };

    console.log("📦 Final Mongo query:", query);

    const donors = await Donor.find(query).select("-password");
    res.json(donors);
  } catch (err) {
    console.error("❌ Error in searchDonors:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// @desc    Get All Donors (Admin)
// @route   GET /api/users
// @access  Private/Admin
export const getAllUsers = async (req, res) => {
  try {
    const donors = await Donor.find().select('-password');
    res.status(200).json(donors);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching all users' });
  }
};
