import { getSession } from "next-auth/client";
import { hashPassword, verifyPassword } from "../../../../lib/auth";
import { connectToDatabase } from "../../../../lib/db";

const handler = async (req, res) => {
  if (req.method !== "PATCH") {
    return;
  }

  const session = await getSession({ req: req });

  if (!session) {
    res.status(401).json({ message: "Not authenticated!" });
    return;
  }

  const userEmail = session.user.email;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;

  const client = await connectToDatabase();

  const usersCollection = client.db("auth-demo").collection("users");

  const user = await usersCollection.findOne({ email: userEmail });

  if (!user) {
    res.status(404).json({ message: "User not found!" });
    client.close();
    return;
  }

  const currentPassword = user.password;

  const passwordAreEqual = await verifyPassword(oldPassword, currentPassword);

  if (!passwordAreEqual) {
    res.status(422).json({ message: "Invalid password!" });
    client.close();
    return;
  }

  const hashedpassword = await hashPassword(newPassword);

  const result = await usersCollection.updateOne(
    { email: userEmail },
    { $set: { password: hashedpassword } }
  );

  client.close();
  res.status(200).json({ message: "Password Updated!" });
};

export default handler;
