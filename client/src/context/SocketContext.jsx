import { createContext, useContext, useEffect, useState, useRef } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";

export const SocketContext = createContext();

export const useSocketContext = () => {
    return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
    const [onlineUsers, setOnlineUsers] = useState([]);
    const { authUser } = useAuthContext();
    const socketRef = useRef(null);

    useEffect(() => {
        if (authUser) {
            const socket = io("https://chat-app-production-5bbn.onrender.com/", {
                query: {
                    userId: authUser._id,
                },
            });
            socketRef.current = socket;

            socket.on("getOnlineUsers", (users) => {
                setOnlineUsers(users);
            });

            return () => {
                socket.close();
                socketRef.current = null;
            };
        } else {
            if (socketRef.current) {
                socketRef.current.close();
                socketRef.current = null;
            }
        }
    }, [authUser]);

    return (
        <SocketContext.Provider value={{ socket: socketRef.current, onlineUsers }}>
            {children}
        </SocketContext.Provider>
    );
};
