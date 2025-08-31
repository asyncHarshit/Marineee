import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.model.js";
import AuthorityModel from "../models/Authority.model.js";

const userRoles = ["citizen", "analyst", "authority", "rescue_team"];

// ----------------- SIGNUP -----------------
export const signup = async (req, res) => {
  try {
    let { name, email, phoneNumber, password, language, role , fcmToken } = req.body;

    if (!role || !userRoles.includes(role.toLowerCase())) {
      return res.status(400).json({ message: "Invalid role specified" });
    }

    // normalize email
    email = email?.toLowerCase().trim();

    // check if email/phone exists across both collections
    const existingUser =
      (await User.findOne({ $or: [{ email }, { phoneNumber }] })) ||
      (await AuthorityModel.findOne({ $or: [{ email }, { phoneNumber }] }));

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Email or phone already registered" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    let user;
    if (role.toLowerCase() === "citizen") {
      user = await User.create({
        name,
        email,
        phoneNumber,
        password: hashedPassword,
        language,
        fcmToken
      });
    } else {
      user = await AuthorityModel.create({
        name,
        email,
        phoneNumber,
        password: hashedPassword,
        language,
        role: role.toLowerCase(),
        fcmToken
      });
    }

    // token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(201).json({
      message: "Signup successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        language: user.language,
        role: user.role ? user.role : "citizen",
      },
      token,
    });
  } catch (err) {
    if (err.code === 11000) {
      // duplicate key error from MongoDB
      const field = Object.keys(err.keyPattern)[0];
      return res
        .status(400)
        .json({ message: `${field} already exists in database` });
    }
    res.status(500).json({ error: err.message });
  }
};

// ----------------- LOGIN -----------------
export const login = async (req, res) => {
  try {
    let { email, phoneNumber, password } = req.body;

    // normalize email
    email = email?.toLowerCase().trim();

    // allow login with either email or phone
    let user =
      (await User.findOne({ $or: [{ email }, { phoneNumber }] })) ||
      (await AuthorityModel.findOne({ $or: [{ email }, { phoneNumber }] }));

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // // check password
    // console.log(password, user.password);
    // const hashedPassword = await bcrypt.hash(password, 10);
    // console.log(hashedPassword);

    // const isMatch = await bcrypt.compare(password, user.password);

    // console.log(isMatch);

    // if (!isMatch) {
    //   return res.status(400).json({ message: "Invalid credentials" });
    // }

    // token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(201).json({
      message: "Login successful",
      token,
      user: {
        role: user.role ? user.role : "citizen",
        id: user._id,
        email: user.email,
        phoneNumber: user.phoneNumber,
        language: user.language,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ----------------- ME -----------------
export const me = async (req, res) => {
  try {
    // try both models (citizen or authority)
    let user =
      (await User.findById(req.user.id)
        .select("-password")
        .populate("uploads alerts voiceAlerts")) ||
      (await AuthorityModel.findById(req.user.id).select("-password"));

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  
  }

};
