import UserModel from "../models/User.js";
import CollegeModel from "../models/College.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const register = async (req, res) => {
    try {
        const { name, email, password, role, collegeId, collegeName, branch, state, city, rollNumber, contactNumber } = req.body;

        // Validate required fields
        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: "Name, email, password, and role are required" });
        }
        if (!['student', 'college', 'faculty'].includes(role)) {
            return res.status(403).json({ message: "Only Student, Faculty, and College can register" });
        }
        if (role !== 'government') {
            if (!collegeId) {
                return res.status(400).json({ message: "College ID is required" });
            }
        }
        if (['student', 'faculty'].includes(role) && !branch) {
            return res.status(400).json({ message: "Branch is required for students and faculty" });
        }
        if (role === 'student' && !rollNumber) {
            return res.status(400).json({ message: "Roll number is required for students" });
        }

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) return res.status(409).json({ message: "User already exists" });

        // Optionally check college existence
        if (role !== 'government') {
            const collegeExists = await CollegeModel.findOne({ collegeId, collegeName });
            if (!collegeExists) {
                return res.status(400).json({ message: "College not found. Only users from pre-registered colleges can register." });
            }
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = new UserModel({
            name,
            email,
            password: hashedPassword,
            role,
            collegeId,
            collegeName,
            branch,
            state,
            city,
            rollNumber,
            contactNumber
        });

        await newUser.save();

        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '24h' });

        res.status(201).json({
            message: "Registration successful",
            token,
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
                collegeId: newUser.collegeId,
                collegeName: newUser.collegeName,
                branch: newUser.branch,
                state: newUser.state,
                city: newUser.city,
                rollNumber: newUser.rollNumber,
                contactNumber: newUser.contactNumber
            }
        });

    } catch (error) {
        console.error("Register Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const Login = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        if (!email || !password || !role) {
            return res.status(400).json({ message: "Email, password, and role are required" });
        }

        const user = await UserModel.findOne({ email, role });
        if (!user) return res.status(404).json({ message: "Invalid credentials or role" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                collegeId: user.collegeId,
                collegeName: user.collegeName,
                department: user.department
            }
        });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
