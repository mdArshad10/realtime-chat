import mongoose from "mongoose";

const MONGO_URL = "mongodb://0.0.0.0/chat-app";

const dbConnection = async () => {
  try {
    const dbInstance = await mongoose.connect(MONGO_URL);
    console.log(
      `the database is connect at port => ${dbInstance.connection.port}`
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export { dbConnection };
