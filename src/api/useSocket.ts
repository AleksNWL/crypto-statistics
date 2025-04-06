import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import { MessageType, SystemMessageType, ChatMessage } from "../types/Chat.ts";

export const useSocket = () => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [messages, setMessages] = useState<ChatMessage[]>([]);

    useEffect(() => {
        const ws = io("ws://89.169.168.253:4500", {
            transports: ["websocket", "polling"],
        });

        ws.on("connect", () => {
            console.log("Подключено!");
            setSocket(ws);
        });

        ws.on("message", (message: MessageType) => {
            setMessages((prev) => [...prev, { type: "message", data: message }]);
        });

        ws.on("system", (systemMessage: SystemMessageType) => {
            setMessages((prev) => [...prev, { type: "system", data: systemMessage }]);
        });

        ws.on("disconnect", () => {
            console.log("Отключено");
            setSocket(null);
        });

        return () => {
            ws.disconnect();
        };
    }, []);

    return { socket, messages, setMessages };
};
