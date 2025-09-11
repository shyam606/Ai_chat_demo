"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { newChat, setActiveChat, deleteChat, clearAllChats } from "@/store/chatSlice";
import { Modal } from "antd";
import { useState } from "react";
import { MdDelete } from "react-icons/md";

export default function Sidebar() {
  const dispatch = useDispatch();
  const chats = useSelector((state: RootState) => state.chat.chats);
  const activeChatId = useSelector((state: RootState) => state.chat.activeChatId);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [chatToDelete, setChatToDelete] = useState<string | null>(null);

  const [isClearModalOpen, setIsClearModalOpen] = useState(false);

  // Delete single chat
  const showDeleteConfirm = (chatId: string) => {
    setChatToDelete(chatId);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteOk = () => {
    if (chatToDelete) {
      dispatch(deleteChat(chatToDelete));
    }
    setIsDeleteModalOpen(false);
    setChatToDelete(null);
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
    setChatToDelete(null);
  };

  // Clear all chats
  const showClearConfirm = () => {
    setIsClearModalOpen(true);
  };

  const handleClearOk = () => {
    dispatch(clearAllChats());
    setIsClearModalOpen(false);
  };

  const handleClearCancel = () => {
    setIsClearModalOpen(false);
  };

  return (
    <div className="w-64 bg-gray-900 text-white h-screen p-4 flex flex-col">
      <button
        onClick={() => dispatch(newChat())}
        className="bg-gray-500 hover:bg-gray-600 cursor-pointer rounded-md py-2 mb-4"
      >
        + New Chat
      </button>

      <div className="flex-1 overflow-y-auto mt-2">
        {chats.map((chat) => (
          <div
            key={chat.id}
            className={`flex justify-between items-center p-2 mb-2 rounded-md cursor-pointer ${
              chat.id === activeChatId ? "bg-gray-500" : "bg-gray-700"
            }`}
          >
            <span
              className="flex-1"
              onClick={() => dispatch(setActiveChat(chat.id))}
            >
              {chat.title}
            </span>
            <button
              onClick={() => showDeleteConfirm(chat.id)}
              className="ml-2 cursor-pointer"
            >
              <MdDelete className="text-red-500" size={25}/>
            </button>
          </div>
        ))}
      </div>

      {/* Clear All Chats Button */}
      {chats.length > 0 && (
        <button
          onClick={showClearConfirm}
          className="bg-red-700 hover:bg-red-600 cursor-pointer rounded-md py-2 mt-4"
        >
          🗑 Clear All Chats
        </button>
      )}

      {/* Delete single chat modal */}
      <Modal
        title="Delete Chat"
        open={isDeleteModalOpen}
        onOk={handleDeleteOk}
        onCancel={handleDeleteCancel}
        okText="Delete"
        okButtonProps={{ danger: true }}
      >
        <p>Are you sure you want to delete this chat?</p>
      </Modal>

      {/* Clear all chats modal */}
      <Modal
        title="Clear All Chats"
        open={isClearModalOpen}
        onOk={handleClearOk}
        onCancel={handleClearCancel}
        okText="Clear All"
        okButtonProps={{ danger: true }}
      >
        <p>This will delete all your chats. Are you sure?</p>
      </Modal>
    </div>
  );
}
