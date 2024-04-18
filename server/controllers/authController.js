import User from "../models/userModel.js"
import bcryptjs from "bcryptjs";
import generateTokenandSetCookie from "../utils/generateToken.js";
export const signUp = async (req, res) => {
	try {
		const { fullName, username, password, confirmPassword, gender } = req.body;


		if (password !== confirmPassword) {
			return res.status(400).json({ error: "Passwords don't match" });
		}

		const user = await User.findOne({ username });

		if (user) {
			return res.status(400).json({ error: "Username already exists" });
		}

		// // HASH PASSWORD HERE
		const salt = await bcryptjs.genSalt(10);
		const hashedPassword = await bcryptjs.hash(password, salt);

		// // https://avatar-placeholder.iran.liara.run/

		const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
		const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

		const newUser = new User({
			fullName,
			username,
			password:hashedPassword,
			gender,
			profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
		});

		if (newUser) {
			// Generate JWT token here
			generateTokenandSetCookie(newUser._id, res);
			await newUser.save();

			return res.status(201).json({
				success:true,
				message:"user register successfully",
				_id: newUser._id,
				fullName: newUser.fullName,
				username: newUser.username,
				profilePic: newUser.profilePic,
			});
		} else {
			return res.status(400).json({ error: "Invalid user data" });
		}
	} catch (error) {
		
		return res.status(500).json({ error: "Internal Server Error" });
	}
};

export const login=async(req,res,next)=>{
    try{
		const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'User not found',
            });
        }

        const passwordMatch = await bcryptjs.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(400).json({
                success: false,
                message: 'Invalid credentials',
            });
        }

		generateTokenandSetCookie(user._id, res);

		return res.status(200).json({
			sucess:true,
			message:"login Successfully",
			_id: user._id,
			fullName: user.fullName,
			username: user.username,
			profilePic: user.profilePic,
		});
    }
    catch(error){
		return res.status(500).json({ error: "Internal Server Error" });
    }
}
export const logout=async(req,res,next)=>{
	try {
		res.cookie("chattoken", "", { maxAge: 0 });
		return res.status(200).json({success:true, message: "Logged out successfully" });
	} catch (error) {
		
		return res.status(500).json({ error: "Internal Server Error" });
	}
}