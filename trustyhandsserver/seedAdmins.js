import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import dotenv from "dotenv";
import User from "./models/User.js";

// Load environment variables
dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/trustyhands";

const seedAdmins = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");

    const admins = [
      {
        fullName: "Sravanthi Admin",
        email: "admin1@trustyhands.com",
        password: "adminpassword1", // Will be hashed below
        role: "admin",
        phone: "1234567890",
        address: {
          line: "Admin Block 1",
          city: "Admin City",
          state: "Admin State",
          pincode: "500001",
        },
      },
      {
        fullName: "Priya Admin",
        email: "admin2@trustyhands.com",
        password: "adminpassword2",
        role: "admin",
        phone: "0987654321",
        address: {
          line: "Admin Block 2",
          city: "Admin City",
          state: "Admin State",
          pincode: "500002",
        },
      },
      {
        fullName: "Kiran Admin",
        email: "admin3@trustyhands.com",
        password: "adminpassword3",
        role: "admin",
        phone: "1122334455",
        address: {
          line: "Admin Block 3",
          city: "Admin City",
          state: "Admin State",
          pincode: "500003",
        },
      },
      {
        fullName: "Rahul Admin",
        email: "admin4@trustyhands.com",
        password: "adminpassword4",
        role: "admin",
        phone: "5544332211",
        address: {
          line: "Admin Block 4",
          city: "Admin City",
          state: "Admin State",
          pincode: "500004",
        },
      },
    ];

    // Check existing admins and insert appropriately
    for (const adminData of admins) {
      const existingAdmin = await User.findOne({ email: adminData.email });
      if (!existingAdmin) {
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(adminData.password, salt);
        
        await User.create({
          ...adminData,
          password: hashedPassword,
        });
        console.log(`Successfully created admin: ${adminData.fullName} (${adminData.email})`);
      } else {
        console.log(`Admin ${adminData.email} already exists.`);
      }
    }

    console.log("Seeding routine fully completed.");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding admins:", error);
    process.exit(1);
  }
};

seedAdmins();
