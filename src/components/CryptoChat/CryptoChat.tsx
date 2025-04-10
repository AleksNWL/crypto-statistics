import { useState, useCallback, FormEvent } from "react";
import { useSocket } from "../../api/useSocket";
import { ChatMessage, MessageType } from "../../types/Chat.ts";
import "./CryptoChat.scss"


interface onCloseType {
    onClose: () => void;
}

export default function CryptoChat({onClose}: onCloseType) {
    const { socket, messages} = useSocket();
    const [input, setInput] = useState("");
    const [username, setUsername] = useState("");

    const sendMessage = useCallback(() => {
        if (!socket || !input.trim()) return;

        if (input.startsWith("/name")) {
            const parts = input.split(" ");
            if (parts.length < 2) {
                alert("Введите имя после команды /name");
                return;
            }
            const newUserName = parts[1];
            socket.emit("set_username", { username: newUserName });
            setUsername(newUserName);
        } else {
            if (!username) {
                alert("Сначала установите имя через команду /name");
                return;
            }
            socket.emit("message", { text: input, username });
        }

        setInput("");
    }, [socket, input, username]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        sendMessage();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button onClick={onClose} className="modal-button modal-button-close">x</button>
                <div className="modal-message">
                    {messages.map((msg: ChatMessage, index: number) => (
                        <div key={index}>
                            {msg.type === "system" ? (
                                <>
                                    <em>{msg.data.text}</em>
                                    <div>{new Date(msg.data.timestamp).toLocaleTimeString()}</div>
                                </>
                            ) : (
                                <>
                                    <strong>{(msg.data as MessageType).username}:</strong>{" "}
                                    {(msg.data as MessageType).text}
                                    <div>{new Date(msg.data.timestamp).toLocaleTimeString()}</div>
                                </>
                            )}
                        </div>
                    ))}
                </div>

                <form onSubmit={handleSubmit} className="modal-form">
                    <input
                        className="modal-input"
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={
                            username ? "Введите сообщение..." : "Установите имя: /name"
                        }
                        disabled={!socket?.connected}
                    />
                    <button
                        className="modal-button"
                        type="submit"
                        disabled={!socket?.connected || input.trim() === ""}
                    >
                        Отправить
                    </button>
                </form>

                <div>
                    Статус: <span className={socket?.connected ? "connected" : "no-connected"}>{socket?.connected ? "Подключено✅" : "Не подключено❌"}</span>
                </div>
            </div>
        </div>
    );
}
