import mongoose from "mongoose";
import config from "./helpers/config";

class Database {
  private static instance: Database;

  private constructor() {
    this.connect();
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  private connect(): void {
    mongoose
      .connect(config.DATABASE_URL)
      .then(() => {
        console.log("Connected to database");
      })
      .catch((err: Error) => {
        console.log("Error connecting to database", err);
      });
  }

  public async disconnect(): Promise<void> {
    await mongoose.disconnect;
  }
}

export default Database.getInstance();
