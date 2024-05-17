import { useEffect } from "react";
import useConversation from "../../zustand/useConverstation";
import { useSocketContext } from "../../context/SocketContext";
import notificationSound from "../../assets/sound/tone.mp3"

const useListenMessages = () => {
    const { socket } = useSocketContext();
    const { messages, setMessages } = useConversation();

    useEffect(() => {
     

        socket?.on('newMessage', (newMessage)=>{
            newMessage.shouldShake=true;
            const sound =new Audio(notificationSound)
            sound.play()
            setMessages([...messages,newMessage]);
        });

        return () => {
            socket?.off('newMessage');
        };
    }, [socket, setMessages,messages]);

    return null;  // Return null as this is a hook and does not render anything
};

export default useListenMessages;
