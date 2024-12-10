import mongoose from "mongoose";
import { MONGO_URL } from "./constant.js";

const dbConnection = async () => {
  try {
    const dbInstance = await mongoose.connect(`${MONGO_URL}/chat-app`);
    console.log(
      `the database is connect at port => ${dbInstance.connection.port}`
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export { dbConnection };
