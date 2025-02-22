const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoose = require('mongoose');
const User = require('./module/schama');  // Import the User schema

// MongoDB URI for your database connection
const uri = "mongodb+srv://mulanidhiprasad568:UVr89gESpf3btq0J@cluster0.gygyj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Connect to MongoDB and handle user actions
async function run() {
  try {
    // Connect the client to the server (optional in MongoDB v4.7 and beyond)
    await client.connect();
    
    // Use Mongoose to connect to the database
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    // Example of creating a new user
    const newUser = new User({
      name: 'John Doe',
      password: 'securepassword123',
      login: false,  // User is not logged in
      attempt: ['2021-07-14', '2021-07-15']  // Example login attempts
    });

    // Save the new user to the database
    await newUser.save();
    console.log("User created successfully!");

  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  } finally {
    // Ensure that the client will close when you finish/error
    await client.close();
    await mongoose.disconnect();
  }
}

// Run the function
run().catch(console.dir);

module.exports = run;
