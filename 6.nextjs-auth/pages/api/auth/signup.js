import { connectToDatabase } from "../../../lib/db";
import { hashPassword } from "../../../lib/auth";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const data = req.body;

    const { email, password } = data;

    console.log(email, password);

    if (!email || !email.includes("@") || !password || password.trim().length < 7) {
      res.status(422).json({
        message:
          "Invalid input - password should also be at least 7 characters long.",
      });
      return;
    }

    const client = await connectToDatabase();
    const db = client.db("auth-demo");

    const existingUser = await db.collection('users').findOne({email : email});

    if(existingUser) {
        res.status(422).json({message : 'User exists already!'});
        client.close();
        return ;
    }

    const hashedpassword = await hashPassword(password);

    const result = await db.collection("users").insertOne({
      email: email,
      password: hashedpassword,
    });

    res.status(201).json({ message: "Created user!" });
    client.close();
  }
};

export default handler;
