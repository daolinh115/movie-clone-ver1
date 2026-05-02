// track the searches made by user
import { Client, Databases, Query } from "react-native-appwrite";

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;
const ENDPOINT = process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!;
const PROJECT_ID = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!;
const PROJECT_NAME = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_NAME!;

const client = new Client();
client.setEndpoint(ENDPOINT).setProject(PROJECT_ID).setPlatform(PROJECT_NAME);

const database = new Databases(client);

export const updateSearchCount = async (query: string, movie: Movie) => {
  const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
    Query.equal("searchTerm", query),
  ]);
  // check if a record of that search has already been stored
  if (result.documents.length > 0) {
    const existingMoive = result.documents[0];
  }
  // if a document is found increment the searchCount field
  // if no document is found
  // create a new document in appwrite database --> 1
};
