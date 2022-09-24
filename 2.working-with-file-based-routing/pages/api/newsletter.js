import { connectDatabase, insertDocument } from "../../helpers/db-util";

// import fs from "fs";
// import path from "path";

const handler = async (req, res) => {
  if (req.method === "POST") {
    // const newEmail = {
    //   id: new Date().toISOString(),
    //   email: req.body.email,
    // };

    const userEmail = req.body.email;

    let client;
    try {
      client = await connectDatabase();
    } catch (error) {
      res.status(500).json({
        message: "Connecting to the database failed!",
      });
      return;
    }

    try {
      await insertDocument(client,'newsletter','emails', { email: userEmail });
      client.close();
    } catch (error) {
      res.status(500).json({
        message: "Inserting data faield!",
      });
      return;
    }

    return res.status(201).json({
      status: 200,
      message: "You are subscibed to the list!",
    });
    // const filepath = path.join(process.cwd(), "data", "newsletter.json");
    // const fileData = JSON.parse(fs.readFileSync(filepath));
    // fileData.push(newEmail);
    // fs.writeFileSync(filepath, JSON.stringify(fileData));
  } else {
    return res.status(200).json({
      message: "It works!",
    });
  }
};

export default handler;
