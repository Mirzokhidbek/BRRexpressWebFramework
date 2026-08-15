const express = require("express");
const { ObjectId } = require("mongodb");

const app = express();

module.exports = function (db) {

    // ==========================================
    // 1. MIDDLEWARE CONFIGURATION
    // ==========================================
    app.use(express.static("public"));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // ==========================================
    // 2. VIEW ENGINE SETTINGS (EJS)
    // ==========================================
    app.set("views", "views");
    app.set("view engine", "ejs");

    // ==========================================
    // 3. READ (Get all plans)
    // ==========================================
    app.get("/", async (req, res) => {
        try {
            const plans = await db.collection("plans").find().toArray();
            res.render("plans", { plans });
        } catch (error) {
            console.error("Error reading plans:", error);
            res.status(500).send("Internal Server Error");
        }
    });

    // ==========================================
    // 4. CREATE (Add a new plan)
    // ==========================================
    app.post("/create-item", async (req, res) => {
        try {
            const item = req.body.item?.trim();
            if (item) {
                await db.collection("plans").insertOne({ item, createdAt: new Date() });
            }
            res.redirect("/");
        } catch (error) {
            console.error("Error creating plan:", error);
            res.status(500).send("Internal Server Error");
        }
    });

    // ==========================================
    // 5. UPDATE (Edit an existing plan)
    // ==========================================
    app.post("/update-item/:id", async (req, res) => {
        try {
            const id = req.params.id;
            const item = req.body.item?.trim();

            if (!item) {
                return res.redirect("/");
            }

            await db.collection("plans").findOneAndUpdate(
                { _id: new ObjectId(id) },
                { $set: { item: item } }
            );

            res.redirect("/");
        } catch (error) {
            console.error("Error updating plan:", error);
            res.status(500).send("Internal Server Error");
        }
    });

    // ==========================================
    // 6. DELETE ONE (Delete a specific plan)
    // ==========================================
    app.post("/delete-item/:id", async (req, res) => {
        try {
            const id = req.params.id;
            await db.collection("plans").deleteOne({ _id: new ObjectId(id) });
            res.redirect("/");
        } catch (error) {
            console.error("Error deleting plan:", error);
            res.status(500).send("Internal Server Error");
        }
    });

    // ==========================================
    // 7. DELETE ALL (Clear all plans)
    // ==========================================
    app.post("/delete-all", async (req, res) => {
        try {
            await db.collection("plans").deleteMany({});
            res.redirect("/");
        } catch (error) {
            console.error("Error deleting all plans:", error);
            res.status(500).send("Internal Server Error");
        }
    });

    // Return the configured express app
    return app;
};