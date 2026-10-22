
require("dotenv").config();

const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

app.use(express.json());
app.use(express.static(__dirname));

let resourcesCollection;

app.get("/", (req, res) => {
    res.send("Health Care for FIU API is running!");
});

app.get("/api/resources", async (req, res) => {
    try {
        const resources = await resourcesCollection
            .find({ isActive: true })
            .toArray();

        res.json(resources);
    } catch (error) {
        console.error("Error retrieving resources:", error.message);
        res.status(500).json({
            error: "Unable to retrieve resources."
        });
    }
});
app.get("/api/resources/search", async (req, res) => {
    try {
        const filter = { isActive: true };

        if (req.query.category) {
            filter.category = req.query.category;
        }

        const resources = await resourcesCollection
            .find(filter)
            .toArray();

        res.json(resources);
    } catch (error) {
        console.error("Error searching resources:", error.message);
        res.status(500).json({
            error: "Unable to search resources."
        });
    }
});
app.get("/api/resources/keyword", async (req, res) => {
    try {
        const keyword = req.query.q;

        if (!keyword) {
            return res.status(400).json({
                error: "Please provide a keyword using ?q="
            });
        }

        const resources = await resourcesCollection
            .find({
                isActive: true,
                keywords: {
                    $regex: keyword,
                    $options: "i"
                }
            })
            .toArray();

        res.json(resources);
    } catch (error) {
        console.error("Error searching keywords:", error.message);
        res.status(500).json({
            error: "Unable to search resources."
        });
    }
});
app.get("/api/resources/audience", async (req, res) => {
    try {
        const audience = req.query.type;

        if (!audience) {
            return res.status(400).json({
                error: "Please provide an audience using ?type="
            });
        }

        const resources = await resourcesCollection
            .find({
                isActive: true,
                audience: {
                    $regex: audience,
                    $options: "i"
                }
            })
            .toArray();

        res.json(resources);
    } catch (error) {
        console.error("Error filtering by audience:", error.message);
        res.status(500).json({
            error: "Unable to filter resources by audience."
        });
    }
});
async function startServer() {
    if (!MONGODB_URI) {
        throw new Error("MONGODB_URI is missing from the .env file.");
    }

    const client = new MongoClient(MONGODB_URI);

    await client.connect();

    const database = client.db("healthcare_fiu");
    resourcesCollection = database.collection("resources");

    console.log("Connected to MongoDB successfully!");

    app.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`);
    });
}

startServer().catch((error) => {
    console.error("Unable to start the application:", error.message);
    process.exit(1);
});