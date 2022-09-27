import {
    connectDatabase,
    insertDocument,
    getAllDocuments,
  } from "../../../helpers/db-util";
  // import fs from "fs";
  // import path from "path";
  
  const handler = async (req, res) => {
    let client;
    try {
      client = await connectDatabase();
    } catch (error) {
      res.status(500).json({
        message: "Connecting to the database failed!",
      });
      return;
    }
  
    if (req.method === "POST") {
      const { name, email, text } = req.body;
      const eventId = req.query.eventId;
  
      if (
        !name ||
        name.trim() === "" ||
        !text ||
        text.trim() === "" ||
        !email.includes("@")
      ) {
        res.status(422).json({
          message: "Invalid Input!",
        });
        client.close();
        return;
      }
  
      const commentObj = {
        name,
        text,
        email,
        eventId,
      };
  
      // const filepath = path.join(process.cwd(), "data", "comments.json");
      // const fileData = JSON.parse(fs.readFileSync(filepath));
      // fileData.push(commentObj);
      // fs.writeFileSync(filepath, JSON.stringify(fileData));
  
      let result;
      try {
        result = await insertDocument(client, "events", "comments", commentObj);
  
        commentObj._id = result.insertedId;
  
        res.status(200).json({
          status: 200,
          message: "Comments added!",
          comment: commentObj,
        });
      } catch (error) {
        res.status(500).json({
          message: "Inserting data faield!",
        });
      }
    }
  
    if (req.method === "GET") {
      try {
        const documents = await getAllDocuments(client, "events", "comments", {
          _id: -1,
        });
  
        res.status(200).json({
          comments: documents,
        });
      } catch (error) {
        res.status(500).json({
          message: "Getting comments faield!",
        });
      }
    }
  
    client.close();
  };
  
  export default handler;