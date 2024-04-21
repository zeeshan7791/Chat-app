
import User from "../models/userModel.js";

export const getUsersForSidebar = async (req, res) => {
	try {
		const loggedInUserId = req.user._id;
console.log(loggedInUserId,'value in logined')
		const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

		return res.status(200).json({success:true,
			message:"user fetched successfully",
			filteredUsers});
	} catch (error) {
		console.error("Error in getUsersForSidebar: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};