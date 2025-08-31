import User from "../models/User.model.js";
import VoiceAlert from "../models/VoiceAlert.model.js";
import Upload from "../models/Upload.model.js";
import transcribeAudio from "./emergency.controller.js";

export const createVoiceAlert = async (req, res) => {
  try {
    const {user, audioUrl, location } = req.body;
    const transcript = await transcribeAudio(audioUrl);
    console.log(transcript);

    if (!user) return res.status(401).json({ message: "Unauthorized" });
    if (!audioUrl) return res.status(400).json({ message: "audioUrl is required" });

    const voiceAlert = await VoiceAlert.create({
      user: user,
      audioUrl,
      transcript,
      location,
    });

    await User.findByIdAndUpdate(user, { $push: { voiceAlerts: voiceAlert._id } });

    res.status(201).json({ message: "Voice alert created", voiceAlert });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getMyVoiceAlerts = async (req, res) => {
  try {
    
    const userId = req.query.userId;

    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const voiceAlerts = await VoiceAlert.find({ user: userId }).sort({ createdAt: -1 });
    console.log(voiceAlerts);
    
    res.json(voiceAlerts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createUpload = async (req, res) => {
  try {
    const { user, type, url, location } = req.body;

    if (!user) return res.status(401).json({ message: "Unauthorized" });
    if (!type || !url) return res.status(400).json({ message: "type and url are required" });

    const upload = await Upload.create({
      user: user,
      type,
      url,
      location
    });

    await User.findByIdAndUpdate(user, { $push: { uploads: upload._id } });

    res.status(201).json({ message: "Upload created", upload });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getMyUploads = async (req, res) => {
  try {
    const userId = req.query.userId;
    
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const uploads = await Upload.find({ user: userId }).sort({ createdAt: -1 });
    res.json(uploads);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteMyUpload = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const upload = await Upload.findOneAndDelete({ _id: id, user: userId });
    if (!upload) return res.status(404).json({ message: "Upload not found" });

    await User.findByIdAndUpdate(userId, { $pull: { uploads: upload._id } });
    res.json({ message: "Upload deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteMyVoiceAlert = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const alert = await VoiceAlert.findOneAndDelete({ _id: id, user: userId });
    if (!alert) return res.status(404).json({ message: "Voice alert not found" });

    await User.findByIdAndUpdate(userId, { $pull: { voiceAlerts: alert._id } });
    res.json({ message: "Voice alert deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const getAllUploads = async (req, res) => {
  try {
    const uploads = await Upload.find().populate("user");
    res.status(200).json({
      success: true,
      count: uploads.length,
      data: uploads,
    });
    console.log(uploads);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching uploads",
      error: error.message,
    });
  }
};