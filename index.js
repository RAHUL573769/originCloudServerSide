const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
require("dotenv").config();
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hf2p4.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    const projectCollection = client
      .db("internship-assignment")
      .collection("project");

    const profileCollection = client
      .db("internship-assignment")
      .collection("profile");

    app.post("/profile", async (req, res) => {
      const newProfile = req.body;
      const resultProfile = await profileCollection.insertOne(newProfile);
      res.send(resultProfile);
    });
    app.post("/projects", async (req, res) => {
      const newProjects = req.body;

      const resultProjects = await projectCollection.insertOne(newProjects);
      res.send(resultProjects);
    });

    app.get("/projects", async (req, res) => {
      const query = {};
      const cursor = projectCollection.find(query);
      const projectFinal = await cursor.toArray();
      res.send(projectFinal);
    });
  } finally {
  }
}

run().catch(console.dir);

// client.connect((err) => {
//   const collection = client.db("test").collection("devices");

//   client.close();
// });

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
