import Sidebar from "@/components/Sidebar";
import ChatWindow from "@/components/ChatWindow";
import ChatInput from "@/components/ChatInput";

export default function Home() {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Chat Area */}
      <div className="flex flex-col flex-1">
        <ChatWindow />
        <ChatInput />
      </div>
    </div>
  );
}
