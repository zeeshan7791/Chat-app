import Conversation from "../models/conversationModel.js";
import Message from "../models/messageModel.js";
export const sendMessage = async (req, res) => {
	try {
		const { message } = req.body;
		const { id: receiverId } = req.params;
		const senderId = req.user._id;

		let conversation = await Conversation.findOne({
			participants: { $all: [senderId, receiverId] },
		});

		if (!conversation) {
			conversation = await Conversation.create({
				participants: [senderId, receiverId],
			});
		}

		const newMessage = new Message({
			senderId,
			receiverId,
			message,
		});

		if (newMessage) {
			conversation.messages.push(newMessage._id);
		}

		// await conversation.save();
		// await newMessage.save();

		// this will run in parallel
		await Promise.all([conversation.save(), newMessage.save()]);

		// SOCKET IO FUNCTIONALITY WILL GO HERE
		// const receiverSocketId = getReceiverSocketId(receiverId);
		// if (receiverSocketId) {
		// 	// io.to(<socket_id>).emit() used to send events to specific client
		// 	io.to(receiverSocketId).emit("newMessage", newMessage);
		// }

		res.status(201).json(newMessage);
	} catch (error) {
		console.log("Error in sendMessage controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

export const getMessages=async(req,res,next)=>{
	const {id:userToChatId}=req.params
	console.log(userToChatId,'userToChatId----------')
	try{

		const senderId=req.user._id
		const conversation = await Conversation.findOne({
			participants:{$all:[senderId,userToChatId]}
	}).populate("messages")
	if(conversation===null){
		return res.status(200).json({
			success:null,
			message: "no chat exist",
			
		})
	}
	const {messages}=conversation

	return res.status(200).json({
		success:true,
		message: "all chat fetched",
		messages
	})
}catch (error) {
	console.log("Error in sendMessage controller: ", error.message);
	res.status(500).json({ error: "Internal server error" });
}

}