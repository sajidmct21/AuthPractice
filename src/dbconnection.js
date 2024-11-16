import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";

const dbConnection = async () => {
  try {
    const dbInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    console.log(`DB Instance is running at ${dbInstance.connection.host}`);
  } catch (error) {
    console.log(`DB connection is failed with error ${error}`);
  }
};

export {dbConnection}