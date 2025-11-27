import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res, next) => {
    try {
        const { name, age, email, address, contact, role, password } = req.body;

        // Simple validation
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Name, email, and password are required" });
        }

        // Check if email exists
        const exist = await User.findOne({ email });
        if (exist) {
            return res.status(400).json({ message: "Email already registered" });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            age,
            email,
            address,
            contact,
            role,
            password: hashedPassword
        });

        return res.status(201).json({
            message: "User registered successfully",
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role
            }
        });

    } catch (error) {
        next(error); // Pass error to global error handler
    }
};
