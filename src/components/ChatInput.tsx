"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, store } from "@/store";
import { addMessage, newChat, setLoading } from "@/store/chatSlice";
import { MdSend } from "react-icons/md";

export default function ChatInput() {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const activeChatId = useSelector(
    (state: RootState) => state.chat.activeChatId
  );
  const chats = useSelector((state: RootState) => state.chat.chats);

  const handleSend = async () => {
    if (!input.trim()) return;

    let chatId = activeChatId;

    if (!chatId) {
      dispatch(newChat());
      chatId = store.getState().chat.activeChatId;
    }

    // Add user message
    dispatch(
      addMessage({
        chatId: chatId!,
        message: { sender: "user", text: input },
      })
    );

    const history =
      chats.find((c) => c.id === chatId)?.messages.map((m) => ({
        role: m.sender,
        content: m.text,
      })) || [];

    const userMessage = input;
    setInput("");

    dispatch(setLoading({ chatId: chatId!, isLoading: true }));

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...history, { role: "user", content: userMessage }],
        }),
      });

      const data = await res.json();

      dispatch(
        addMessage({
          chatId: chatId!,
          message: {
            sender: "bot",
            text: data.reply || "⚠️ No reply from Gemini",
          },
        })
      );
    } catch (error) {
      console.error("Chat error:", error);
      dispatch(
        addMessage({
          chatId: chatId!,
          message: {
            sender: "bot",
            text: "❌ Error connecting to API",
          },
        })
      );
    } finally {
      dispatch(setLoading({ chatId: chatId!, isLoading: false }));
    }
  };

  return (
    <div className="p-4 flex items-center bg-gray-900">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        placeholder="Type a message..."
        className="flex-1 chat_input"
      />
      <MdSend onClick={handleSend} size={30}/>
      {/* <button
        onClick={handleSend}
        className="bg-blue-600 h-11 text-white px-4 py-2 rounded-2xl disabled:opacity-50"
      >
        Send
      </button> */}
    </div>
  );
}
