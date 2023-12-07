// server.js (or index.js)
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 4000;

// Connect to MongoDB
mongoose.connect('mongodb+srv://kamran123:yDW7yklOOCuVd6nd@serverlessinstance0.28e8a8n.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define MongoDB Schema and Model
const sleighSchema = new mongoose.Schema({
  submissionDate: {
    type: Date,
    required: true
  },
  Type: {
    type: String,
    required: true
  },
  status:{
    type: String,
    required: true
  },
  Seller:{
    type: String,
    required: true
  },
  route: {
    type: String,
    required: true
  },
  size: {
    type: String,
    required: true
  },
  Color: {
    type: String,
    required: true
  },
  HeadBoard: {
    type: String,
    required: true
  },
  mattress: {
    type: String,
    required: true
  },
  ottoman: {
    type: String,
    required: true
  },
  Glift: {
    type: String,
    required: true
  },
  threeD: {
    type: String,
    required: true
  },
  totalPrice: {
    type: String,
    required: true
  },
  customerDetails: {
    type: String,
    required: true
  },
  postalCode: {
    type: String,
    required: true
  },
  remarks: {
    type: String,
    required: true
  },
  sprice: {
    type: String,
    required: true
  },
  profit: {
    type: String,
    required: true
  }
});


const SleighModel = mongoose.model('SleighModel', sleighSchema);

const DevanSchema = new mongoose.Schema({
  submissionDate: {
    type: Date,
    default: Date.now
  },
  Type: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  Seller: {
    type: String,
    required: true
  },
  route: {
    type: String,
    required: true
  },
  size: {
    type: String,
    required: true
  },
  Color: {
    type: String,
    required: true
  },
  HeadBoard: {
    type: String,
    required: true
  },
  mattress: {
    type: String,
    required: true
  },
  Set: {
    type: String,
    required: true
  },
  assembly: {
    type: String,
    required: true
  },
  siplet: {
    type: String,
    required: true
  },
  threeD: {
    type: String,
    required: true
  },
  totalPrice: {
    type: String,
    required: true
  },
  customerDetails: {
    type: String,
    required: true
  },
  sprice: {
    type: String,
    required: true
  },
  postalCode: {
    type: String,
    required: true
  },
  remarks: {
    type: String,
    required: true
  },
  profit: {
    type: String,
    required: true
  }
});
const DevanModel = mongoose.model('DevanModel', DevanSchema); // Create a Mongoose model

app.use(cors());
app.use(express.json());
let server;

// Define a route to stop the server intentionally
app.get('/stop-server', (req, res) => {
  console.log('Stopping the server intentionally.');
  res.send('Server is stopping intentionally.');

  // Perform any necessary cleanup or tasks before stopping the server
  // ...

  // Close the server after a short delay (for demonstration purposes)
  setTimeout(() => {
    server.close(() => {
      console.log('Server stopped.');
      process.exit(0);
    });
  }, 2000);
});

// API Endpoint to Get All Data Submitted-Sleigh
app.get('/api/submissions/all-sleigh', async (req, res) => {
  try {
    const submissions = await SleighModel.find();
    res.json(submissions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API Endpoint to Get All Data Submitted-Devan
app.get('/api/submissions/all-devan', async (req, res) => {
  try {
    const submissions = await DevanModel.find();
    res.json(submissions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API Endpoint to Get Data Submitted Today
app.get('/api/submissions/today-sleigh', async (req, res) => {
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const todayEnd = new Date();
  todayEnd.setHours(23, 59, 59, 999);

  try {
    const submissions = await SleighModel.find({
      submissionDate: { $gte: todayStart, $lte: todayEnd },
    });
    res.json(submissions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/submissions/today-devan', async (req, res) => {
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const todayEnd = new Date();
  todayEnd.setHours(23, 59, 59, 999);

  try {
    const submissions = await DevanModel.find({
      submissionDate: { $gte: todayStart, $lte: todayEnd },
    });
    res.json(submissions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// ... (your existing imports and configurations)

// API Endpoint to Get Orders Submitted This Month


app.get('/api/submissions/this-month-sleigh', async (req, res) => {
  const currentMonthStart = new Date();
  currentMonthStart.setDate(1);
  currentMonthStart.setHours(0, 0, 0, 0);
  const nextMonthStart = new Date();
  nextMonthStart.setMonth(nextMonthStart.getMonth() + 1);
  nextMonthStart.setDate(1);
  nextMonthStart.setHours(0, 0, 0, 0);

  try {
    const submissions = await SleighModel.find({
      submissionDate: { $gte: currentMonthStart, $lt: nextMonthStart },
    });
    res.json(submissions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// ... Devan

app.get('/api/submissions/this-month-devan', async (req, res) => {
  const currentMonthStart = new Date();
  currentMonthStart.setDate(1);
  currentMonthStart.setHours(0, 0, 0, 0);
  const nextMonthStart = new Date();
  nextMonthStart.setMonth(nextMonthStart.getMonth() + 1);
  nextMonthStart.setDate(1);
  nextMonthStart.setHours(0, 0, 0, 0);

  try {
    const submissions = await DevanModel.find({
      submissionDate: { $gte: currentMonthStart, $lt: nextMonthStart },
    });
    res.json(submissions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// .Status Update-devan
app.put('/api/submissions/update-status-devan', async (req, res) => {
  const { orders, status } = req.body;

  try {
    // Use Mongoose to update the status of submissions based on order IDs
    await DevanModel.updateMany(
      { _id: { $in: orders } }, // Update documents where _id is in the orders array
      { $set: { status } } // Set the new status
    );

    res.status(200).json({ message: 'Status updated successfully' });
  } catch (error) {
    // Handle error (e.g., send an error response)
    console.error('Error updating order status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// .Status Update-sleigh
app.put('/api/submissions/update-status-sleigh', async (req, res) => {
  const { orders, status } = req.body;

  try {
    // Use Mongoose to update the status of submissions based on order IDs
    await SleighModel.updateMany(
      { _id: { $in: orders } }, // Update documents where _id is in the orders array
      { $set: { status } } // Set the new status
    );

    res.status(200).json({ message: 'Status updated successfully' });
  } catch (error) {
    // Handle error (e.g., send an error response)
    console.error('Error updating order status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Search Results
// Add the following code to your server.js or app.js

app.get('/api/submissions/search-by-postal-code-Sleigh', async (req, res) => {
  const searchQuery = req.query.query;

  try {
    const submissions = await SleighModel.find({
      postalCode: { $regex: new RegExp(searchQuery, 'i') }, // Case-insensitive search
    });
    res.json(submissions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/submissions/search-by-postal-code-Devan', async (req, res) => {
  const searchQuery = req.query.query;

  try {
    const submissions = await DevanModel.find({
      postalCode: { $regex: new RegExp(searchQuery, 'i') }, // Case-insensitive search
    });
    res.json(submissions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const AdminSchema = new mongoose.Schema({
  sellerPin: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

const Admin = mongoose.model('Admin', AdminSchema); // Create a Mongoose model
// ...

app.post('/api/authenticate', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Please provide both username and password.' });
  }

  

  try {
    const user = await Admin.findOne({ username });

    if (!user) {
      return res.status(401).json({ error: 'Authentication failed. Please check your credentials.' });
    }

    // Check if the provided password matches the stored password
    if (password === user.password) {
      return res.status(200).json({ message: 'Authentication successful.' });
    } 
      return res.status(401).json({ error: 'Authentication failed. Please check your credentials.' });
    
  } catch (error) {
    console.error('Error during authentication:', error);
    return res.status(500).json({ error: 'Internal Server Error. Please try again later.' });
  }
});
// ... (rest of your existing code)
// Define user schema
const userSchema = new mongoose.Schema({
  username: String,
  cnicNumber: String,
  accountNumber: String,
  bankName: String,
  password: String
});

const User = mongoose.model('User', userSchema);

// API endpoint to get all users
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


