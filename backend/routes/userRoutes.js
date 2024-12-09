// const express = require('express');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const User = require('../models/User'); // Adjust path if necessary
// const authenticateToken = require('../middleware/auth'); // Adjust path if necessary

// const router = express.Router(); // Initialize the router

// // Sign-up Route
// router.post('/signup', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const userExists = await User.findOne({ email });
//     if (userExists) {
//       return res.status(400).json({ message: 'Email already exists' });
//     }

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const newUser = new User({ email, password: hashedPassword });
//     await newUser.save();

//     res.status(201).json({ message: 'User registered successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Login Route
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

//     res.status(200).json({ token, userId: user._id }); // Return token and userId
//   } catch (error) {
//     console.error('Error during login:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Protected Route: Profile
// router.get('/profile', authenticateToken, (req, res) => {
//   res.json({ message: 'This is a protected route', user: req.user });
// });

// module.exports = router;


// backend/routes/userRoutes.js
// const express = require('express');
// const bcrypt = require('bcryptjs');
// const User = require('../models/User');
// const router = express.Router();

// router.post('/signup', async (req, res) => {
//   const { firstName, lastName, email, password } = req.body;

//   // Check if email already exists
//   const existingUser = await User.findOne({ email });
//   if (existingUser) {
//     return res.status(400).json({ message: 'Email already exists' });
//   }

//   // Hash the password
//   const salt = bcrypt.genSaltSync(10);
//   const hashedPassword = bcrypt.hashSync(password, salt);

//   // Create a new user
//   const newUser = new User({
//     firstName,
//     lastName,
//     email,
//     password: hashedPassword,
//   });

//   try {
//     await newUser.save();
//     res.status(200).json({ message: 'User created successfully!' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error signing up' });
//   }
// });

// module.exports = router;


// backend/routes/userRoutes.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authenticateToken = require('../middleware/auth'); // Adjust the path based on your project structure

const router = express.Router();

// Signup route
router.post('/signup', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  // Check if email already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'Email already exists' });
  }

  // Hash the password
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  // Create a new user
  const newUser = new User({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    res.status(200).json({ message: 'User created successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error signing up' });
  }
});




//router.post('/login', async (req, res) => {
  //const { email, password } = req.body;

  //console.log("Received email:", email);  // Log received email
  //console.log("Received password:", password);  // Log received password

  // Check if the email exists in the database
  //const existingUser = await User.findOne({ email });
  //if (!existingUser) {
    //console.log("User not found in the database");
    //return res.status(400).json({ message: 'Email or password is incorrect' });
  //}

  // Log the hashed password from the database
  //console.log("Stored hashed password:", existingUser.password);

  // Compare the hashed password from the database with the entered password
  //const isMatch = await bcrypt.compare(password, existingUser.password);
  //if (!isMatch) {
    //console.log("Password mismatch");
    //return res.status(400).json({ message: 'Email or password is incorrect' });
  //}

  // Log the success message and token creation
  //console.log("Password match successful!");

  // Generate a JWT token (assuming you are using JWT)
  //const token = jwt.sign({ userId: existingUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  //res.status(200).json({
    //message: 'Login successful!',
    //token: token,
    //userId: existingUser._id,
  //});
//});
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token, userId: user._id }); // Return token and userId
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
router.get('/profile', authenticateToken, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});

module.exports = router;
