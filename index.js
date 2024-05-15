const express = require("express");
const mongoose = require("mongodb");
const cors = require("cors");
// const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

<<<<<<< HEAD
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const connectDB = async () => {
  try {
    const client = await mongoose.connect(
      "mongodb+srv://akshayrathee:akshayrathee@cluster0.a08waa8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log(`Connected To MongoDB Database ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error in MongoDB ${error}`);
  }
};

connectDB();
=======
const uri = "mongodb+srv://akshayrathee:akshayrathee@cluster0.a08waa8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri, { serverApi: ServerApiVersion.v1,
                                     useNewUrlParser: true,
  useUnifiedTopology: true,
  sslValidate: true,
  tlsAllowInvalidCertificates: false,
  tlsInsecure: false,
  loggerLevel: 'debug'
                                    });
>>>>>>> 8d3ccd6192fedbc72d2cedac9ac8b2578fb8fedb

async function run() {
  try {
    const postCollection = mongoose.connection
      .db("database")
      .collection("posts"); // this collection is for team-ekt
    const userCollection = mongoose.connection
      .db("database")
      .collection("users"); // this collection is for team-srv

    // get
    app.get("/user", async (req, res) => {
      const user = await userCollection.find().toArray();
      res.send(user);
    });
    app.get("/loggedInUser", async (req, res) => {
      const email = req.query.email;
      const user = await userCollection.find({ email: email }).toArray();
      res.send(user);
    });
    app.get("/post", async (req, res) => {
      const post = (await postCollection.find().toArray()).reverse();
      res.send(post);
    });
    app.get("/userPost", async (req, res) => {
      const email = req.query.email;
      const post = (
        await postCollection.find({ email: email }).toArray()
      ).reverse();
      res.send(post);
    });

    // post
    app.post("/register", async (req, res) => {
      const user = req.body;
      const result = await userCollection.insertOne(user);
      res.send(result);
    });

    app.post("/post", async (req, res) => {
      const post = req.body;
      const result = await postCollection.insertOne(post);
      res.send(result);
    });

    // patch
    app.patch("/userUpdates/:email", async (req, res) => {
      const filter = req.params;
      const profile = req.body;
      const options = { upsert: true };
      const updateDoc = { $set: profile };
      const result = await userCollection.updateOne(filter, updateDoc, options);
      res.send(result);
    });
  } catch (error) {
    console.log(error);
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello from Twitter Clone!");
});

app.listen(port, () => {
<<<<<<< HEAD
  console.log(`Twitter clone is listening on port ${port}`);
});
=======
    console.log(`Twitter clone is listening on port ${port}`)
})
>>>>>>> 8d3ccd6192fedbc72d2cedac9ac8b2578fb8fedb
