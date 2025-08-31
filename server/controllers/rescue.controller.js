import Team from "../models/Team.model.js";

// Get all teams
export const getTeams = async (req, res) => {
  try {
    const teams = await Team.find();
    res.status(200).json(teams);
  } catch (error) {
    res.status(500).json({ message: "Error fetching teams", error: error.message });
  }
};

//  Add new team
export const addTeam = async (req, res) => {
  try {
    const { name, leader, specialization, members } = req.body;

    if (!name || !leader || !specialization || !members) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newTeam = new Team({
      name,
      leader,
      specialization,
      members,
    });

    const savedTeam = await newTeam.save();
    res.status(201).json(savedTeam);
  } catch (error) {
    res.status(500).json({ message: "Error adding team", error: error.message });
  }
};

// Delete team by ID
export const deleteTeam = async (req, res) => {
  try {
    const team = await Team.findByIdAndDelete(req.params.id);
    if (!team) return res.status(404).json({ message: "Team not found" });
    res.status(200).json({ message: "Team deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting team", error: error.message });
  }
};


