const express = require('express');
const cors = require('cors');
const connectToMongo = require('./db');  
const bcrypt = require('bcryptjs');  
const User = require('./module/schama'); 

const app = express();
app.use(express.json());
app.use(cors());  

const PORT = process.env.PORT || 5000;

connectToMongo();

// Signup Route
app.post("/signup", async (req, res) => {
    const { name, password, number } = req.body;
    
    if (!name || !password || !number) {
        return res.status(400).json({ error: "Please provide all fields: name, password, and number" });
    }

    try {
        const existingUser = await User.findOne({ name });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists with that name" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new User({
            name,
            password: hashedPassword,
            number,
            login: false,
            attempt: []  // Initializing an empty array for attempts
        });

        // Save new user to DB
        await newUser.save();

        res.status(201).json({ message: "User created successfully!" });
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Login Route
app.post("/login", async (req, res) => {
    const { name, password } = req.body;

    if (!name || !password) {
        return res.status(400).json({ error: "Please provide both name and password" });
    }

    try {
        // Find user by name
        const user = await User.findOne({ name });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Compare password with hashed password in DB
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Incorrect password" });
        }

        // If login is successful
        res.status(200).json({ message: "Login successful", user: { name: user.name, loginStatus: user.login } });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Attempt Route
app.post("/attempt", async (req, res) => {
    const { name, attempt } = req.body;

    if (!name || !attempt) {
        return res.status(400).json({ error: "Please provide both name and attempt" });
    }

    try {
        // Find user by name
        const user = await User.findOne({ name });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Update the user's attempt array
        user.attempt = attempt;

        // Save the updated user to DB
        await user.save();

        res.status(200).json({ message: "User attempts updated successfully!", attempt: user.attempt });
    } catch (error) {
        console.error("Attempt update error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
