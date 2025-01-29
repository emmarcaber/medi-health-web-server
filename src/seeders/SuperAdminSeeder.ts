import User from "../models/UserModel";
import config from "../helpers/config";
import Database from "../Database";

const createSuperAdminAccount = async () => {
  try {
    const existingSuperAdmin = await User.findOne({
      email: config.SUPER_ADMIN_EMAIL,
    });

    if (existingSuperAdmin) {
      console.log("Super admin account already exists.");
      return;
    }

    // Create super admin
    const superAdmin = new User({
      name: "Super Admin",
      email: process.env.SUPER_ADMIN_EMAIL,
      password: process.env.SUPER_ADMIN_PASSWORD,
      role: "admin",
    });

    // Save the user with hashed password
    await superAdmin.save();
    console.log("Super admin account created successfully.");
  } catch (error) {
    console.log(error);
  } finally {
    await Database.disconnect();
    process.exit(0);
  }
};

createSuperAdminAccount();
