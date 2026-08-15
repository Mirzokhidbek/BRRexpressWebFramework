const http = require("http");
 
const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://mirodeveloper7_db_user:bIS6F1Y8eoDCAgtK@cluster0.gylxozl.mongodb.net/?appName=Cluster0";

const client = new MongoClient(uri);

async function startServer() {
    try {
        await client.connect();

        console.log("Connected to MongoDB");
        const app = require("./app");

        const server = http.createServer(app);

        const PORT = 3000;

        server.listen(PORT, function () {
            console.log(
                `The server is running successfully on port: ${PORT}, http://localhost:${PORT}`
            );
        });

    } catch (err) {
        console.error("MongoDB connection error:", err);
    }
}

startServer();