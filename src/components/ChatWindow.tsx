"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store";
import TypingIndicator from "./TypingIndicator";

export default function ChatWindow() {
  const activeChatId = useSelector(
    (state: RootState) => state.chat.activeChatId
  );
  const chat = useSelector((state: RootState) =>
    state.chat.chats.find((c) => c.id === activeChatId)
  );

  if (!chat) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500">
        Select a chat or create a new one
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col p-4 overflow-y-auto bg-black">
      {chat.messages.map((msg, index) => (
        <div
          key={index}
          className={`mb-2 p-2 rounded-md max-w-xl ${
            msg.sender === "user"
              ? "bg-gray-500 text-white self-end"
              : "bg-gray-200 text-black self-start"
          }`}
        >
          {msg.text}
        </div>
      ))}

      {chat.isLoading && <TypingIndicator />}
    </div>
  );
}
