import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Message {
  sender: "user" | "bot";
  text: string;
}

export interface Chat {
  id: string;
  title: string;
  messages: Message[];
  isLoading: boolean;
}

export interface ChatState {
  chats: Chat[];
  activeChatId: string | null;
}

const initialState: ChatState = {
  chats: [],
  activeChatId: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    newChat: (state) => {
      const id = Date.now().toString();
      const newChat: Chat = {
        id,
        title: `New Chat ${state.chats.length + 1}`,
        messages: [],
        isLoading: false,
      };
      state.chats.push(newChat);
      state.activeChatId = id;
    },

    setActiveChat: (state, action: PayloadAction<string>) => {
      state.activeChatId = action.payload;
    },

    addMessage: (
      state,
      action: PayloadAction<{ chatId: string; message: Message }>
    ) => {
      const chat = state.chats.find((c) => c.id === action.payload.chatId);
      if (chat) {
        chat.messages.push(action.payload.message);

        // Auto-update title from first user message
        if (chat.title.startsWith("New Chat")) {
          const firstUserMsg = chat.messages.find((m) => m.sender === "user");
          if (firstUserMsg) {
            chat.title =
              firstUserMsg.text.slice(0, 20) +
              (firstUserMsg.text.length > 20 ? "..." : "");
          }
        }
      }
    },

    setLoading: (
      state,
      action: PayloadAction<{ chatId: string; isLoading: boolean }>
    ) => {
      const chat = state.chats.find((c) => c.id === action.payload.chatId);
      if (chat) {
        chat.isLoading = action.payload.isLoading;
      }
    },

    deleteChat: (state, action: PayloadAction<string>) => {
      state.chats = state.chats.filter((c) => c.id !== action.payload);
      if (state.activeChatId === action.payload) {
        state.activeChatId = state.chats.length ? state.chats[0].id : null;
      }
    },

    clearAllChats: (state) => {
      state.chats = [];
      state.activeChatId = null;
    },
  },
});

export const {
  newChat,
  setActiveChat,
  addMessage,
  setLoading,
  deleteChat,
  clearAllChats,
} = chatSlice.actions;

export default chatSlice.reducer;
