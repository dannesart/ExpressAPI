import mongoose from "mongoose";
import { getSecret } from "@/utils/azure";

let _db;

export default {
  connect: async () => {
    try {
      const { DB_CONNECTION_STRING } = process.env;

      const connectURL = DB_CONNECTION_STRING;
      const client = await mongoose.connect(connectURL, {});
      _db = client.connection;
      return client;
    } catch (error) {
      console.log("Error db connect");
      throw error;
    }
  },

  close: async () => {
    _db.close();
  },

  getDb: () => {
    return _db;
  },
};
