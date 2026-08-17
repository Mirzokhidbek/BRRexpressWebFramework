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
    let db;

    try {
        // Try to connect to MongoDB
        await client.connect();
        console.log("Connected to MongoDB");
        db = client.db("Plan");
    } catch (error) {
        // If MongoDB connection fails, log the error and fall back to an in-memory mock DB
        console.error("MongoDB connection failed — falling back to in-memory DB. Error:", error.message || error);

        const memoryStore = Object.create(null);

        const makeCollection = (name) => {
            memoryStore[name] = memoryStore[name] || [];

            return {
                find: () => ({
                    toArray: async () => memoryStore[name].slice()
                }),
                insertOne: async (doc) => {
                    const _id = Date.now().toString();
                    const stored = { _id, ...doc };
                    memoryStore[name].push(stored);
                    return { acknowledged: true, insertedId: _id };
                },
                findOneAndUpdate: async (filter, update) => {
                    const id = (filter && filter._id) ? String(filter._id) : null;
                    const idx = memoryStore[name].findIndex(d => String(d._id) === id);
                    if (idx === -1) return { value: null };
                    const updated = { ...memoryStore[name][idx], ...((update && update.$set) ? update.$set : {}) };
                    memoryStore[name][idx] = updated;
                    return { value: updated };
                },
                deleteOne: async (filter) => {
                    const id = (filter && filter._id) ? String(filter._id) : null;
                    const before = memoryStore[name].length;
                    memoryStore[name] = memoryStore[name].filter(d => String(d._id) !== id);
                    return { deletedCount: before - memoryStore[name].length };
                },
                deleteMany: async () => {
                    const count = memoryStore[name].length;
                    memoryStore[name] = [];
                    return { deletedCount: count };
                }
            };
        };

        db = {
            collection: (name) => makeCollection(name)
        };
    }

    // Import the app.js file and pass the database instance to it
    const app = require("./app")(db);

    // Create an HTTP server using the Express app
    const server = http.createServer(app);

    // Define the server port
    const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

    // Start the server
    server.listen(PORT, () => {
        console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
}

// Execute the server startup function
startServer();