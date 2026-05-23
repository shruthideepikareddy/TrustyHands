import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const registerUser = async (req, res) => {
  try {
    const {
      fullName,
      email,
      password,
      role,
      dob,
      gender,
      phone,
      address,
      profilePhoto,
      workerDetails,
    } = req.body;

    if (
      !fullName ||
      !email ||
      !password ||
      !role ||
      !dob ||
      !gender ||
      !phone ||
      !address
    ) {
      return res.status(400).json({
        message:
          "Missing required fields (fullName, email, password, role, dob, gender, phone, address)",
      });
    }

    if (!["customer", "worker", "admin"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      if (existing.isSuspended) {
        return res
          .status(403)
          .json({
            message: "This account has been suspended. Please contact support.",
          });
      }
      return res.status(409).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userPayload = {
      fullName,
      email,
      password: hashedPassword,
      role,
      dob,
      gender,
      phone,
      address,
      profilePhoto: profilePhoto || "",
    };

    if (role === "worker") {
      if (
        !workerDetails?.skill ||
        !workerDetails?.experience ||
        !workerDetails?.idProof
      ) {
        return res.status(400).json({
          message: "Worker skill, experience and idProof are required",
        });
      }
      userPayload.workerDetails = {
        skill: workerDetails.skill,
        experience: workerDetails.experience,
        serviceArea: workerDetails.serviceArea || "",
        idProof: workerDetails.idProof,
        profilePhoto: workerDetails.profilePhoto || profilePhoto || "",
        status: "pending",
      };
    }

    const user = await User.create(userPayload);

    return res.status(201).json({
      message: "User created",
      user: { ...user.toObject(), password: undefined },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Missing credentials" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    if (role && user.role !== role) {
      return res.status(401).json({ message: "Invalid role for this user" });
    }

    if (user.isSuspended) {
      return res
        .status(403)
        .json({
          message: "Your account has been suspended. Please contact support.",
        });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res
        .status(401)
        .json({ message: "Invalid email/role or password" });
    }

    if (role === "worker") {
      const dbStatus = user.workerDetails?.status || user.status || "";
      console.log(
        `[DEBUG] Login attempt for worker: ${email}. DB Status: "${dbStatus}"`,
      );

      const isApproved = dbStatus.toLowerCase().trim() === "approved";

      if (!isApproved) {
        console.log(`[DEBUG] Worker ${email} not approved. Access Denied.`);
        return res.status(403).json({ message: "Waiting for admin approval" });
      }
      console.log(`[DEBUG] Worker ${email} approved. Access Granted.`);
    }

    const safeUser = {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      profilePhoto: user.profilePhoto || user.workerDetails?.profilePhoto || "",
    };

    return res.status(200).json({ message: "Login success", user: safeUser });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.status(200).json({ user });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const { fullName, phone, address, profilePhoto, workerDetails } = req.body;
    const userId = req.params.id;

    // Build a $set object — only include fields that are provided
    const setFields = {};
    if (fullName) setFields.fullName = fullName;
    if (phone) setFields.phone = phone;
    if (profilePhoto) setFields.profilePhoto = profilePhoto;

    if (address) {
      if (address.line) setFields["address.line"] = address.line;
      if (address.city) setFields["address.city"] = address.city;
      if (address.state) setFields["address.state"] = address.state;
      if (address.pincode) setFields["address.pincode"] = address.pincode;
    }

    if (workerDetails) {
      if (workerDetails.skill)
        setFields["workerDetails.skill"] = workerDetails.skill;
      if (workerDetails.experience)
        setFields["workerDetails.experience"] = workerDetails.experience;
      if (workerDetails.serviceArea)
        setFields["workerDetails.serviceArea"] = workerDetails.serviceArea;
      if (workerDetails.profilePhoto)
        setFields["workerDetails.profilePhoto"] = workerDetails.profilePhoto;
    }

    // Use $set + runValidators:false so partial updates don't fail required-field checks
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: setFields },
      { new: true, runValidators: false },
    ).select("-password");

    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });

    return res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    console.error("updateUserProfile error:", err);
    return res.status(500).json({ message: "Server error updating profile" });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and new password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error resetting password" });
  }
};
