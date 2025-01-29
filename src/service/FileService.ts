import * as path from "path";
import * as fs from "fs/promises";
import User from "../models/UserModel";
import config from "../helpers/config";

class FileService {
  static async saveProfilePicture(userId: string, file: any): Promise<string> {
    try {
      if (!file) {
        throw new Error("No file provided");
      }

      await fs.mkdir(config.UPLOADS_FOLDER, { recursive: true });

      const fileExtension = path.extname(file.name).toLowerCase();
      const filename = `${userId}_profile_picture${fileExtension}`;
      const fullPath = path.join(config.UPLOADS_FOLDER, filename);

      await new Promise<void>((resolve, reject) => {
        file.mv(fullPath, (err: any) => {
          if (err) reject(err);
          else resolve();
        });
      });

      return `${config.APP_URL}/${config.UPLOADS_FOLDER}/${filename}`;
    } catch (error: any) {
      console.error("Error saving profile picture:", error);
      throw new Error(`Failed to save profile picture: ${error.message}`);
    }
  }

  static async updateUserProfilePicture(
    userId: string,
    file: any
  ): Promise<void> {
    try {
      const user = await User.findById(userId);

      if (!user) {
        throw new Error("User not found");
      }

      const filename = await this.saveProfilePicture(user._id.toString(), file);
      user.profilePicture = filename;

      await user.save();
    } catch (error) {
      console.error("Error updating user profile picture:", error);
      throw error;
    }
  }
}

export default FileService;
