import User from "../Database/models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const currentUserId = req.user._id;
    const allOtherUsers = await User.find({
      _id: { $ne: currentUserId },
    }).select("-Password");
    res.status(200).json(allOtherUsers);
  } catch (error) {
    console.log(`Error in controller ${error}`);
    res.status(500).json({ error: `${error}` });
  }
};
