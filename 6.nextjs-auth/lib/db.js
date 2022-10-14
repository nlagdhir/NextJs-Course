import { MongoClient } from "mongodb";

export const connectToDatabase = async () => {
  const client = await MongoClient.connect(process.env.MongoString, {
    useUnifiedTopology: true,
  });

  return client;
};