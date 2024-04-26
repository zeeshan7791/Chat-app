import { useEffect } from "react";
import useConversation from "../../zustand/useConverstation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";

const MessageContainer = () => {
	const{selectedConversation,setSelectedConversation}=useConversation()
	useEffect(() => {
		// cleanup function (unmounts)
		return () => setSelectedConversation(null);
	}, [setSelectedConversation]);
	return (
		<div className='md:min-w-[450px] flex flex-col'>
			{!selectedConversation?
			<>
			<div className="flex justify-center items-center h-96">

			<p>No chat selected</p>
			</div>
			</>
			:
			<>
				{/* Header */}
				<div className='bg-slate-500 px-4 py-2 mb-2'>
					<span className='label-text'>To:</span> <span className='text-gray-900 font-bold'>{selectedConversation.fullName}</span>
				</div>

				<Messages />
				<MessageInput />
			</>
}
		</div>
	);
};
export default MessageContainer;