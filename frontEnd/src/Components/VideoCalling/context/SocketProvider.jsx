import { createContext, useMemo, useContext, useEffect } from "react";
import React from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const useSocket = () => {
    const socket = useContext(SocketContext);
    return socket;
};

// let backEndLink = import.meta.env.VITE_BACK_END_LINK;
let backEndLink = "localhost:8080";

export default function SocketProvider(props) {

    const socket = useMemo(() => {
        // return io(`wss://${backEndLink}`, {
        return io(`http://localhost:8080`, {
            transports: ["websocket", "polling"],
            reconnection: true, // Enable reconnection
            reconnectionAttempts: 5, // Number of reconnection attempts
            reconnectionDelay: 1000, // Delay between reconnection attempts (1 second),
            autoConnect: false, // Disable automatic connection
        });
    }, []);


    return (
        <SocketContext.Provider value={socket}>
            {props.children}
        </SocketContext.Provider>
    );
}