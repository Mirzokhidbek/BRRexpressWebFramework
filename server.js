// Load environment variables from the .env file
require("dotenv").config();

const http = require("http");
const { MongoClient } = require("mongodb");

// Get the MongoDB connection URL from environment variables
const uri = process.env.MONGO_URI;

// Create a new MongoClient instance
const client = new MongoClient(uri);

// Function to start the server
async function startServer() {
    try {
        // Connect to MongoDB
        await client.connect();
        console.log("Connected to MongoDB");

        // Connect to the "Plan" database (change the name if your database is different)
        const db = client.db("Plan");

        // Import the app.js file and pass the database instance to it
        const app = require("./app")(db);

        // Create an HTTP server using the Express app
        const server = http.createServer(app);

        // Define the server port
        const PORT = 3000;

        // Start the server
        server.listen(PORT, () => {
            console.log(
                `🚀 Server running at http://localhost:${PORT}`
            );
        });

    } catch (error) {
        // Handle MongoDB connection or server startup errors
        console.error(" Server error:", error);
    }
}

// Execute the server startup function
startServer();