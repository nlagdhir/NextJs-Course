// import fs from 'fs';
// import path from 'path';
import { connectDatabase, insertDocument } from "../../helpers/db-util";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const newEmail = {
      id: new Date().toISOString(),
      email: req.body.email,
    };
    const userEmail = req.body.email;

    // const filepath = path.join(process.cwd(),'data','newsletter.json');
    // const fileData = JSON.parse(fs.readFileSync(filepath));
    // fileData.push(newEmail)
    // fs.writeFileSync(filepath,JSON.stringify(fileData));

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
      await insertDocument(client, "newsletter", "emails", {
        email: userEmail,
      });
      client.close();
    } catch (error) {
        console.log(error);
      res.status(500).json({
       
        message: "Inserting data faield!",
      });
      return;
    }

    return res.status(200).json({
      status: 200,
      message: "You are subscibed to the list!",
      email: req.body.email,
    });
  } else {
    return res.status(200).json({
      message: "It works!",
    });
  }
};

export default handler;
