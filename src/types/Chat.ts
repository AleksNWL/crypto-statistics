export type MessageType = {
    text: string;
    username?: string;
    timestamp: string;
};

export type SystemMessageType = {
    text: string;
    timestamp: string;
};

export type ChatMessage = {
    type: "message" | "system";
    data: MessageType | SystemMessageType;
};
