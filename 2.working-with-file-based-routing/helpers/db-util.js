import { MongoClient } from "mongodb";
export const connectDatabase = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://nilesh:nilesh123@cluster0.x1mu1ps.mongodb.net/?retryWrites=true&w=majority"
  );

  return client;
};

export const insertDocument = async (client, dbname, collection, document) => {
  const db = client.db(dbname);

  const result = await db.collection(collection).insertOne(document);

  return result;
};

export const getAllDocuments = async (client, dbname, collection, sort) => {
  const db = client.db(dbname);
  const documents = await db.collection(collection).find().sort(sort).toArray();

  return documents;
};
