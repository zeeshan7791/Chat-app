import { useEffect, useState } from "react";

import toast from "react-hot-toast";
import useConversation from "../zustand/useConverstation";
import { serverLink } from "../config/config";

const useGetMessages = () => {
	const [loading, setLoading] = useState(false);
	const { messages, setMessages, selectedConversation } = useConversation();

	useEffect(() => {
		const getMessages = async () => {
			setLoading(true);
			try {
				const res = await fetch(`${serverLink}/messages/${selectedConversation._id}`, {
                    method: "GET",
                    credentials: "include",
                  });
				const data = await res.json();
				
				if (data.success===false){
					return toast.error(data.message);

				}	
				
				if (data.success===null){
					return setMessages([]);

				}	
			
			setMessages(data.messages);
			} catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};

		if (selectedConversation?._id) getMessages();
	}, [selectedConversation?._id, setMessages]);

	return { messages, loading };
};
export default useGetMessages;