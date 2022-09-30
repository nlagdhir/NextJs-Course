import { MongoClient } from "mongodb";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { email, name, message } = req.body;

    if (
      !email ||
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !message ||
      message.trim() === ""
    ) {
      res.status(422).json({
        message: "Invalid Input!",
      });
      return;
    }

    const newMessage = {
      email,
      name,
      message,
    };

    //const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.ntrwp.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`;

    let client;
    try {
      client = await MongoClient.connect(process.env.MongoString);
    } catch (error) {
      res.status(500).json({
        message: "Could not connect to database.",
      });
      return;
    }

    try {
      const db = client.db("my-blog");
      const result = await db
        .collection("contact-emails")
        .insertOne(newMessage);
    } catch (error) {
      res.status(500).json({
        message: "Error in data inserting!",
      });
      return;
    }

    client.close();

    return res.status(201).json({
      message: "Successfully stored message!",
      data: newMessage,
    });
  }
};

export default handler;
